import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (car) => {
    if (compareList.length >= 4) {
      toast.error('You can compare up to 4 cars at once.');
      return;
    }
    if (compareList.find((c) => c.id === car.id)) {
      toast('Already in compare list.');
      return;
    }
    setCompareList((prev) => [...prev, car]);
    toast.success(`${car.make} ${car.model} added to compare.`);
  };

  const removeFromCompare = (id) => {
    setCompareList((prev) => prev.filter((c) => c.id !== id));
  };

  const clearCompare = () => setCompareList([]);

  const isInCompare = (id) => compareList.some((c) => c.id === id);

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
};
