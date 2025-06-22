import axios from 'axios';
import { config } from '../config/env';

/**
 * @description
 * Retrieves missions based on the provided date range.
 * If no date range is provided, it retrieves all missions.
 * 
 * @param minDate - The minimum date for filtering missions (optional).
 * @param maxDate - The maximum date for filtering missions (optional).
 * 
 * @returns A JSON response containing the list of missions.
 */
export const getMissions = async (minDate?: string, maxDate?: string) => {
   let queryParams = '';

if( minDate || maxDate) {
    queryParams = '?';
  if (minDate && !maxDate) {
    queryParams += `MIS_DATE_DEBUT#MIN=${minDate}`;
  } else if (!minDate && maxDate) {
    queryParams += `MIS_DATE_DEBUT#MAX=${maxDate}`;   
  }else {
    queryParams += `MIS_DATE_DEBUT#MIN=${minDate}&MIS_DATE_DEBUT#MAX=${maxDate}`; 
  }
}
  const res = await axios.post(config.gdsBaseUrl + `/get-ressource` + queryParams, {
    limo: 'dev',
    authentication: {
      apiKey: process.env.API_KEY,
      apiSecret: process.env.API_SECRET
    }
  });
  return res.data;
};
/**
 * @description
 * create new mission based on the provided payload.
 * @param payload - The payload should match the schema defined in missionCreateSchema.
 * The payload should include the following fields:
 * @returns 
 * A JSON response containing the created mission data.
 * 
 */
export const createMission = async (payload: any) => {
  const res = await axios.post(config.gdsBaseUrl + '/set-ressource-v2', {
    limo: 'dev',
    authentication: {
      apiKey: process.env.API_KEY,
      apiSecret: process.env.API_SECRET
    },
    params: payload
  });
  return res.data;
};