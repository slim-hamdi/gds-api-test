import { getMissions, createMission } from '../../src/controllers/missionController';
import * as missionService from '../../src/services/missionService';
import { Request, Response } from 'express';

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe('missionController', () => {
  describe('getMissions', () => {
    it('should return missions with valid date filters', async () => {
      const req = {
        validatedQuery: {
          minDate: '2025-06-01',
          maxDate: '2025-06-30'
        }
      } as any as Request;

      const res = mockResponse();
      const fakeMissions = [{ id: 'MIS_1' }, { id: 'MIS_2' }];
      jest.spyOn(missionService, 'getMissions').mockResolvedValue(fakeMissions);

      await getMissions(req, res);

      expect(missionService.getMissions).toHaveBeenCalledWith('2025-06-01', '2025-06-30');
      expect(res.json).toHaveBeenCalledWith(fakeMissions);
    });

    it('should return all missions when no filters are provided', async () => {
      const req = { validatedQuery: {} } as any as Request;
      const res = mockResponse();
      const allMissions = [{ id: 'MIS_ALL' }];
      jest.spyOn(missionService, 'getMissions').mockResolvedValue(allMissions);

      await getMissions(req, res);

      expect(missionService.getMissions).toHaveBeenCalledWith(undefined, undefined);
      expect(res.json).toHaveBeenCalledWith(allMissions);
    });
  });

  describe('createMission', () => {
    it('should create a mission and return 201', async () => {
      const newMission = { MIS_ID: 'MIS_NEW', status: 'en attente' };
      const req = {
        body: newMission
      } as Request;

      const res = mockResponse();

      jest.spyOn(missionService, 'createMission').mockResolvedValue(newMission);

      await createMission(req, res);

      expect(missionService.createMission).toHaveBeenCalledWith(newMission);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newMission);
    });
  });
});
