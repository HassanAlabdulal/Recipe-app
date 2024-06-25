import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import Recipe from "../recipeDetails";

type RecipeData = {
  id: string;
  title: string;
  image: any;
  time: string;
  calories: string;
};

export default function profileScreen() {
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
    {
      id: "7",
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
    <TouchableOpacity style={styles.recipeCard} onPress={() => openModal(item)}>
      <Image source={item.image} style={styles.recipeImage} />
      <Ionicons name="heart" size={24} color="red" style={styles.heartIcon} />
      <Text style={styles.recipeTitle}>{item.title}</Text>
    </TouchableOpacity>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Recipe Details</Text>
            {selectedRecipe && <Recipe recipe={selectedRecipe} />}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    maxHeight: Dimensions.get("window").height * 0.8,
  },
  closeButton: {
    alignSelf: "center",
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#F6A028",
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});
