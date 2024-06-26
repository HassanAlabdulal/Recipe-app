import { RecipeData } from "../types";

export const getDummyRecipes = (): RecipeData[] => {
  return [
    {
      id: "1",
      title: "Creamy Pasta",
      time: "20 Min",
      calories: "239 Cal",
      image: require("../assets/images/creamyPasta.png"),
      favorite: true,
    },
    {
      id: "2",
      title: "Spaghetti",
      time: "30 Min",
      calories: "350 Cal",
      image: require("../assets/images/spaghetti.png"),
      favorite: true,
    },
    {
      id: "3",
      title: "Creamy Pasta",
      time: "20 Min",
      calories: "239 Cal",
      image: require("../assets/images/creamyPasta.png"),
      favorite: true,
    },
    {
      id: "4",
      title: "Spaghetti",
      time: "30 Min",
      calories: "350 Cal",
      image: require("../assets/images/spaghetti.png"),
      favorite: false,
    },
    {
      id: "5",
      title: "Creamy Pasta",
      time: "20 Min",
      calories: "239 Cal",
      image: require("../assets/images/creamyPasta.png"),
      favorite: true,
    },
    {
      id: "6",
      title: "Spaghetti",
      time: "30 Min",
      calories: "350 Cal",
      image: require("../assets/images/spaghetti.png"),
      favorite: false,
    },
  ];
};

export const getFavoritedRecipes = (recipes: RecipeData[]): RecipeData[] => {
  return recipes.filter((recipe) => recipe.favorite);
};
