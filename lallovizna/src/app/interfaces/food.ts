import { Category } from "./category";

export interface Food {
  _id?: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  available: boolean;
  category: Category;
  editing?: boolean;
}