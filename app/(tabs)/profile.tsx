import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import RecipeCard from "../../components/recipeCard";
import ProfileHeader from "../../components/ProfileHeader";
import RecipeModal from "../../components/RecipeModal";
import Recipe from "../../components/recipeDetails";

type RecipeData = {
  id: string;
  title: string;
  image: any;
  time: string;
  calories: string;
};

export default function ProfileScreen() {
  const recipes: RecipeData[] = [
    {
      id: "1",
      title: "Creamy Pasta",
      image: require("../../assets/images/creamyPasta.png"),
      time: "20 Min",
      calories: "239 Cal",
    },
    {
      id: "2",
      title: "Creamy Pasta",
      image: require("../../assets/images/creamyPasta.png"),
      time: "20 Min",
      calories: "239 Cal",
    },
    {
      id: "3",
      title: "Creamy Pasta",
      image: require("../../assets/images/creamyPasta.png"),
      time: "20 Min",
      calories: "239 Cal",
    },
    {
      id: "4",
      title: "Creamy Pasta",
      image: require("../../assets/images/creamyPasta.png"),
      time: "20 Min",
      calories: "239 Cal",
    },
    {
      id: "5",
      title: "Creamy Pasta",
      image: require("../../assets/images/creamyPasta.png"),
      time: "20 Min",
      calories: "239 Cal",
    },
    {
      id: "6",
      title: "Creamy Pasta",
      image: require("../../assets/images/creamyPasta.png"),
      time: "20 Min",
      calories: "239 Cal",
    },
  ];

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);

  const openModal = (recipe: RecipeData) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRecipe(null);
  };

  const renderRecipe = ({ item }: { item: RecipeData }) => (
    <RecipeCard recipe={item} onPress={() => openModal(item)} />
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
