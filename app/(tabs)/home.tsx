import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Animated } from "react-native";
import Header from "../../components/HomeScreen/Header";
import SearchBar from "../../components/SearchBar";
import CategoryFilter from "../../components/Category/CategoryFilter";
import RecipeList from "../../components/Recipe/RecipeList";
import RecipeModal from "../../components/Recipe/RecipeModal";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";
import { categories } from "@/utils/categoriesData";
import useRecipes from "../../hooks/useRecipes";
import useProfileData from "../../hooks/useProfileData";
import useToggleFavorite from "../../hooks/useToggleFavorite";
import { RecipeData } from "../../types";

const HomeScreen: React.FC = () => {
  const { recipes, setRecipes, loading, error } = useRecipes();
  const { profileData } = useProfileData();
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeData[]>(recipes);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const animatedValue = useRef(new Animated.Value(-200)).current;

  const { toggleFavorite } = useToggleFavorite(recipes, setRecipes);

  useEffect(() => {
    if (profileData?.name) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [profileData?.name]);

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

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

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Header
          animatedValue={animatedValue}
          userName={profileData?.name || ""}
        />
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
