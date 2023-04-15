import React, { useState, createContext } from 'react';
export const MainContext: any = createContext({});
export const MainContextProvider = (props: any) => {
  const [sortValue, setSortValue] = useState('Ratings(high to low)');
  const [selectedBrands, setSelectedBrands] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>([]);

  const value = {
    selectedBrands,
    setSelectedBrands,
    selectedCategory,
    setSelectedCategory,
    sortValue,
    setSortValue
  };
  return <MainContext.Provider value={value}>{props?.children}</MainContext.Provider>;
};
