import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync = (hfn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await hfn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
