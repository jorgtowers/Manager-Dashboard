import { Router } from 'express';
import { getAllMeetings, createMeeting, updateMeeting, deleteMeeting } from '../controllers/meeting.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     Meeting:
 *       type: object
 *       required:
 *         - title
 *         - date
 *         - time
 *         - duration
 *         - participants
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID auto-generado de la reunión.
 *         title:
 *           type: string
 *           description: El título de la reunión.
 *         date:
 *           type: string
 *           format: date
 *           description: La fecha de la reunión (YYYY-MM-DD).
 *         time:
 *           type: string
 *           description: La hora de la reunión (HH:MM).
 *         duration:
 *           type: integer
 *           description: La duración de la reunión en minutos.
 *         participants:
 *           type: string
 *           description: Los participantes de la reunión.
 *         description:
 *           type: string
 *           description: Una descripción de la reunión.
 *       example:
 *         id: 1
 *         title: "Reunión de Kick-off"
 *         date: "2024-05-21"
 *         time: "10:00"
 *         duration: 60
 *         participants: "Equipo de Desarrollo, PM"
 *         description: "Reunión inicial para el nuevo proyecto."
 *
 * tags:
 *   name: Meetings
 *   description: API para la gestión de reuniones
 */

// Creamos una nueva instancia del router de Express
const router = Router();

/**
 * @swagger
 * /api/meetings:
 *   get:
 *     summary: Obtiene una lista de todas las reuniones
 *     tags: [Meetings]
 *     responses:
 *       200:
 *         description: Una lista de reuniones.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meeting'
 */
router.get('/', getAllMeetings);

/**
 * @swagger
 * /api/meetings:
 *   post:
 *     summary: Crea una nueva reunión
 *     tags: [Meetings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meeting'
 *     responses:
 *       201:
 *         description: La reunión fue creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 *       500:
 *         description: Error en el servidor
 */
router.post('/', createMeeting);

/**
 * @swagger
 * /api/meetings/{id}:
 *   put:
 *     summary: Actualiza una reunión por su id
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id de la reunión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meeting'
 *     responses:
 *       200:
 *         description: La reunión fue actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 *       404:
 *         description: La reunión no fue encontrada
 *       500:
 *         description: Ocurrió un error
 */
router.put('/:id', updateMeeting);

/**
 * @swagger
 * /api/meetings/{id}:
 *   delete:
 *     summary: Elimina una reunión por su id
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id de la reunión
 *
 *     responses:
 *       204:
 *         description: La reunión fue eliminada
 *       404:
 *         description: La reunión no fue encontrada
 */
router.delete('/:id', deleteMeeting);

// Exportamos el router para usarlo en la aplicación principal
export default router;