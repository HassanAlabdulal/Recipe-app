export interface Ingredient {
  id: string;
  name: string;
  image: string;
}

export interface RecipeData {
  id: string;
  title: string;
  time: string;
  calories: string;
  image: string;
  favorite: boolean;
  description: string;
  ingredients: Ingredient[];
  recipe_type: string[];
}
