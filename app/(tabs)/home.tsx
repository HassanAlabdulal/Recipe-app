import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Link } from "expo-router";
import RecipeCard from "../../components/recipeCard";
import RecipeModal from "../../components/RecipeModal";
import { getDummyRecipes } from "../../utils/recipeUtils";
import { RecipeData } from "../../types";

const HomeScreen: React.FC = () => {
  const categories = [
    { name: "Breakfast", image: require("../../assets/images/egg.png") },
    { name: "Lunch", image: require("../../assets/images/burger.png") },
    { name: "Dinner", image: require("../../assets/images/spaghetti.png") },
    { name: "Dessert", image: require("../../assets/images/dessert.png") },
    { name: "Diet", image: require("../../assets/images/vegetable.png") },
  ];

  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);

  useEffect(() => {
    const loadedRecipes = getDummyRecipes();
    setRecipes(loadedRecipes);
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

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerLeftSide}>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.name}>Hassan 👋</Text>
        </View>

        <View>
          <Link href="/profile" asChild>
            <Pressable>
              <Image
                style={styles.profileImage}
                source={require("../../assets/images/profile.png")}
              />
            </Pressable>
          </Link>
        </View>
      </View>
      <View style={styles.searchWrapper}>
        <Text style={styles.prompt}>What would you like to cook today?</Text>
        <View style={styles.inputContainer}>
          <Icon
            name="search-outline"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            placeholder="Search any recipe"
            style={styles.searchInput}
            keyboardType="default"
          />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.category,
              index === selectedCategory && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(index)}
          >
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.recommendationsTitle}>Recommendations</Text>
      <View style={styles.recommendations}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onPress={() => openModal(recipe.id)}
            onToggleFavorite={() => toggleFavorite(recipe.id)}
          />
        ))}
      </View>

      <RecipeModal
        visible={modalVisible}
        recipe={selectedRecipe}
        onClose={closeModal}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 48,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeftSide: {
    flexDirection: "row",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "normal",
    color: "#666",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 4,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: "auto",
  },
  searchWrapper: {
    marginTop: 8,
  },
  prompt: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
  inputText: {
    width: "100%",
    marginLeft: 8,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F4FA",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  category: {
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: "#FFF",
    borderRadius: 12,
    alignItems: "center",
    width: 80,
    height: 85,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: "#F6A028",
  },
  categoryImage: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginBottom: 4,
    objectFit: "contain",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  recommendations: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default HomeScreen;
