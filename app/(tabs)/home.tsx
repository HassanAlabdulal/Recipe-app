import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.name}>Hassan 👋</Text>
        <Image
          style={styles.profileImage}
          source={require("../../assets/images/profile.png")}
        />
      </View>
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
      <View style={styles.categories}>
        <TouchableOpacity style={[styles.category, styles.selectedCategory]}>
          <Text style={styles.categoryText}>Breakfast</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category}>
          <Text style={styles.categoryText}>Lunch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category}>
          <Text style={styles.categoryText}>Dinner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category}>
          <Text style={styles.categoryText}>Dessert</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.recommendationsTitle}>Recommendations</Text>
      <View style={styles.recommendations}>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <View key={index} style={styles.recipeCard}>
              <Image
                style={styles.recipeImage}
                source={require("../../assets/images/creamyPasta.png")}
              />
              <Text style={styles.recipeTitle}>Creamy Pasta</Text>
              <Text style={styles.recipeTime}>⏱️ 20 Min</Text>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 64,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "normal",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 4,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: "auto",
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
    marginVertical: 16,
  },
  category: {
    padding: 8,
    backgroundColor: "#FFF",
    borderRadius: 8,
    alignItems: "center",
  },
  selectedCategory: {
    backgroundColor: "#F6A028",
  },
  categoryText: {
    fontSize: 16,
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
  },
  recipeCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  recipeImage: {
    width: "100%",
    height: 100,
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

export default HomeScreen;
