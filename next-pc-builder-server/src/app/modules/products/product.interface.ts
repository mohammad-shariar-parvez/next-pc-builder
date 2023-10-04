import { Model } from 'mongoose';

enum ProductStatus {
  InStock = 'In Stock',
  OutOfStock = 'Out of stock',
}

export type IProduct = {
  image: string;
  productName: string;
  category: string;
  status: ProductStatus;
  price: number;
  description: string;
  keyFeatures: Record<string, string>;
  individualRating: number;
  averageRating: number;
  reviews: string[];
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;

export type IProductFilters = {
  searchTerm?: string;
  genre?: string;
  publicationDate?: string;
};

export type ITokenUser = {
  id: string;
  role: string;
  iat: number;
  exp: number;
};
