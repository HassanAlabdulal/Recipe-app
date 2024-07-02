import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import RecipeCard from "../../components/Recipe/recipeCard";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import RecipeModal from "../../components/Recipe/RecipeModal";
import useProfileData from "../../hooks/useProfileData";
import useRecipes from "../../hooks/useRecipes";
import useToggleFavorite from "../../hooks/useToggleFavorite";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";
import { RecipeData } from "../../types";
import * as Animatable from "react-native-animatable";

const ProfileScreen: React.FC = () => {
  const { profileData, loading: profileLoading } = useProfileData();
  const { recipes, setRecipes, loading, error } = useRecipes(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);

  const { toggleFavorite } = useToggleFavorite(recipes, setRecipes);

  const openModal = (recipeId: string) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    setSelectedRecipe(recipe || null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRecipe(null);
  };

  const renderRecipe = ({ item }: { item: RecipeData }) => (
    <RecipeCard
      recipe={item}
      onPress={() => openModal(item.id)}
      onToggleFavorite={() => toggleFavorite(item.id)}
    />
  );

  const likedRecipesCount = recipes.filter((recipe) => recipe.favorite).length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {profileLoading ? (
        <LoadingIndicator />
      ) : (
        <ProfileHeader
          name={profileData.name}
          age={profileData.age}
          bio={profileData.bio}
          location={profileData.location}
          imageSource={require("../../assets/images/profile.png")}
          likes={likedRecipesCount}
        />
      )}
      <Animatable.Text
        animation="slideInLeft"
        easing="ease-in-out"
        style={styles.starredRecipesTitle}
      >
        My Liked Recipes
      </Animatable.Text>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : recipes.length === 0 ? (
        <Text style={styles.noRecipesText}>You have no liked recipes.</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animatable.View
            animation="slideInUp"
            easing="ease-in"
            duration={500}
            style={styles.recipesContainer}
          >
            <FlatList
              data={recipes}
              renderItem={renderRecipe}
              keyExtractor={(item) => item.id}
              numColumns={2}
              contentContainerStyle={styles.recipesContainer}
              columnWrapperStyle={styles.columnWrapper}
            />
          </Animatable.View>
        </ScrollView>
      )}
      <RecipeModal
        visible={modalVisible}
        recipe={selectedRecipe}
        onClose={closeModal}
        onToggleFavorite={toggleFavorite}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
    width: "100%",
    paddingHorizontal: 20,
  },
  starredRecipesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 8,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  noRecipesText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 32,
  },
  recipesContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: "flex-start",
    width: "100%",
  },
});

export default ProfileScreen;
