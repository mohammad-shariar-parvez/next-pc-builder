import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import {
  ILogin,
  ILoginResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import mongoose from 'mongoose';

const signupUser = async (user: IUser): Promise<IUser | null> => {
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
      'User Already Exists with this '
    );
  }
  if (newUserData) {
    newUserData = await User.findOne({ _id: newUserData._id });
  }

  return newUserData;
};
// ALTERNATIVE
// const signupUser = async (user: IUser): Promise<IUser | null> => {
//   try {
//     const result = await User.create(user);
//     return result;
//   } catch (error) {
//     if (error) {
//       // Duplicate key error, phoneNumber already exists
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Phone number already exist');
//     }
//     // Handle other errors or rethrow the original error
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Phone number already exist');
//   }
// };

const loginUser = async (payload: ILogin): Promise<ILoginResponse> => {
  const { email: userEmail, password } = payload;

  //  // access to our instance methods
  const isUserExist = await User.isUserExist(userEmail);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { id, email } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { id, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { id, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
    user: isUserExist,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { id } = verifiedToken;

  // case- user deleted but he has refresh token
  // checking deleted user's refresh token

  const isUserExist = await User.isRefreshedUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      email: isUserExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthSevice = {
  signupUser,
  loginUser,
  refreshToken,
};
