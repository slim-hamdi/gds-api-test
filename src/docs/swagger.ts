import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GDS API TEST',
      version: '1.0.0',
      description: 'Documentation de l API  GDS TEST',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Mission: {
          type: 'object',
          required: [
            'MIS_TSE_ID',
            'MIS_TVE_ID',
            'MIS_DATE_DEBUT',
            'MIS_HEURE_DEBUT',
            'MIS_HEURE_FIN',
          ],
          properties: {
            MIS_TSE_ID: {
              type: 'string',
              example: 'TSE1',
            },
            MIS_TVE_ID: {
              type: 'string',
              example: 'TVE1',
            },
            MIS_DATE_DEBUT: {
              type: 'string',
              format: 'date',
              example: '2025-06-22',
            },
            MIS_HEURE_DEBUT: {
              type: 'string',
              example: '08:00',
            },
            MIS_HEURE_FIN: {
              type: 'string',
              example: '12:00',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};


const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};