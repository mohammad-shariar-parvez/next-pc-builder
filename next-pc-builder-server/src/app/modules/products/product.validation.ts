import { z } from 'zod';
enum ProductStatus {
  InStock = 'In Stock',
  OutOfStock = 'Out of stock',
}

const keyFeaturesSchema = z.record(
  z.string({
    required_error: ' Key features is required',
  })
);

const addProductZodSchema = z.object({
  body: z.object({
    image: z.string({
      required_error: 'image is required',
    }),
    productName: z.string({
      required_error: 'productName is required',
    }),
    category: z.string({
      required_error: ' category is required',
    }),
    status: z.enum([ProductStatus.InStock, ProductStatus.OutOfStock], {
      required_error: 'status is required',
    }),

    price: z
      .number({
        required_error: ' Price is required',
      })
      .min(0, { message: 'price must be a non-negative number' }),
    description: z.string({
      required_error: ' description is required',
    }),
    keyFeatures: keyFeaturesSchema,
    individualRating: z
      .number({
        required_error: ' individualRating is required',
      })
      .min(0, { message: ' Indiviual rating must be a non-negative number' }),
    averageRating: z
      .number({
        required_error: ' individualRating is required',
      })
      .min(0, { message: 'Avarage rating must be a non-negative number' }),

    reviews: z.array(z.string(), {
      required_error: ' reviews is required',
    }),
  }),
});

export const ProductValidation = {
  addProductZodSchema,
};
