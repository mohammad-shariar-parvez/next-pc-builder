import { z } from 'zod';
enum ProductStatus {
  InStock = 'In Stock',
  OutOfStock = 'Out of stock',
}

const keyFeaturesSchema = z.object({
  brand: z.string({
    required_error: 'brand is required',
  }),
  model: z.string({
    required_error: 'model is required',
  }),
  specification: z.string({
    required_error: 'ispecification is required',
  }),
  port: z.string({
    required_error: ' port is required',
  }),
  type: z.string({
    required_error: 'type is required',
  }),
  resolution: z.string({
    required_error: 'resolution is required',
  }),
  voltage: z.string({
    required_error: 'voltage is required',
  }),
});

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
      .min(0, { message: ' Individual rating must be a non-negative number' }),
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

// const productSchema = z
//   .object({
//     image: z.string().nonempty(),
//     productName: z.string().nonempty(),
//     category: z.string().nonempty(),
//     status: z
//       .enum([ProductStatus.InStock, ProductStatus.OutOfStock])
//       .optional(), // Optional because enum provides a default validation for this field
//     price: z.number().min(0),
//     description: z.string().nonempty(),
//     keyFeatures: keyFeaturesSchema,
//     individualRating: z.number().min(0),
//     averageRating: z.number().min(0),
//     reviews: z.array(z.string()),
//     publicationDate: z.string().nonempty(),
//   })
//   .refine(
//     val => Object.keys(val).length === Object.keys(productSchema.shape).length,
//     {
//       message: 'All fields are required',
//       path: [],
//     }
//   );

export const ProductValidation = {
  addProductZodSchema,
};
