import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { setupSwagger } from './docs/swagger';
import missionRoutes from './routes/missionRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

//swagger
setupSwagger(app);

//headers HTTP sécurisés
app.use(helmet());

//autorise les requêtes cors
app.use(cors());

//logger HTTP pour les requêtes
app.use(morgan('dev'));

//parser json
app.use(express.json());

//routes
app.use('/', missionRoutes);

// middleware 404 not found
app.use((req, res, next) => {
  const error = new Error(`Route non trouvée: ${req.method} ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// middleware global de gestion des erreurs
app.use(errorHandler);

export default app;