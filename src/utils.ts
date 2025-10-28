export type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  difficulty: string;
  tags: string[];
  image: string;
  rating: number;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
};
