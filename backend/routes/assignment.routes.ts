import { Router } from 'express';
import {
  getAllAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment
} from '../controllers/assignment.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     Assignment:
 *       type: object
 *       required:
 *         - title
 *         - employee
 *         - department
 *         - dueDate
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID auto-generado de la asignación.
 *         title:
 *           type: string
 *           description: El título de la asignación.
 *         employee:
 *           type: string
 *           description: El empleado asignado.
 *         department:
 *           type: string
 *           description: El departamento del empleado.
 *         status:
 *           type: string
 *           description: El estado de la asignación.
 *           enum: [pendiente, en_progreso, completado]
 *         priority:
 *           type: string
 *           description: La prioridad de la asignación.
 *           enum: [alta, media, baja]
 *         description:
 *           type: string
 *           description: Una descripción de la asignación.
 *         dueDate:
 *           type: string
 *           format: date
 *           description: La fecha límite de la asignación (YYYY-MM-DD).
 *       example:
 *         id: 1
 *         title: "Desarrollo de módulo de usuarios"
 *         employee: "Juan Pérez"
 *         department: "Desarrollo"
 *         status: "en_progreso"
 *         priority: "alta"
 *         description: "Implementar CRUD de usuarios"
 *         dueDate: "2024-05-26"
 *
 * tags:
 *   name: Assignments
 *   description: API para la gestión de asignaciones
 */

const router = Router();

/**
 * @swagger
 * /api/assignments:
 *   get:
 *     summary: Obtiene una lista de todas las asignaciones
 *     tags: [Assignments]
 *     responses:
 *       200:
 *         description: Una lista de asignaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assignment'
 */
router.get('/', getAllAssignments);

/**
 * @swagger
 * /api/assignments/{id}:
 *   get:
 *     summary: Obtiene una asignación por su id
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id de la asignación
 *     responses:
 *       200:
 *         description: La asignación encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       404:
 *         description: La asignación no fue encontrada
 */
router.get('/:id', getAssignmentById);

/**
 * @swagger
 * /api/assignments:
 *   post:
 *     summary: Crea una nueva asignación
 *     tags: [Assignments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Assignment'
 *     responses:
 *       201:
 *         description: La asignación fue creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       500:
 *         description: Error en el servidor
 */
router.post('/', createAssignment);

/**
 * @swagger
 * /api/assignments/{id}:
 *   put:
 *     summary: Actualiza una asignación por su id
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id de la asignación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Assignment'
 *     responses:
 *       200:
 *         description: La asignación fue actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       404:
 *         description: La asignación no fue encontrada
 *       500:
 *         description: Ocurrió un error
 */
router.put('/:id', updateAssignment);

/**
 * @swagger
 * /api/assignments/{id}:
 *   delete:
 *     summary: Elimina una asignación por su id
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id de la asignación
 *     responses:
 *       204:
 *         description: La asignación fue eliminada
 *       404:
 *         description: La asignación no fue encontrada
 */
router.delete('/:id', deleteAssignment);

export default router;