import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import RecipeCard from "../../components/recipeCard";
import ProfileHeader from "../../components/ProfileHeader";
import RecipeModal from "../../components/RecipeModal";
import { fetchRecipes } from "../../utils/recipeUtils";
import { RecipeData } from "../../types";
import * as Progress from "react-native-progress";
import * as Animatable from "react-native-animatable";
import { auth, db } from "@/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";

export default function ProfileScreen() {
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>({
    name: "",
    age: "",
    bio: "",
    location: "",
  });
  const [profileLoading, setProfileLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setProfileData(userDoc.data());
        }
      }
      setProfileLoading(false);
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);

      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          const likedRecipeIds = userData.favorites_recipes;

          const loadRecipes = async () => {
            try {
              const data = await fetchRecipes();
              setRecipes(
                data.filter((recipe) => likedRecipeIds.includes(recipe.id))
              );
            } catch (error: any) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
          };

          loadRecipes();
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const openModal = (recipeId: string) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    setSelectedRecipe(recipe || null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRecipe(null);
  };

  const toggleFavorite = async (id: string) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      const recipeDocRef = doc(db, "recipes", id);

      const recipe = recipes.find((r) => r.id === id);
      if (recipe) {
        const newFavoriteStatus = !recipe.favorite;

        // Update the recipe's favorite status in Firestore
        await updateDoc(recipeDocRef, { favorite: newFavoriteStatus });

        // Update the user's favorites_recipes array in Firestore
        if (newFavoriteStatus) {
          await updateDoc(userDocRef, {
            favorites_recipes: arrayUnion(id),
          });
        } else {
          await updateDoc(userDocRef, {
            favorites_recipes: arrayRemove(id),
          });
        }

        // Update the local state
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.id === id
              ? { ...recipe, favorite: newFavoriteStatus }
              : recipe
          )
        );
      }
    }
  };

  const renderRecipe = ({ item }: { item: RecipeData }) => (
    <RecipeCard
      recipe={item}
      onPress={() => openModal(item.id)}
      onToggleFavorite={() => toggleFavorite(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      {profileLoading ? (
        <View style={styles.progressBar}>
          <Progress.Circle
            size={40}
            indeterminate={true}
            thickness={3}
            borderColor={"#F6A028"}
            borderWidth={2}
          />
        </View>
      ) : (
        <ProfileHeader
          name={profileData.name}
          age={profileData.age}
          bio={profileData.bio}
          location={profileData.location}
          imageSource={require("../../assets/images/profile.png")}
        />
      )}
      <Animatable.Text
        animation="slideInLeft"
        easing="ease-in-out"
        style={styles.starredRecipesTitle}
      >
        My Starred Recipes
      </Animatable.Text>
      {loading ? (
        <View style={styles.progressBar}>
          <Progress.Circle
            size={40}
            indeterminate={true}
            thickness={3}
            borderColor={"#F6A028"}
            borderWidth={2}
          />
        </View>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : recipes.length === 0 ? (
        <Text style={styles.noRecipesText}>You have no starred recipes.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.recipesContainer}>
          <Animatable.View
            animation="slideInUp"
            easing="ease-in"
            duration={500}
          >
            <FlatList
              data={recipes}
              renderItem={renderRecipe}
              keyExtractor={(item) => item.id}
              numColumns={2}
              contentContainerStyle={styles.recipesContainer}
              columnWrapperStyle={styles.columnWrapper}
            />
          </Animatable.View>
        </ScrollView>
      )}
      <RecipeModal
        visible={modalVisible}
        recipe={selectedRecipe}
        onClose={closeModal}
        onToggleFavorite={toggleFavorite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  starredRecipesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 11,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  noRecipesText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 32,
  },
  recipesContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  columnWrapper: {
    justifyContent: "flex-start",
    width: "100%",
  },
  progressBar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 64,
  },
});
