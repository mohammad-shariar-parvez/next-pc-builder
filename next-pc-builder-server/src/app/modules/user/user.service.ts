/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Types } from 'mongoose';
import { IUser } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interface/error';

import { JwtPayload } from 'jsonwebtoken';
import config from '../../../config';
import { Product } from '../products/product.model';

const createMyProfile = async (
  tokenUser: JwtPayload | null
): Promise<IUser | null> => {
  const result = await User.findById(tokenUser?.id)
    .select('phoneNumber name address')
    .exec();

  return result;
};

const createUser = async (user: IUser): Promise<IUser | null> => {
  let newUserData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'User Already Exists with this phone number'
    );
  }
  if (newUserData) {
    newUserData = await User.findOne({ _id: newUserData._id });
  }

  return newUserData;
};

const getAllUsers = async (): Promise<IGenericResponse<IUser[]>> => {
  const result = await User.find().sort();
  const total = await User.countDocuments();
  return {
    meta: {
      page: 1,
      // limit: 2,
      total,
    },
    data: result,
  };
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const { name, ...userData } = payload;
  const updatedStudentData: Partial<IUser> = { ...userData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await User.findByIdAndUpdate(id, updatedStudentData, {
    new: true, // return new document of the DB
  });
  return result;
};
const updateMyProfile = async (
  tokenUser: JwtPayload | null,
  payload: Partial<IUser>
): Promise<Partial<IUser> | null> => {
  const objectId: Types.ObjectId = new Types.ObjectId(tokenUser?.id);
  const isExist = await User.findById(objectId);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }
  const { name, password, ...userData } = payload;
  const updatedStudentData: Partial<IUser> = { ...userData };

  // Take out Nested name properties
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  //Hash password
  if (password) {
    const hashedPass: string = await bcrypt.hash(
      password,
      Number(config.bycrypt_salt_rounds)
    );
    updatedStudentData.password = hashedPass;
  }

  const result = await User.findByIdAndUpdate(objectId, updatedStudentData, {
    new: true, // return new document of the DB
  })
    .select('phoneNumber name address')

    .exec();
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  let deleteUser = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const isExist = await User.findById(id);
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
    }

    const deletedProduct = await Product.deleteMany(
      { seller: id },
      { session }
    );
    if (!deletedProduct) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete Products');
    }

    deleteUser = await User.findByIdAndDelete(id, { session });
    if (!deleteUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return deleteUser;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createMyProfile,
  updateMyProfile,
};
