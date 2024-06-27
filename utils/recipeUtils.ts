import firestore from "@react-native-firebase/firestore";
import { RecipeData, Ingredient } from "../types";

export const fetchRecipes = async (): Promise<RecipeData[]> => {
  const recipeCollection = await firestore().collection("recipes").get();
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

    const ingredientsCollection = await firestore()
      .collection("recipes")
      .doc(doc.id)
      .collection("ingredients")
      .get();

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

export const getFavoritedRecipes = (recipes: RecipeData[]): RecipeData[] => {
  return recipes.filter((recipe) => recipe.favorite);
};
