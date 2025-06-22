import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
/**
 * @description
 * this middleware checks for the presence of a JWT in the Authorization header,
 *  validates it, and attaches the decoded user information to the request object.
 * If the token is missing or invalid, it responds with an appropriate error message.
 */
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, config.jwtSecret) as { apiKey: string; iat: number; exp: number };
    (req as any).user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide' });
  }
};

export default authenticateJWT;