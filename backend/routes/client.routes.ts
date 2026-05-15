import { Router } from 'express';
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} from '../controllers/client.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - name
 *         - contact
 *         - need
 *         - date
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID auto-generado del cliente.
 *         name:
 *           type: string
 *           description: El nombre del cliente o empresa.
 *         contact:
 *           type: string
 *           description: La persona de contacto.
 *         need:
 *           type: string
 *           description: La necesidad principal del cliente.
 *         status:
 *           type: string
 *           description: El estado de atención del cliente.
 *           enum: [pendiente, en_atencion, atendido]
 *         description:
 *           type: string
 *           description: Una descripción detallada de la necesidad.
 *         priority:
 *           type: string
 *           description: La prioridad de la necesidad del cliente.
 *           enum: [alta, media, baja]
 *         date:
 *           type: string
 *           format: date
 *           description: La fecha de registro de la necesidad (YYYY-MM-DD).
 *       example:
 *         id: 1
 *         name: "Empresa ABC"
 *         contact: "Pedro González"
 *         need: "Implementación de sistema"
 *         status: "en_atencion"
 *         description: "Necesitan un sistema de inventario para su almacén central."
 *         priority: "alta"
 *         date: "2024-05-19"
 *
 * tags:
 *   name: Clients
 *   description: API para la gestión de clientes y sus necesidades
 */

const router = Router();

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Obtiene una lista de todos los clientes
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Una lista de clientes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 */
router.get('/', getAllClients);

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Obtiene un cliente por su id
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id del cliente
 *     responses:
 *       200:
 *         description: El cliente encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: El cliente no fue encontrado
 */
router.get('/:id', getClientById);

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Crea un nuevo registro de cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       201:
 *         description: El cliente fue creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       500:
 *         description: Error en el servidor
 */
router.post('/', createClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Actualiza un cliente por su id
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: El cliente fue actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: El cliente no fue encontrado
 *       500:
 *         description: Ocurrió un error
 */
router.put('/:id', updateClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Elimina un cliente por su id
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id del cliente
 *     responses:
 *       204:
 *         description: El cliente fue eliminado
 *       404:
 *         description: El cliente no fue encontrado
 */
router.delete('/:id', deleteClient);

export default router;