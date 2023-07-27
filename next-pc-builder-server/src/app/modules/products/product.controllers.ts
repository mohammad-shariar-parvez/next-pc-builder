import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ProductService } from './product.service';

import pick from '../../../shared/pick';
import { ProductFilterAbleFields } from './product.constants';
import { paginationFields } from '../../constants/pagination';
import { IProduct } from './product.interface';

const addProducts = catchAsync(async (req: Request, res: Response) => {
  const { ...product } = req.body;
  const result = await ProductService.createProduct(product);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product added successfully!',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ProductFilterAbleFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ProductService.getAllProducts(
    filters,
    paginationOptions
  );

  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ProductService.getSingleProduct(id);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully !',
    data: result,
  });
});

// const updateProduct = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   console.log('ID UPDATE', id);

//   const updatedData = req.body;
//   console.log('BODY UPDATE', updatedData);
//   const result = await ProductService.updateProduct(id, updatedData);

//   sendResponse<IProduct>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Product updated successfully !',
//     data: result,
//   });
// });

// const deleteProduct = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await ProductService.deleteProduct(id);

//   sendResponse<IProduct>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Product deleted successfully !',
//     data: result,
//   });
// });

export const ProductController = {
  addProducts,
  getAllProducts,
  getSingleProduct,
};
