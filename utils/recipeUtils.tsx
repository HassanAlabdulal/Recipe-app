import { RecipeData } from "../types";

export const getDummyRecipes = (): RecipeData[] => {
  return [
    {
      id: "1",
      title: "Creamy Pasta",
      time: "30 Min",
      calories: "239 Cal",
      image: require("../assets/images/creamyPasta.png"),
      favorite: true,
      description: "A delicious and creamy pasta dish perfect for any meal.",
      ingredients: [
        {
          id: "1",
          name: "Pasta",
          image: require("../assets/images/spaghetti.png"),
        },
        {
          id: "2",
          name: "Cream",
          image: require("../assets/images/egg.png"),
        },
        {
          id: "3",
          name: "Garlic",
          image: require("../assets/images/burger.png"),
        },
      ],
    },
    {
      id: "2",
      title: "Spaghetti",
      time: "40 Min",
      calories: "350 Cal",
      image: require("../assets/images/spaghetti.png"),
      favorite: false,
      description: "Classic spaghetti with a rich and flavorful sauce.",
      ingredients: [
        {
          id: "1",
          name: "Spaghetti",
          image: require("../assets/images/spaghetti.png"),
        },
        {
          id: "2",
          name: "Tomato Sauce",
          image: require("../assets/images/egg.png"),
        },
        {
          id: "3",
          name: "Ground Beef",
          image: require("../assets/images/burger.png"),
        },
        {
          id: "4",
          name: "Ground Beef",
          image: require("../assets/images/burger.png"),
        },
      ],
    },
    {
      id: "3",
      title: "Spaghetti",
      time: "40 Min",
      calories: "350 Cal",
      image: require("../assets/images/spaghetti.png"),
      favorite: false,
      description: "Classic spaghetti with a rich and flavorful sauce.",
      ingredients: [
        {
          id: "1",
          name: "Spaghetti",
          image: require("../assets/images/spaghetti.png"),
        },
        {
          id: "2",
          name: "Tomato Sauce",
          image: require("../assets/images/egg.png"),
        },
        {
          id: "3",
          name: "Ground Beef",
          image: require("../assets/images/burger.png"),
        },
        {
          id: "4",
          name: "Ground Beef",
          image: require("../assets/images/burger.png"),
        },
      ],
    },
    {
      id: "4",
      title: "Spaghetti",
      time: "40 Min",
      calories: "350 Cal",
      image: require("../assets/images/spaghetti.png"),
      favorite: false,
      description: "Classic spaghetti with a rich and flavorful sauce.",
      ingredients: [
        {
          id: "1",
          name: "Spaghetti",
          image: require("../assets/images/spaghetti.png"),
        },
        {
          id: "2",
          name: "Tomato Sauce",
          image: require("../assets/images/egg.png"),
        },
        {
          id: "3",
          name: "Ground Beef",
          image: require("../assets/images/burger.png"),
        },
        {
          id: "4",
          name: "Ground Beef",
          image: require("../assets/images/burger.png"),
        },
      ],
    },
    {
      id: "5",
      title: "Spaghetti",
      time: "40 Min",
      calories: "350 Cal",
      image: require("../assets/images/spaghetti.png"),
      favorite: false,
      description: "Classic spaghetti with a rich and flavorful sauce.",
      ingredients: [
        {
          id: "1",
          name: "Spaghetti",
          image: require("../assets/images/spaghetti.png"),
        },
        {
          id: "2",
          name: "Tomato Sauce",
          image: require("../assets/images/egg.png"),
        },
        {
          id: "3",
          name: "Ground Beef",
          image: require("../assets/images/burger.png"),
        },
        {
          id: "4",
          name: "Ground Beef",
          image: require("../assets/images/burger.png"),
        },
      ],
    },
    {
      id: "6",
      title: "Spaghetti",
      time: "40 Min",
      calories: "350 Cal",
      image: require("../assets/images/spaghetti.png"),
      favorite: true,
      description: "Classic spaghetti with a rich and flavorful sauce.",
      ingredients: [
        {
          id: "1",
          name: "Spaghetti",
          image: require("../assets/images/spaghetti.png"),
        },
        {
          id: "2",
          name: "Tomato Sauce",
          image: require("../assets/images/egg.png"),
        },
        {
          id: "3",
          name: "Ground Beef",
          image: require("../assets/images/burger.png"),
        },
        {
          id: "4",
          name: "Ground Beef",
          image: require("../assets/images/burger.png"),
        },
      ],
    },
    {
      id: "7",
      title: "Spaghetti",
      time: "40 Min",
      calories: "350 Cal",
      image: require("../assets/images/spaghetti.png"),
      favorite: false,
      description: "Classic spaghetti with a rich and flavorful sauce.",
      ingredients: [
        {
          id: "1",
          name: "Spaghetti",
          image: require("../assets/images/spaghetti.png"),
        },
        {
          id: "2",
          name: "Tomato Sauce",
          image: require("../assets/images/egg.png"),
        },
        {
          id: "3",
          name: "Ground Beef",
          image: require("../assets/images/burger.png"),
        },
        {
          id: "4",
          name: "Ground Beef",
          image: require("../assets/images/burger.png"),
        },
      ],
    },
    {
      id: "8",
      title: "Spaghetti",
      time: "40 Min",
      calories: "350 Cal",
      image: require("../assets/images/spaghetti.png"),
      favorite: true,
      description: "Classic spaghetti with a rich and flavorful sauce.",
      ingredients: [
        {
          id: "1",
          name: "Spaghetti",
          image: require("../assets/images/spaghetti.png"),
        },
        {
          id: "2",
          name: "Tomato Sauce",
          image: require("../assets/images/egg.png"),
        },
        {
          id: "3",
          name: "Ground Beef",
          image: require("../assets/images/burger.png"),
        },
        {
          id: "4",
          name: "Ground Beef",
          image: require("../assets/images/burger.png"),
        },
      ],
    },
  ];
};

export const getFavoritedRecipes = (recipes: RecipeData[]): RecipeData[] => {
  return recipes.filter((recipe) => recipe.favorite);
};
