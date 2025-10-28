# 🍳 Jenny's Recipe App

A **React-based recipe browser** built to practice and explore React **Hooks**, **Context API**, and **custom hooks** — while using real-world concepts like API fetching, state management, and persistent storage.

![App Screenshot](./src/assets/screen.png)

---

## 🚀 Overview

Jenny’s Recipe App allows users to:

- Browse recipes fetched from a public API (`https://dummyjson.com/recipes`)
- Search recipes by name  
- Sort recipes alphabetically (ascending or descending)
- Save favorite recipes to **localStorage**
- Toggle between **light** and **dark** themes
- View saved recipes on a separate page
- Simulate login/logout via **AuthContext**

This project serves as a **learning playground for React hooks and state management patterns**.

---

## 🧠 Learning Focus

The app demonstrates the practical use of:

- `useState`, `useEffect`, `useLayoutEffect`
- `useMemo`, `useCallback`, `useContext`
- **Custom hooks** (`useLocalStorage`)
- **Context API** for global state (Theme + Authentication)
- **React Query** (`@tanstack/react-query`) for data fetching & caching
- **React Router v6** for client-side navigation
- **Lucide-react** icons
- **Tailwind CSS** for responsive styling

---

## 🧩 Project Structure

```bash
src/
│
├── component/
│ └── Layout.tsx # Shared layout wrapper
│
├── context/
│ └── context.tsx # ThemeContext and AuthContext
│
├── hooks/
│ └── useLocalStorage.ts # Custom hook for recipe persistence
│
├── App.tsx # Main recipe listing page
├── Saved.tsx # Saved recipes page
├── Home.tsx # Routing entry (App + Saved)
├── utils.ts # Type definitions
└── index.tsx # App bootstrap
```

### Clone the repository

```bash
git clone https://github.com/<your-username>/jenny-recipe-app.git
cd jenny-recipe-app
```

### Install dependencies
```bash
npm install
```

### Run the app locally
```bash
npm run dev
```

## Features in Action

- Light/Dark Mode: Toggles via ThemeContext
- Recipe Search: Filters fetched data in-memory using useMemo
- Persistent Favorites: Uses custom useLocalStorage hook
- Auth Simulation: Simple login/logout toggle
- Routing:
  - / → Browse all recipes
  - /saved → View saved recipes

### What I Learned

- Efficient state updates with React hooks
- Memoization and callback optimization (useMemo, useCallback)
- Managing global theme and auth state via Context
- Persisting data with localStorage
- Handling asynchronous fetching with React Query

