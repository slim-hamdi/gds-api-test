import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../../src/middlewares/errorHandler';
import logger from '../../src/utils/logger';

jest.mock('../../src/utils/logger', () => ({
  error: jest.fn(),
}));

describe('errorHandler middleware', () => {
  const mockRes = () => {
    const res = {} as Response;
    res.statusCode = 200;
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res;
  };

  it('should return 500 by default and log the error', () => {
    const err = new Error('Something failed');
    const req = {} as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    errorHandler(err, req, res, next);

    expect(logger.error).toHaveBeenCalledWith('Erreur: Error: Something failed');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: {
        code: 500,
        message: 'Something failed'
      }
    });
  });

  it('should return the current res.statusCode if it is not 200', () => {
    const err = new Error('Not Found');
    const req = {} as Request;
    const res = mockRes();
    res.statusCode = 404;

    errorHandler(err, req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: {
        code: 404,
        message: 'Not Found'
      }
    });
  });
});
