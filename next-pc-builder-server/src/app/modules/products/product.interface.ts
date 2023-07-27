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
  keyFeatures: {
    brand: string;
    model: string;
    specification: string;
    port: string;
    type: string;
    resolution: string;
    voltage: string;
    // Add more key features as needed
  };
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
