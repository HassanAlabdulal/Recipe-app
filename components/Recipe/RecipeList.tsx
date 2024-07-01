import React from "react";
import { View, StyleSheet } from "react-native";
import RecipeCard from "./recipeCard";
import * as Animatable from "react-native-animatable";
import { RecipeData } from "../../types";

interface RecipeListProps {
  recipes: RecipeData[];
  onOpenModal: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  selectedCategory: number;
}

const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  onOpenModal,
  onToggleFavorite,
  selectedCategory,
}) => {
  return (
    <Animatable.View
      key={selectedCategory}
      animation="slideInUp"
      easing="ease-in"
      duration={500}
      style={styles.recommendations}
    >
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onPress={() => onOpenModal(recipe.id)}
          onToggleFavorite={() => onToggleFavorite(recipe.id)}
        />
      ))}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  recommendations: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default RecipeList;
