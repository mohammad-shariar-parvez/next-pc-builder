import { Request, RequestHandler, Response } from 'express';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import httpStatus from 'http-status';
import config from '../../../config';
import { AuthSevice } from './auth.service';
import { IRefreshTokenResponse } from './auth.interface';
// import { IRefreshTokenResponse } from '../../../interface/common';

const signupUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...user } = req.body;
    console.log('USER ID', user);
    const result = await AuthSevice.signupUser(user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User signed in successfully!',
      data: result,
    });
  }
);

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    console.log('LOGIN DATA', loginData);
    console.log('COOKIE ID', req.cookies);

    const result = await AuthSevice.loginUser(loginData);
    const { refreshToken, ...others } = result;

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully !',
      data: others,
    });
  }
);

const refreshToken: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await AuthSevice.refreshToken(refreshToken);

    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: 200,
      success: true,
      message: 'New access token generated successfully !',
      data: result,
    });
  }
);

export const AuthController = { signupUser, loginUser, refreshToken };
