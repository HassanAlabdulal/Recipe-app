import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import RecipeCard from "../../components/recipeCard";
import ProfileHeader from "../../components/ProfileHeader";
import RecipeModal from "../../components/RecipeModal";
import { getFavoritedRecipes, getDummyRecipes } from "../../utils/recipeUtils";
import { RecipeData } from "../../types";

export default function ProfileScreen() {
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);

  useEffect(() => {
    // Load the favorited recipes
    const favoritedRecipes = getFavoritedRecipes();
    setRecipes(favoritedRecipes);
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

  const toggleFavorite = (id: string) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
      )
    );
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
      <ProfileHeader
        name="Hassan Alabdulal"
        description="I love to cook amazing food"
        imageSource={require("../../assets/images/profile.png")}
      />
      <Text style={styles.starredRecipesTitle}>My Starred Recipes</Text>
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.recipesContainer}
        columnWrapperStyle={styles.columnWrapper}
      />
      <RecipeModal
        visible={modalVisible}
        recipe={selectedRecipe}
        onClose={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  recipesContainer: {
    justifyContent: "center",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
