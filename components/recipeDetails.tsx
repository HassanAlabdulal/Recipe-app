import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Ingredient {
  id: string;
  name: string;
  image: any;
}

interface RecipeProps {
  recipe: {
    title: string;
    time: string;
    calories: string;
  };
}

const ingredients: Ingredient[] = [
  { id: "1", name: "Chicken", image: require("../assets/images/egg.png") },
  { id: "2", name: "Chicken", image: require("../assets/images/egg.png") },
  { id: "3", name: "Chicken", image: require("../assets/images/egg.png") },
  { id: "4", name: "Chicken", image: require("../assets/images/egg.png") },
  { id: "5", name: "Chicken", image: require("../assets/images/egg.png") },
  { id: "6", name: "Chicken", image: require("../assets/images/egg.png") },
];

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  const renderIngredient = ({ item }: { item: Ingredient }) => (
    <View style={styles.ingredient}>
      <Image source={item.image} style={styles.ingredientImage} />
      <Text style={styles.ingredientText}>{item.name}</Text>
    </View>
  );

  const renderHeader = () => (
    <>
      <View style={styles.topSection}>
        <Image
          source={require("../assets/images/creamyPasta.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.recipeInfo}>
        <View style={styles.header}>
          <Text style={styles.title}>{recipe.title}</Text>
          <Icon name="favorite" size={30} color="red" />
        </View>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Icon name="timer" size={20} color="#666" />
            <Text style={styles.detailText}>{recipe.time}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="local-fire-department" size={20} color="#666" />
            <Text style={styles.detailText}>{recipe.calories}</Text>
          </View>
        </View>
        <Text style={styles.subTitle}>Description</Text>
        <Text style={styles.description}>
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </Text>
        <Text style={styles.subTitle}>Ingredients</Text>
      </View>
    </>
  );

  return (
    <FlatList
      style={styles.container}
      data={ingredients}
      renderItem={renderIngredient}
      keyExtractor={(item) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      ListHeaderComponent={renderHeader}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 16,
  },
  topSection: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  recipeInfo: {
    padding: 16,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    width: "50%",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  detailText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 4,
  },
  description: {
    color: "#666",
    fontSize: 14,
    marginBottom: 16,
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
  },
  ingredientsList: {
    alignItems: "center",
  },
  ingredient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  ingredientImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 16,
  },
});

export default Recipe;
