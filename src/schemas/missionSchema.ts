import { z } from 'zod';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// validates if the date is a valide date in the format YYYY-MM-DD
const validDateSchema = z.string()
  .regex(dateRegex, 'Le format de la date doit être YYYY-MM-DD')
  .refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) && value === date.toISOString().slice(0, 10);
  }, {
    message: 'Date invalide'
  });
// validates the structure of the mission creation request body
export const missionCreateSchema = z.object({
  MIS_TSE_ID: z.string(),
  MIS_TVE_ID: z.string(),
  MIS_DATE_DEBUT: validDateSchema,
  MIS_HEURE_DEBUT: z.string(),
  MIS_HEURE_FIN: z.string()
});
// validates the query parameters for retrieving missions
export const missionQuerySchema = z.object({
  minDate:validDateSchema.optional(),
  maxDate: validDateSchema.optional(),
});
