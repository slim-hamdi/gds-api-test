import { Request, Response, NextFunction } from 'express';
import { validateCreateBody, validateGetQuery } from '../../src/middlewares/missionApisValidater';
import { missionCreateSchema, missionQuerySchema } from '../../src/schemas/missionSchema';

describe('Zod validation middlewares (real schemas)', () => {
  const mockRes = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res;
  };

  const mockNext: NextFunction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateCreateBody', () => {
    it('should call next() with valid mission body', () => {
      const req = {
        body: {
          MIS_TSE_ID: 'type1',
          MIS_TVE_ID: 'veh1',
          MIS_DATE_DEBUT: '2025-06-22',
          MIS_HEURE_DEBUT: '08:00',
          MIS_HEURE_FIN: '10:00',
        }
      } as Request;

      const res = mockRes();

      validateCreateBody(missionCreateSchema)(req, res, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should return 400 for invalid date format', () => {
      const req = {
        body: {
          MIS_TSE_ID: 'type1',
          MIS_TVE_ID: 'veh1',
          MIS_DATE_DEBUT: '22-06-2025',
          MIS_HEURE_DEBUT: '08:00',
          MIS_HEURE_FIN: '10:00',
        }
      } as Request;

      const res = mockRes();

      validateCreateBody(missionCreateSchema)(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: expect.any(Array),
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('validateGetQuery', () => {
    it('should call next() with valid query params', () => {
      const req = {
        query: {
          minDate: '2025-06-01',
          maxDate: '2025-06-30',
        }
      }as unknown as Request;

      const res = mockRes();

      validateGetQuery(missionQuerySchema)(req, res, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect((req as any).validatedQuery).toEqual({
        minDate: '2025-06-01',
        maxDate: '2025-06-30',
      });
    });

    it('should return 400 with invalid query date format', () => {
      const req = {
        query: {
          minDate: '06-01-2025',
        }
      } as unknown as Request;

      const res = mockRes();

      validateGetQuery(missionQuerySchema)(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: expect.any(Object),
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
