import { auth, db } from "@/firebaseConfig";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { RecipeData } from "../types";

const useToggleFavorite = (
  recipes: RecipeData[],
  setRecipes: React.Dispatch<React.SetStateAction<RecipeData[]>>
) => {
  const toggleFavorite = async (id: string) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);

      // Optimistically update the local state
      setRecipes((prevRecipes: RecipeData[]) =>
        prevRecipes.map((recipe) =>
          recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
        )
      );

      const recipeDocRef = doc(db, "recipes", id);
      const recipe = recipes.find((r) => r.id === id);
      if (recipe) {
        const newFavoriteStatus = !recipe.favorite;

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

        // Update the recipe's favorite status in Firestore
        await updateDoc(recipeDocRef, { favorite: newFavoriteStatus });
      }
    }
  };

  return { toggleFavorite };
};

export default useToggleFavorite;
