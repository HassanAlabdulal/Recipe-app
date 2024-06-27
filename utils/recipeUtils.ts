import { db } from "../firebaseConfig";
import { RecipeData, Ingredient } from "../types";
import { collection, getDocs } from "firebase/firestore";

export const fetchRecipes = async (): Promise<RecipeData[]> => {
  const recipeCollection = await getDocs(collection(db, "recipes"));
  const recipes: RecipeData[] = [];

  for (const doc of recipeCollection.docs) {
    const data = doc.data();
    const recipe: RecipeData = {
      id: doc.id,
      title: data.title,
      time: data.time,
      calories: data.calories,
      image: data.image,
      favorite: data.favorite,
      description: data.description,
      ingredients: [],
    };

    const ingredientsCollection = await getDocs(
      collection(db, "recipes", doc.id, "ingredients")
    );

    const ingredients: Ingredient[] = ingredientsCollection.docs.map(
      (ingredientDoc) => {
        const ingredientData = ingredientDoc.data();
        return {
          id: ingredientDoc.id,
          name: ingredientData.name,
          image: ingredientData.image,
        };
      }
    );

    recipe.ingredients = ingredients;
    recipes.push(recipe);
  }

  return recipes;
};
