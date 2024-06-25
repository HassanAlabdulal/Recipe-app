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
import Icon from "react-native-vector-icons/MaterialIcons";

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
  { id: "5", name: "Chicken", image: require("../../assets/images/egg.png") },
  { id: "6", name: "Chicken", image: require("../../assets/images/egg.png") },
];

const Recipe: React.FC = () => {
  const renderIngredient: ListRenderItem<Ingredient> = ({ item }) => (
    <View style={styles.ingredient}>
      <Image source={item.image} style={styles.ingredientImage} />
      <Text style={styles.ingredientText}>{item.name}</Text>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topSection}>
        <Image
          source={require("../../assets/images/creamyPasta.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.recipeInfo}>
          <View style={styles.header}>
            <Text style={styles.title}>Creamy Pasta</Text>
            <Icon name="favorite" size={30} color="red" />
          </View>
          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Icon name="timer" size={20} color="#666" />
              <Text style={styles.detailText}>20 Min</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="local-fire-department" size={20} color="#666" />
              <Text style={styles.detailText}>239 Cal</Text>
            </View>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  topSection: {
    width: "100%",
    height: 300, // Fixed height for the image
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    backgroundColor: "white",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
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
