import { useEffect, useState } from "react";
import type { Recipe } from "../utils";

const useLocalStorage = () => {
  const [recipes, setRecipes] = useState(() => {
    // lazy initializer
    // react call this only once when the  component  is mounted
    // if it was just useState([]) it would call JSON.parse on every render
    try {
      return JSON.parse(localStorage.getItem("recipes") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe: Recipe) => {
    setRecipes((prevRecipes: Recipe[]) => {
      if (prevRecipes.some((r: Recipe) => r.id === recipe.id))
        return prevRecipes;
      return [...prevRecipes, recipe];
    });
  };

  const removeRecipe = (recipe: Recipe) => {
    setRecipes((prevRecipes: Recipe[]) =>
      prevRecipes.filter((r: Recipe) => r.id !== recipe.id)
    );
  };

  const isRecipeSaved = (recipe: Recipe) =>
    recipes.some((r: Recipe) => r.id === recipe.id);

  return { addRecipe, removeRecipe, isRecipeSaved, recipes };
};

export default useLocalStorage;
