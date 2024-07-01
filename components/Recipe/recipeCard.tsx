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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RecipeData } from "../../types";

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
      <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <Ionicons
            name={recipe.favorite ? "heart" : "heart-outline"}
            size={24}
            color="red"
            onPress={onToggleFavorite}
          />
        </View>
        <View style={styles.detailsContainer}>
          <MaterialIcons name="timer" size={20} color="#666" />
          <Text style={styles.detailText}>{recipe.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    alignItems: "center",
    margin: 5,
    width: Dimensions.get("window").width / 2 - 30,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recipeImage: {
    width: "100%",
    height: 150,
  },
  infoContainer: {
    padding: 10,
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  recipeTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
});

export default RecipeCard;
