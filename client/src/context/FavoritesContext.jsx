import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('autocompare_favorites') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('autocompare_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (car) => {
    if (favorites.find((c) => c.id === car.id)) {
      toast('Already in your garage.');
      return;
    }
    setFavorites((prev) => [...prev, car]);
    toast.success(`${car.make} ${car.model} saved to My Garage!`);
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((c) => c.id !== id));
    toast('Removed from My Garage.');
  };

  const isFavorite = (id) => favorites.some((c) => c.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};
