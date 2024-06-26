import { RecipeData } from "../types";

export const getDummyRecipes = (): RecipeData[] => {
  return [
    {
      id: "1",
      title: "Creamy Pasta",
      time: "20 Min",
      calories: "239 Cal",
      image: require("../assets/images/creamyPasta.png"),
      favorite: false,
    },
    {
      id: "2",
      title: "Spaghetti",
      time: "40 Min",
      calories: "350 Cal",
      image: require("../assets/images/spaghetti.png"),
      favorite: false,
    },
    {
      id: "3",
      title: "Creamy Pasta",
      time: "10 Min",
      calories: "350 Cal",
      image: require("../assets/images/creamyPasta.png"),
      favorite: false,
    },
    {
      id: "4",
      title: "Spaghetti",
      time: "30 Min",
      calories: "350 Cal",
      image: require("../assets/images/creamyPasta.png"),
      favorite: false,
    },
  ];
};

export const getFavoritedRecipes = (): RecipeData[] => {
  return getDummyRecipes().filter((recipe) => recipe.favorite);
};
