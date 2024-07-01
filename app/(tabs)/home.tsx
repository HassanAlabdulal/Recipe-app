import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Animated } from "react-native";
import { fetchRecipes } from "../../utils/recipeUtils";
import { auth, db } from "@/firebaseConfig";
import {
  getDoc,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import Header from "../../components/HomeScreen/Header";
import SearchBar from "../../components/SearchBar";
import CategoryFilter from "../../components/Category/CategoryFilter";
import RecipeList from "../../components/Recipe/RecipeList";
import RecipeModal from "../../components/RecipeModal";
import { RecipeData } from "../../types";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";
import { categories } from "@/utils/categoriesData";

const HomeScreen: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const animatedValue = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
        setFilteredRecipes(data);
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
              setFilteredRecipes(
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

  useEffect(() => {
    if (searchTerm) {
      const filtered = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [searchTerm, recipes]);

  useEffect(() => {
    if (selectedCategory !== null) {
      if (categories[selectedCategory].name === "All") {
        setFilteredRecipes(recipes);
      } else {
        const category = categories[selectedCategory].name;
        const filtered = recipes.filter((recipe) =>
          recipe.recipe_type.includes(category)
        );
        setFilteredRecipes(filtered);
      }
    }
  }, [selectedCategory, recipes]);

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

        await updateDoc(recipeDocRef, { favorite: newFavoriteStatus });

        if (newFavoriteStatus) {
          await updateDoc(userDocRef, {
            favorites_recipes: arrayUnion(id),
          });
        } else {
          await updateDoc(userDocRef, {
            favorites_recipes: arrayRemove(id),
          });
        }

        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.id === id
              ? { ...recipe, favorite: newFavoriteStatus }
              : recipe
          )
        );
        setFilteredRecipes((prevRecipes) =>
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
        <Header animatedValue={animatedValue} userName={userName} />
        <View style={styles.searchWrapper}>
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        </View>
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <Text style={styles.recommendationsTitle}>Recommendations</Text>
        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : filteredRecipes.length === 0 ? (
          <Text style={styles.noRecipesText}>
            No recipes found with this name
          </Text>
        ) : (
          <RecipeList
            recipes={filteredRecipes}
            onOpenModal={openModal}
            onToggleFavorite={toggleFavorite}
            selectedCategory={selectedCategory}
          />
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
  searchWrapper: {
    marginTop: 8,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "flex-start",
    marginVertical: 8,
  },
  noRecipesText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 32,
  },
});

export default HomeScreen;
