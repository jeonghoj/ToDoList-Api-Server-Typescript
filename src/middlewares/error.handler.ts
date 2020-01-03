import { Request, Response, NextFunction } from 'express';

export default function errorHandler(err, req: Request, res: Response, next: NextFunction) :void {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
}
