import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
// This middleware handles errors in the application.
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
 _next: NextFunction
) => {
  logger.error(`Erreur: ${err}`);
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    error: {
      code: statusCode,
      message: err.message,
    }
  });
};