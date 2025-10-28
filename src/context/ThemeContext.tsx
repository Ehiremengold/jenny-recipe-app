import { useState, type ReactNode } from "react";
import { ThemeContext } from "./context";

const GlobalThemeState = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default GlobalThemeState;
