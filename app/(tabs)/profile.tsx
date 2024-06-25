import Ionicons from "@expo/vector-icons/Ionicons";

import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";

type Recipe = {
  id: string;
  title: string;
  image: any;
};

export default function profileScreen() {
  const recipes: Recipe[] = [
    {
      id: "1",
      title: "Creamy Pasta",
      image: require("../../assets/images/creamyPasta.png"),
    },
    {
      id: "2",
      title: "Creamy Pasta",
      image: require("../../assets/images/creamyPasta.png"),
    },
    {
      id: "3",
      title: "Creamy Pasta",
      image: require("../../assets/images/creamyPasta.png"),
    },
    {
      id: "4",
      title: "Creamy Pasta",
      image: require("../../assets/images/creamyPasta.png"),
    },
    {
      id: "5",
      title: "Creamy Pasta",
      image: require("../../assets/images/creamyPasta.png"),
    },
    {
      id: "6",
      title: "Creamy Pasta",
      image: require("../../assets/images/creamyPasta.png"),
    },
    {
      id: "7",
      title: "Creamy Pasta",
      image: require("../../assets/images/creamyPasta.png"),
    },
    {
      id: "8",
      title: "Creamy Pasta",
      image: require("../../assets/images/creamyPasta.png"),
    },
  ];

  const renderRecipe = ({ item }: { item: Recipe }) => (
    <View style={styles.recipeCard}>
      <Image source={item.image} style={styles.recipeImage} />
      <Ionicons name="heart" size={24} color="red" style={styles.heartIcon} />
      <Text style={styles.recipeTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/profile.png")}
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>Hassan Alabdulal</Text>
      <Text style={styles.profileDescription}>I love to cook amazing food</Text>
      <Text style={styles.starredRecipesTitle}>My Starred Recipes</Text>
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.recipesContainer}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "",
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileDescription: {
    fontSize: 16,
    color: "#AAAAAA",
    marginBottom: 30,
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
