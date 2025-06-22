import dotenv from 'dotenv';

dotenv.config();
// this allows us to use process.env variables throughout the application
export const config = {
  apiKey: process.env.API_KEY || '',
  secret: process.env.API_SECRET || '',
  gdsBaseUrl: process.env.GDS_BASE_URL || 'https://api.waynium.com/gdsv3',
  jwtSecret: process.env.JWT_SECRET || '',
  baseUrl: process.env.BASE_URL || 'http://0.0.0.0:3000',
};