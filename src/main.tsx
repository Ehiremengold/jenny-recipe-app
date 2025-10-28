import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import GlobalThemeState from "./context/ThemeContext.tsx";
import Home from "./Home.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthGlobalState from "./context/AuthContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthGlobalState>
        <GlobalThemeState>
          <Home />
        </GlobalThemeState>
      </AuthGlobalState>
    </QueryClientProvider>
  </StrictMode>
);
