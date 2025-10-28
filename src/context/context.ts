import { createContext } from "react";
import type { AuthContextType } from "../utils";

export const ThemeContext = createContext({
  theme: "",
  setTheme: (theme: string) => {},
});

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: (username: string) => {},
  logout: () => {},
});
