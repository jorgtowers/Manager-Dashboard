import { Router } from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/service.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       required:
 *         - name
 *         - provider
 *         - startDate
 *         - endDate
 *         - cost
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID auto-generado del servicio.
 *         name:
 *           type: string
 *           description: El nombre del servicio.
 *         provider:
 *           type: string
 *           description: El proveedor del servicio.
 *         startDate:
 *           type: string
 *           format: date
 *           description: La fecha de inicio del servicio (YYYY-MM-DD).
 *         endDate:
 *           type: string
 *           format: date
 *           description: La fecha de vencimiento del servicio (YYYY-MM-DD).
 *         cost:
 *           type: number
 *           format: float
 *           description: El costo del servicio.
 *       example:
 *         id: 1
 *         name: "Hosting AWS"
 *         provider: "Amazon Web Services"
 *         startDate: "2023-11-23"
 *         endDate: "2024-06-05"
 *         cost: 250
 *
 * tags:
 *   name: Services
 *   description: API para la gestión de servicios contratados
 */

const router = Router();

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Obtiene una lista de todos los servicios
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Una lista de servicios.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 */
router.get('/', getAllServices);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Obtiene un servicio por su id
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id del servicio
 *     responses:
 *       200:
 *         description: El servicio encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: El servicio no fue encontrado
 */
router.get('/:id', getServiceById);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Crea un nuevo servicio
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       201:
 *         description: El servicio fue creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       500:
 *         description: Error en el servidor
 */
router.post('/', createService);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Actualiza un servicio por su id
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id del servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: El servicio fue actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: El servicio no fue encontrado
 *       500:
 *         description: Ocurrió un error
 */
router.put('/:id', updateService);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Elimina un servicio por su id
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id del servicio
 *     responses:
 *       204:
 *         description: El servicio fue eliminado
 *       404:
 *         description: El servicio no fue encontrado
 */
router.delete('/:id', deleteService);

export default router;