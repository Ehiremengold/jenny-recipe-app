import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import type { Recipe } from "./utils";
import Layout from "./component/Layout";

function Saved() {

  const { recipes, isRecipeSaved, removeRecipe, addRecipe } = useLocalStorage();

  const handleRecipeSaving = (recipe: Recipe) =>
    isRecipeSaved(recipe) ? removeRecipe(recipe) : addRecipe(recipe);

  return (
    <Layout>
      <section className="grid mx-auto xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 sm:w-[80%] w-[95%] mt-10">
        {recipes && recipes.length > 0
          ? recipes.map((recipe: Recipe) => {
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
                            <strong className="font-semibold">20</strong> min
                            prep • <strong className="font-semibold">15</strong>{" "}
                            min cook
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
                          {isRecipeSaved(recipe)
                            ? "Remove Recipe"
                            : "Add Recipe"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </section>
      {recipes.length == 0 && (
        <div className="flex flex-col w-full mx-auto place-content-center place-items-center gap-5 h-[60vh] p-6 text-center">
          <h1 className="font-medium text-2xl">
            Looks like you haven't saved any recipes yet.
          </h1>
          <a href="/">
            <button className="flex-1 border  border-gray-300 hover:border-gray-400  bg-amber-500 text-white font-medium py-2 px-6 rounded-full transition-colors duration-200 flex items-center justify-center gap-2">
              Go home
            </button>
          </a>
        </div>
      )}
    </Layout>
  );
}

export default Saved;
