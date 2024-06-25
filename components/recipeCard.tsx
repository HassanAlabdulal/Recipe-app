import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface RecipeCardProps {
  title: string;
  time: string;
  imageSource: any;
  onPress: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  time,
  imageSource,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.recipeCard} onPress={onPress}>
      <Image style={styles.recipeImage} source={imageSource} />
      <Text style={styles.recipeTitle}>{title}</Text>
      <Text style={styles.recipeTime}>⏱️ {time}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  recipeImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  recipeTime: {
    fontSize: 14,
    color: "#888",
  },
});

export default RecipeCard;
