import React, { createContext, useState, useEffect } from 'react';

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const initialFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState(initialFavorites);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text); // Update searchText immediately

    // Set debouncedSearchText after a delay (e.g., 300 milliseconds)
    setTimeout(() => {
      setDebouncedSearchText(text);
    },2000);
  };

  // Use debouncedSearchText for API requests
  useEffect(() => {
    const edamamAppId = '26888440';
    const edamamAppKey = 'e8b78a0d52412134c0a3a93d13c5edd7';
    const apiUrl = `https://api.edamam.com/search?q=${debouncedSearchText}&app_id=${edamamAppId}&app_key=${edamamAppKey}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          // throw an Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data.hits);
      })
      .catch((error) => {
        console.error('Error:', error);
        setRecipes([]);
      });
  }, [debouncedSearchText]);

  const addToFavorites = (recipe) => {
    const newFavorites = [...favorites, recipe];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (recipe) => {
    const updatedFavorites = favorites.filter((meal) => meal.id !== recipe.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Use useEffect to update the 'favorites' state when local storage changes
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <RecipeContext.Provider
      value={{ recipes, handleSearch, favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeProvider, RecipeContext };
