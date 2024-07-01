// hooks/useRecipes.ts
import { useState, useEffect } from "react";
import { RecipeData } from "../types";
import { fetchRecipes } from "../utils/recipeUtils";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const useRecipes = (filterFavorites: boolean = false) => {
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

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
              const updatedRecipes = data.map((recipe) => ({
                ...recipe,
                favorite: likedRecipeIds.includes(recipe.id),
              }));
              setRecipes(
                filterFavorites
                  ? updatedRecipes.filter((recipe) => recipe.favorite)
                  : updatedRecipes
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
  }, [filterFavorites]);

  return { recipes, setRecipes, loading, error };
};

export default useRecipes;
