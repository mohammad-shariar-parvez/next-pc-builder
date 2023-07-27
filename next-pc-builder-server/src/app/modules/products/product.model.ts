import { Schema, model } from 'mongoose';
import { IProduct, ProductModel } from './product.interface';

enum ProductStatus {
  InStock = 'In Stock',
  OutOfStock = 'Out of stock',
}

const productSchema = new Schema<IProduct, ProductModel>(
  {
    image: { type: String, required: true },
    productName: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(ProductStatus),
      required: true,
    },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    keyFeatures: {
      brand: { type: String, required: true },
      model: { type: String, required: true },
      specification: { type: String, required: true },
      port: { type: String, required: true },
      type: { type: String, required: true },
      resolution: { type: String, required: true },
      voltage: { type: String, required: true },
      // Add more key features as needed
    },
    individualRating: { type: Number, required: true },
    averageRating: { type: Number, required: true },
    reviews: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Product = model<IProduct, ProductModel>('product', productSchema);
