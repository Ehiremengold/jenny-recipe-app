import {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import "./App.css";
import type { Recipe } from "./utils";
import { Search } from "lucide-react";
import { ThemeContext } from "./context/context";
import useLocalStorage from "./hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import Layout from "./component/Layout";

function App() {
  const { theme } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState<string>("");

  const [sortOptions, setSortOptions] = useState<{
    order: string;
  } | null>(null);

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recipes", sortOptions],
    queryFn: async () => {
      const url = sortOptions
        ? `https://dummyjson.com/recipes?sortBy=name&order=${sortOptions.order}`
        : "https://dummyjson.com/recipes";
      const response = await fetch(url);
      const result = await response.json();
      return result.recipes;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  useLayoutEffect(() => {
    setTimeout(() => {
      document.title = "Jenny's Recipe App";
    }, 2000);
  }, []);

  const { isRecipeSaved, removeRecipe, addRecipe } = useLocalStorage();

  const handleSortChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    setSortOptions(order ? { order } : null);
  }, []);

  const handleRecipeSaving = (recipe: Recipe) =>
    isRecipeSaved(recipe) ? removeRecipe(recipe) : addRecipe(recipe);

  const searchResults = useMemo(() => {
    if (!searchText) return data;
    return data.filter((recipe: Recipe) =>
      recipe.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  return (
    <Layout>
      <section className="sm:w-[80%] w-[95%]  mx-auto pl-6 mt-20">
        <div className="flex gap-5 items-center mt-5 justify-between pr-6 w-full">
          <div className="flex gap-5 items-center">
            <h1>Sort By</h1>
            <select
              className={` ${
                theme === "light"
                  ? "border-gray-300"
                  : "border-white text-black bg-white"
              } border bg-transparent rounded-md px-2 outline-none`}
              name=""
              id=""
              onChange={handleSortChange}
            >
              <option value=""></option>
              <option value={"asc"}>asc</option>
              <option value={"desc"}>desc</option>
            </select>
          </div>
          <div className="relative w-1/3">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={` ${
                theme === "light"
                  ? "border-gray-300"
                  : "border-white text-black bg-white"
              } border bg-transparent rounded-md px-2 py-2 w-full outline-none`}
            />
            <div className="absolute  right-2 top-[50%] translate-y-[-50%]">
              <Search className="text-gray-400" />
            </div>
          </div>
        </div>
      </section>
      <section className="grid mx-auto xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 sm:w-[80%] w-[95%] mt-10">
        {searchText.length > 0 && searchResults.length > 0 ? (
          searchResults.map((recipe: Recipe) => {
            const { id, name, difficulty, image, rating, tags } = recipe;
            return (
              <div className="max-w-2xl mx-auto p-6 w-full" key={id}>
                <div className="bg-white rounded-2xl h-full w-full shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <div className="relative h-64 md:h-80">
                    <img
                      src={image}
                      alt={`${name}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-md">
                      <svg
                        className="w-4 h-4 text-yellow-500 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-800">
                        {rating}
                      </span>
                      <span className="text-xs text-gray-500">(3)</span>
                    </div>

                    <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                      <span
                        className={` ${
                          difficulty === "Easy"
                            ? "bg-green-500/90 text-white"
                            : difficulty === "Medium"
                            ? "bg-indigo-200 text-gray-700"
                            : "bg-red-500/90 text-white"
                        }  text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm`}
                      >
                        {difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-5">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {name}
                      </h2>
                      <p className="text-sm text-amber-600 font-medium mt-1">
                        Dinner • Serves 4
                      </p>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-gray-700">
                          <strong className="font-semibold">20</strong> min prep
                          • <strong className="font-semibold">15</strong> min
                          cook
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-5 h-5 text-orange-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3 10a7 7 0 1114 0 7 7 0 01-14 0z" />
                          <path
                            fillRule="evenodd"
                            d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 font-medium">
                          300 cal/serving
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tags.length > 0 &&
                        tags.map((tag, index) => (
                          <span
                            className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm"
                            key={index}
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                    <div className="pt-4 flex gap-3">
                      <button
                        onClick={handleRecipeSaving.bind(null, recipe)}
                        className={`flex-1 border  border-gray-300 hover:border-gray-400 ${
                          isRecipeSaved(recipe)
                            ? "text-gray-700"
                            : "bg-amber-500 text-white"
                        } font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2`}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m.564 2.684a2.997 2.997 0 01-.548-1.684A2.997 2.997 0 0112 9c1.105 0 2.046.598 2.548 1.474M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3v6m-3-3h6"
                          />
                        </svg>
                        {isRecipeSaved(recipe) ? "Remove Recipe" : "Add Recipe"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : data && data.length > 0 ? (
          data.map((recipe: Recipe) => {
            const { id, name, difficulty, image, rating, tags } = recipe;
            return (
              <div className="max-w-2xl mx-auto p-6 w-full" key={id}>
                <div className="bg-white rounded-2xl h-full w-full shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <div className="relative h-64 md:h-80">
                    <img
                      src={image}
                      alt={`${name}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-md">
                      <svg
                        className="w-4 h-4 text-yellow-500 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-800">
                        {rating}
                      </span>
                      <span className="text-xs text-gray-500">(3)</span>
                    </div>

                    <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                      <span
                        className={` ${
                          difficulty === "Easy"
                            ? "bg-green-500/90 text-white"
                            : difficulty === "Medium"
                            ? "bg-indigo-200 text-gray-700"
                            : "bg-red-500/90 text-white"
                        }  text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm`}
                      >
                        {difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-5">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {name}
                      </h2>
                      <p className="text-sm text-amber-600 font-medium mt-1">
                        Dinner • Serves 4
                      </p>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-gray-700">
                          <strong className="font-semibold">20</strong> min prep
                          • <strong className="font-semibold">15</strong> min
                          cook
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-5 h-5 text-orange-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3 10a7 7 0 1114 0 7 7 0 01-14 0z" />
                          <path
                            fillRule="evenodd"
                            d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 font-medium">
                          300 cal/serving
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tags.length > 0 &&
                        tags.map((tag, index) => (
                          <span
                            className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm"
                            key={index}
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                    <div className="pt-4 flex gap-3">
                      <button
                        onClick={handleRecipeSaving.bind(null, recipe)}
                        className={`flex-1 border  border-gray-300 hover:border-gray-400 ${
                          isRecipeSaved(recipe)
                            ? "text-gray-700"
                            : "bg-amber-500 text-white"
                        } font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2`}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m.564 2.684a2.997 2.997 0 01-.548-1.684A2.997 2.997 0 0112 9c1.105 0 2.046.598 2.548 1.474M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3v6m-3-3h6"
                          />
                        </svg>
                        {isRecipeSaved(recipe) ? "Remove Recipe" : "Add Recipe"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : isError ? (
          <h1
            className={`font-semibold sm:text-left text-center sm:pl-6 mt-20 ${
              theme === "light" ? "text-black" : "text-white"
            } text-3xl`}
          >
            Something went wrong :(
          </h1>
        ) : isLoading ? (
          <h1
            className={`font-semibold  sm:text-left text-center sm:pl-6 mt-20 ${
              theme === "light" ? "text-black" : "text-white"
            } text-3xl`}
          >
            Loading Recipes...
          </h1>
        ) : !searchText ? (
          <h1
            className={`font-semibold sm:text-left text-center sm:pl-6 mt-20 ${
              theme === "light" ? "text-black" : "text-white"
            } text-3xl`}
          >
            No Search Results for "{searchText}" :(
          </h1>
        ) : null}
      </section>
    </Layout>
  );
}

export default App;
