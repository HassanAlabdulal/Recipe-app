import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
} from "react-native";
import { Link } from "expo-router";
import RecipeCard from "../../components/recipeCard";
import RecipeModal from "../../components/RecipeModal";
import SearchBar from "../../components/SearchBar";
import CategoryFilter from "../../components/Category/CategoryFilter";
import { RecipeData } from "../../types";
import { fetchRecipes } from "../../utils/recipeUtils";
import * as Progress from "react-native-progress";
import { auth, db } from "@/firebaseConfig";
import * as Animatable from "react-native-animatable";
import { categories } from "../../utils/categoriesData";
import {
  getDoc,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const HomeScreen: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const animatedValue = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchProfileData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }
      }
    };

    loadRecipes();
    fetchProfileData();
  }, [animatedValue]);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);

      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          const likedRecipeIds = userData.favorites_recipes;

          const loadRecipes = async () => {
            try {
              const data = await fetchRecipes();
              setRecipes(
                data.map((recipe) => ({
                  ...recipe,
                  favorite: likedRecipeIds.includes(recipe.id),
                }))
              );
              setFilteredRecipes(
                data.map((recipe) => ({
                  ...recipe,
                  favorite: likedRecipeIds.includes(recipe.id),
                }))
              );
            } catch (error: any) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
          };

          loadRecipes();
        }
      });

      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [searchTerm, recipes]);

  useEffect(() => {
    if (selectedCategory !== null) {
      if (categories[selectedCategory].name === "All") {
        setFilteredRecipes(recipes);
      } else {
        const category = categories[selectedCategory].name;
        const filtered = recipes.filter((recipe) =>
          recipe.recipe_type.includes(category)
        );
        setFilteredRecipes(filtered);
      }
    }
  }, [selectedCategory, recipes]);

  const openModal = (recipeId: string) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    setSelectedRecipe(recipe || null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRecipe(null);
  };

  const toggleFavorite = async (id: string) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      const recipeDocRef = doc(db, "recipes", id);

      const recipe = recipes.find((r) => r.id === id);
      if (recipe) {
        const newFavoriteStatus = !recipe.favorite;

        // Update the recipe's favorite status in Firestore
        await updateDoc(recipeDocRef, { favorite: newFavoriteStatus });

        // Update the user's favorites_recipes array in Firestore
        if (newFavoriteStatus) {
          await updateDoc(userDocRef, {
            favorites_recipes: arrayUnion(id),
          });
        } else {
          await updateDoc(userDocRef, {
            favorites_recipes: arrayRemove(id),
          });
        }

        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.id === id
              ? { ...recipe, favorite: newFavoriteStatus }
              : recipe
          )
        );
        setFilteredRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.id === id
              ? { ...recipe, favorite: newFavoriteStatus }
              : recipe
          )
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerLeftSide}>
            <Text style={styles.greeting}>Hello,</Text>
            <Animated.Text
              style={[
                styles.name,
                {
                  transform: [{ translateX: animatedValue }],
                },
              ]}
            >
              {userName ? userName : ""}👋
            </Animated.Text>
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
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        </View>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <Text style={styles.recommendationsTitle}>Recommendations</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Progress.Circle
              size={40}
              indeterminate={true}
              thickness={3}
              borderColor={"#F6A028"}
              borderWidth={2}
            />
          </View>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : filteredRecipes.length === 0 ? (
          <Text style={styles.noRecipesText}>
            No recipes found with this name
          </Text>
        ) : (
          <Animatable.View
            key={selectedCategory}
            animation="slideInUp"
            easing="ease-in"
            duration={500}
            style={styles.recommendations}
          >
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onPress={() => openModal(recipe.id)}
                onToggleFavorite={() => toggleFavorite(recipe.id)}
              />
            ))}
          </Animatable.View>
        )}

        <RecipeModal
          visible={modalVisible}
          recipe={selectedRecipe}
          onClose={closeModal}
          onToggleFavorite={toggleFavorite}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 48,
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
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "flex-start",
    marginVertical: 8,
  },
  recommendations: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  noRecipesText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 32,
  },
});

export default HomeScreen;
