// components/recipeCard.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RecipeData } from "../types";

interface RecipeCardProps {
  recipe: RecipeData;
  onPress: () => void;
  onToggleFavorite: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onPress,
  onToggleFavorite,
}) => {
  return (
    <TouchableOpacity style={styles.recipeCard} onPress={onPress}>
      <Image source={recipe.image} style={styles.recipeImage} />
      <Ionicons
        name={recipe.favorite ? "heart" : "heart-outline"}
        size={24}
        color="red"
        style={styles.heartIcon}
        onPress={onToggleFavorite}
      />
      <Text style={styles.recipeTitle}>{recipe.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    alignItems: "center",
    margin: 5,
    width: Dimensions.get("window").width / 2 - 30,
  },
  recipeImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default RecipeCard;