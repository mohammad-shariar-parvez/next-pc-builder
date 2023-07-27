import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found !!',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API is not found !!',
      },
    ],
  })
  next()
}

export default notFoundHandler
