import express from 'express';
import { ProductController } from './product.controllers';
import { ProductValidation } from './product.validation';
import { requestValidation } from '../../middleware/validationRequest';

const router = express.Router();

router.post(
  '/add-product',
  requestValidation.validateRequest(ProductValidation.addProductZodSchema),
  ProductController.addProducts
);

router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getSingleProduct);

export const ProductRoutes = router;
