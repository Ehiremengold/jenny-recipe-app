import { useContext, type ReactNode } from "react";
import { AuthContext, ThemeContext } from "../context/context";
import { Link } from "react-router-dom";
import { DoorClosed, Heart, Moon, Sun, User } from "lucide-react";
import useLocalStorage from "../hooks/useLocalStorage";

const Layout = ({ children }: { children: ReactNode }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { recipes } = useLocalStorage();
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  return (
    <main
      className={` pt-10 ${
        theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
      } min-h-screen`}
    >
      <section className="flex mx-auto sm:w-[80%] w-[95%] items-center p-6 justify-between px-6 py-2">
        <a href="/">
          <h1 className="md:text-4xl text-2xl italic">Jenny's Recipe</h1>
        </a>
        <div className="flex gap-6">
          {theme === "dark" ? (
            <button onClick={() => setTheme("light")}>
              <Sun />
            </button>
          ) : (
            <button onClick={() => setTheme("dark")}>
              <Moon />
            </button>
          )}
          <Link to="/saved">
            <div className="relative">
              <Heart />
              <span className="bg-amber-500 text-gray-700 font-semibold absolute rounded-full grid place-content-center h-5 w-5 -top-2 -right-3">
                {recipes.length}
              </span>
            </div>
          </Link>
          {isAuthenticated ? (
            <button onClick={logout}>
              <User />
            </button>
          ) : (
            <button onClick={() => login("ehis")}>
              <DoorClosed />
            </button>
          )}
        </div>
      </section>
      {children}
    </main>
  );
};

export default Layout;
