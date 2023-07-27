import { IProduct, IProductFilters } from './product.interface';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

import { IGenericResponse } from '../../../interface/error';
import { IPaginationOptions } from '../../../interface/pagination';
import { paginationHelper } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

import { Product } from './product.model';

const createProduct = async (payload: IProduct): Promise<IProduct | null> => {
  const result = await Product.create(payload);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add Product');
  }
  return result;
};

const getAllProducts = async (
  filters: IProductFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IProduct[]>> => {
  const { ...category } = filters;
  console.log('CAAAATEEEGORYYY', category);

  const andConditions = [];

  if (Object.keys(category).length) {
    andConditions.push({
      $and: Object.entries(category).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Product.find(whereConditions).sort(sortCondition);

  const total = await Product.countDocuments(whereConditions);
  return {
    meta: {
      page,
      total,
    },
    data: result,
  };
};

const getSingleProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found!');
  }
  return result;
};

// const updateBook = async (
//   id: string,
//   payload: Partial<IProduct>
// ): Promise<IProduct | null> => {
//   const isExist = await Product.findById(id);

//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Product not found!');
//   }
//   if (payload.reviews) {
//     const result = await Product.findByIdAndUpdate(
//       id,
//       { $push: { reviews: payload.reviews } },
//       { new: true }
//     );
//     return result;
//   } else {
//     const result = await Product.findByIdAndUpdate(id, payload, {
//       new: true, // return new document of the DB
//     });
//     return result;
//   }

//ANOTHER SOLUTION
// const { reviews, ...payload } = req.body;
//  let updateObject: any = {};

//  // Check if 'reviews' field is present in the payload
//  if (reviews) {
//    updateObject.$push = { reviews }; // Use the reviews directly to update the reviews field
//  }

//  // Include other fields in the updateObject
//  if (Object.keys(payload).length > 0) {
//    updateObject = { ...updateObject, ...payload };
//  }

//  const updatedBook = await Product.findByIdAndUpdate(id, updateObject, {
//    new: true,
//  });
// };

// const deleteBook = async (id: string): Promise<IProduct | null> => {
//   const result = await Product.findByIdAndDelete(id);
//   if (!result) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete Product');
//   }

//   return result;
// };

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};
