import { createContext, useContext, useState } from 'react';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within RecipeProvider');
  }
  return context;
};

export default RecipeContext;
