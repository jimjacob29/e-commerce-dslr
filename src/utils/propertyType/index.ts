export interface MainContextType {
  sortValue: string;
  setSortValue: (val:string) => void;
  selectedBrands: string[];
  setSelectedBrands: (val:string[]) => void;
  selectedCategory: string[];
  setSelectedCategory: (val:string[]) => void;
}
export interface ProductType {
  id: number;
  product_title: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  mrp: number;
  discounts: number;
  ratings: number;
  ratings_count: number;
  images: string[];
}