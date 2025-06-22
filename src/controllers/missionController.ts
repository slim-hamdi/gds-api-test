import { Request, Response } from 'express';
import * as missionService from '../services/missionService';

/** * 
 * @description
 * Retrieves missions based on the provided date range.
 * @param req - The request object containing query parameters.
 * @param req.query - The query parameters containing optional minDate and maxDate. 
 * @returns  JSON response containing the list of missions within the specified date range.
 * if no date range is provided, it returns all missions.
 * */
export const getMissions = async (req: Request, res: Response) => {
  const { minDate, maxDate } = (req as any).validatedQuery as {
    minDate?: string;
    maxDate?: string;
  };
  const missions = await missionService.getMissions(minDate || undefined, maxDate || undefined);
  res.json(missions);
};
/**
 * @description
 * this function handles the creation of a new mission.
 * Creates a new mission.
 * @param req.body - The body of the request containing mission details.
 * * @returns A JSON response containing the created mission data.
 * If the creation is successful, it returns a 201 status code with the created mission data
 */
export const createMission = async (req: Request, res: Response) => {
  const created = await missionService.createMission(req.body);
  res.status(201).json(created);
};