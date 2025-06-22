import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

// this middleware validates the request body for creating resources using Zod schemas.
export const validateCreateBody =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      return res.status(400).json({ error: error.errors });
    }
  };

// this middleware validates the request body for updating resources using Zod schemas.
export const validateGetQuery =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({ errors: result.error.flatten() });
    }
    (req as any).validatedQuery = result.data;

    next();
  };