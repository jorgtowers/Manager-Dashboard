import { Request, Response } from 'express';
import Client, { ClientAttributes } from '../models/client.model';

/**
 * Obtiene todos los clientes.
 */
export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.findAll({
      order: [['date', 'DESC']]
    });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los clientes', error });
  }
};

/**
 * Obtiene un cliente por su ID.
 */
export const getClientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: `No se encontró el cliente con id ${id}` });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el cliente', error });
  }
};

/**
 * Crea un nuevo cliente.
 */
export const createClient = async (req: Request, res: Response) => {
  try {
    const body: ClientAttributes = req.body;
    const newClient = await Client.create(body);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el cliente', error });
  }
};

/**
 * Actualiza un cliente existente.
 */
export const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body: ClientAttributes = req.body;

    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: `No se encontró el cliente con id ${id}` });
    }

    await client.update(body);
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el cliente', error });
  }
};

/**
 * Elimina un cliente.
 */
export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: `No se encontró el cliente con id ${id}` });
    }

    await client.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el cliente', error });
  }
};