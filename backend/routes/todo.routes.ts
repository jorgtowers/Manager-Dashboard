import { Router } from 'express';
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todo.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - priority
 *         - dueDate
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID auto-generado de la tarea.
 *         title:
 *           type: string
 *           description: El título de la tarea.
 *         priority:
 *           type: string
 *           description: La prioridad de la tarea.
 *           enum: [alta, media, baja]
 *         dueDate:
 *           type: string
 *           format: date
 *           description: La fecha límite de la tarea (YYYY-MM-DD).
 *         completed:
 *           type: boolean
 *           description: Indica si la tarea está completada.
 *       example:
 *         id: 1
 *         title: "Revisar presupuesto mensual"
 *         priority: "alta"
 *         dueDate: "2024-05-21"
 *         completed: false
 *
 * tags:
 *   name: Todos
 *   description: API para la gestión de tareas (To-dos)
 */

const router = Router();

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Obtiene una lista de todas las tareas
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Una lista de tareas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get('/', getAllTodos);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Obtiene una tarea por su id
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id de la tarea
 *     responses:
 *       200:
 *         description: La tarea encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: La tarea no fue encontrada
 */
router.get('/:id', getTodoById);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: La tarea fue creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Error en el servidor
 */
router.post('/', createTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Actualiza una tarea por su id
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: La tarea fue actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: La tarea no fue encontrada
 *       500:
 *         description: Ocurrió un error
 */
router.put('/:id', updateTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Elimina una tarea por su id
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id de la tarea
 *     responses:
 *       204:
 *         description: La tarea fue eliminada
 *       404:
 *         description: La tarea no fue encontrada
 */
router.delete('/:id', deleteTodo);

export default router;