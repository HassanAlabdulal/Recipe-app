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

type RecipeData = {
  id: string;
  title: string;
  image: any;
  time: string;
  calories: string;
};

interface RecipeCardProps {
  recipe: RecipeData;
  onPress: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity style={styles.recipeCard} onPress={onPress}>
      <Image source={recipe.image} style={styles.recipeImage} />
      <Ionicons
        // name="heart-outline"
        name="heart"
        size={24}
        color="red"
        style={styles.heartIcon}
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
