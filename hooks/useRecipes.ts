import { useState, useEffect } from "react";
import { RecipeData } from "../types";
import { fetchRecipes } from "../utils/recipeUtils";
import { auth, db } from "@/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const useRecipes = (filterFavorites: boolean = false) => {
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const recipesData = await fetchRecipes();
        const currentUser = auth.currentUser;

        if (currentUser) {
          const userDocRef = doc(db, "users", currentUser.uid);

          onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
              const userData = doc.data();
              const likedRecipeIds = userData.favorites_recipes || [];

              const updatedRecipes = recipesData.map((recipe) => ({
                ...recipe,
                favorite: likedRecipeIds.includes(recipe.id),
              }));

              setRecipes(
                filterFavorites
                  ? updatedRecipes.filter((recipe) => recipe.favorite)
                  : updatedRecipes
              );
            } else {
              setRecipes(filterFavorites ? [] : recipesData);
            }
          });
        } else {
          setRecipes(recipesData);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [filterFavorites]);

  return { recipes, setRecipes, loading, error };
};

export default useRecipes;
