import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authenticateJWT from '../../src/middlewares/auth';
import { config } from '../../src/config/env';

jest.mock('../../src/config/env', () => ({
  config: {
    jwtSecret: 'test-secret',
  }
}));

describe('authenticateJWT middleware', () => {
  const mockNext = jest.fn();
  const mockRes = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should allow request with valid token', () => {
    const token = jwt.sign({ apiKey: 'test-api-key' }, config.jwtSecret);
    const req = {
      headers: {
        authorization: `Bearer ${token}`
      }
    } as Request;

    const res = mockRes();

    authenticateJWT(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect((req as any).user).toHaveProperty('apiKey', 'test-api-key');
  });

  it('should return 401 if no token is provided', () => {
    const req = { headers: {} } as Request;
    const res = mockRes();

    authenticateJWT(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token manquant' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 403 if token is invalid', () => {
    const req = {
      headers: {
        authorization: 'Bearer invalid.token.value'
      }
    } as Request;
    const res = mockRes();

    authenticateJWT(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token invalide' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 401 if token is not a Bearer token', () => {
    const req = {
      headers: {
        authorization: 'NotBearerToken'
      }
    } as Request;
    const res = mockRes();

    authenticateJWT(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token manquant' });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
