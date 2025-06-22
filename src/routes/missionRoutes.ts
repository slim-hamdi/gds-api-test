import express from 'express';
import { getMissions, createMission } from '../controllers/missionController';
import  authenticateJWT  from '../middlewares/auth';
import {validateGetQuery, validateCreateBody}  from '../middlewares/missionApisValidater';
import { missionCreateSchema, missionQuerySchema } from '../schemas/missionSchema';

const router = express.Router();
// GET /missions - retrieve missions based on date range
/**
 * @swagger
 * /missions:
 *   get:
 *     summary: Récupère les missions (filtrables par date)
 *     tags:
 *       - Missions
 *     parameters:
 *       - in: query
 *         name: minDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Date de début minimale (YYYY-MM-DD)
 *       - in: query
 *         name: maxDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Date de début maximale (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Liste des missions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mission'
 */

router.get('/missions', authenticateJWT,validateGetQuery(missionQuerySchema), getMissions);
// POST /mission - create a new mission
/**
 * @swagger
 * /mission:
 *   post:
 *     summary: Crée une nouvelle mission
 *     tags:
 *       - Missions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mission'
 *     responses:
 *       201:
 *         description: Mission créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mission'
 */
router.post('/mission', authenticateJWT, validateCreateBody(missionCreateSchema), createMission);

export default router;
