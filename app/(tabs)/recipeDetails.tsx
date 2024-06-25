import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  ListRenderItem,
} from "react-native";

interface Ingredient {
  id: string;
  name: string;
  image: any;
}

const ingredients: Ingredient[] = [
  { id: "1", name: "Chicken", image: require("../../assets/images/egg.png") },
  { id: "2", name: "Chicken", image: require("../../assets/images/egg.png") },
  { id: "3", name: "Chicken", image: require("../../assets/images/egg.png") },
  { id: "4", name: "Chicken", image: require("../../assets/images/egg.png") },
];

const Recipe: React.FC = () => {
  const renderIngredient: ListRenderItem<Ingredient> = ({ item }) => (
    <View style={styles.ingredient}>
      <Image source={item.image} style={styles.ingredientImage} />
      <Text style={styles.ingredientText}>{item.name}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../../assets/images/creamyPasta.png")}
        style={styles.image}
      />
      <View style={styles.recipeInfo}>
        <Text style={styles.title}>Creamy Pasta</Text>
        <View style={styles.details}>
          <Text style={styles.detailText}>20 Min</Text>
          <Text style={styles.detailText}>239 Cal</Text>
        </View>
        <Text style={styles.subTitle}>Description</Text>
        <Text style={styles.description}>
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </Text>
        <Text style={styles.subTitle}>Ingredients</Text>
        <FlatList
          data={ingredients}
          renderItem={renderIngredient}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
  },
  recipeInfo: {
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  details: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    color: "#666",
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
