import { Category } from "../constants/categories";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number | null;
  quantity: number;
  category: Category;
};
