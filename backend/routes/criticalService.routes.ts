import { Router } from 'express';
import {
  getAllCriticalServices,
  getCriticalServiceById,
  createCriticalService,
  updateCriticalService,
  deleteCriticalService
} from '../controllers/criticalService.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     CriticalService:
 *       type: object
 *       required:
 *         - name
 *         - ip
 *         - department
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID auto-generado del servicio crítico.
 *         name:
 *           type: string
 *           description: El nombre del servicio crítico.
 *         ip:
 *           type: string
 *           description: La dirección IP del servicio.
 *         status:
 *           type: string
 *           description: El estado actual del servicio.
 *           enum: [up, down]
 *         lastCheck:
 *           type: string
 *           description: La hora de la última verificación (HH:MM).
 *         department:
 *           type: string
 *           description: El departamento responsable del servicio.
 *       example:
 *         id: 1
 *         name: "Servidor Principal"
 *         ip: "192.168.1.100"
 *         status: "up"
 *         lastCheck: "14:30"
 *         department: "Infraestructura"
 *
 * tags:
 *   name: CriticalServices
 *   description: API para la gestión de servicios críticos
 */

const router = Router();

/**
 * @swagger
 * /api/critical-services:
 *   get:
 *     summary: Obtiene una lista de todos los servicios críticos
 *     tags: [CriticalServices]
 *     responses:
 *       200:
 *         description: Una lista de servicios críticos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CriticalService'
 */
router.get('/', getAllCriticalServices);

/**
 * @swagger
 * /api/critical-services/{id}:
 *   get:
 *     summary: Obtiene un servicio crítico por su id
 *     tags: [CriticalServices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id del servicio crítico
 *     responses:
 *       200:
 *         description: El servicio crítico encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CriticalService'
 *       404:
 *         description: El servicio crítico no fue encontrado
 */
router.get('/:id', getCriticalServiceById);

/**
 * @swagger
 * /api/critical-services:
 *   post:
 *     summary: Crea un nuevo servicio crítico
 *     tags: [CriticalServices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ip:
 *                 type: string
 *               department:
 *                 type: string
 *     responses:
 *       201:
 *         description: El servicio crítico fue creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CriticalService'
 *       500:
 *         description: Error en el servidor
 */
router.post('/', createCriticalService);

/**
 * @swagger
 * /api/critical-services/{id}:
 *   put:
 *     summary: Actualiza un servicio crítico por su id
 *     tags: [CriticalServices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id del servicio crítico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CriticalService'
 *     responses:
 *       200:
 *         description: El servicio crítico fue actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CriticalService'
 *       404:
 *         description: El servicio crítico no fue encontrado
 *       500:
 *         description: Ocurrió un error
 */
router.put('/:id', updateCriticalService);

/**
 * @swagger
 * /api/critical-services/{id}:
 *   delete:
 *     summary: Elimina un servicio crítico por su id
 *     tags: [CriticalServices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id del servicio crítico
 *     responses:
 *       204:
 *         description: El servicio crítico fue eliminado
 *       404:
 *         description: El servicio crítico no fue encontrado
 */
router.delete('/:id', deleteCriticalService);

export default router;