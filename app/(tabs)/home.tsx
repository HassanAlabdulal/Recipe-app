import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Link } from "expo-router";
import RecipeCard from "../../components/recipeCard";
import RecipeModal from "../../components/RecipeModal";
import { RecipeData } from "../../types";
import { fetchRecipes } from "../../utils/recipeUtils";
import * as Progress from "react-native-progress";
import { auth, db } from "@/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";

const HomeScreen: React.FC = () => {
  const categories = [
    { name: "Breakfast", image: require("../../assets/images/egg.png") },
    { name: "Lunch", image: require("../../assets/images/burger.png") },
    { name: "Dinner", image: require("../../assets/images/spaghetti.png") },
    { name: "Dessert", image: require("../../assets/images/dessert.png") },
    { name: "Diet", image: require("../../assets/images/vegetable.png") },
  ];

  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const animatedValue = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchProfileData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }
      }
    };

    loadRecipes();
    fetchProfileData();
  }, [animatedValue]);

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
                data.map((recipe) => ({
                  ...recipe,
                  favorite: likedRecipeIds.includes(recipe.id),
                }))
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

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerLeftSide}>
            <Text style={styles.greeting}>Hello,</Text>
            <Animated.Text
              style={[
                styles.name,
                {
                  transform: [{ translateX: animatedValue }],
                },
              ]}
            >
              {userName ? userName : ""} 👋
            </Animated.Text>
          </View>
          <View>
            <Link href="/profile" asChild>
              <Pressable>
                <Image
                  style={styles.profileImage}
                  source={require("../../assets/images/profile.png")}
                />
              </Pressable>
            </Link>
          </View>
        </View>
        <View style={styles.searchWrapper}>
          <Text style={styles.prompt}>What would you like to cook today?</Text>
          <View style={styles.inputContainer}>
            <Icon
              name="search-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              placeholder="Search any recipe"
              style={styles.searchInput}
              keyboardType="default"
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.category,
                index === selectedCategory && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(index)}
            >
              <Image source={category.image} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.recommendationsTitle}>Recommendations</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
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
        ) : (
          <View style={styles.recommendations}>
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onPress={() => openModal(recipe.id)}
                onToggleFavorite={() => toggleFavorite(recipe.id)}
              />
            ))}
          </View>
        )}

        <RecipeModal
          visible={modalVisible}
          recipe={selectedRecipe}
          onClose={closeModal}
          onToggleFavorite={toggleFavorite}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeftSide: {
    flexDirection: "row",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "normal",
    color: "#666",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 4,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: "auto",
  },
  searchWrapper: {
    marginTop: 8,
  },
  prompt: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
  inputText: {
    width: "100%",
    marginLeft: 8,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F4FA",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  category: {
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: "#FFF",
    borderRadius: 12,
    alignItems: "center",
    width: 80,
    height: 85,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: "#F6A028",
  },
  categoryImage: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginBottom: 4,
    objectFit: "contain",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "flex-start",
    marginVertical: 8,
  },
  recommendations: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
});

export default HomeScreen;
