export type Ingredient = {
  id: string;
  name: string;
  image: any;
};

export type RecipeData = {
  id: string;
  title: string;
  time: string;
  calories: string;
  image: any;
  favorite: boolean;
  description: string;
  ingredients: Ingredient[];
};
