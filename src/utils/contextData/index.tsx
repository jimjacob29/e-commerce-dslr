import { createContext, useState } from 'react';
export const MainContext: any = createContext({});
export const MainContextProvider = (props: any) => {
  const [sortValue, setSortValue] = useState('Ratings(high to low)');
  const [selectedBrands, setSelectedBrands] = useState<string[] | []>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[] | []>([]);

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
