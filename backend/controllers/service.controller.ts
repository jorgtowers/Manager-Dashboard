import { Request, Response } from 'express';
import Service, { ServiceAttributes } from '../models/service.model';

/**
 * Obtiene todos los servicios.
 */
export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll({
      order: [['endDate', 'ASC']] // Ordenar por fecha de vencimiento más próxima
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los servicios', error });
  }
};

/**
 * Obtiene un servicio por su ID.
 */
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: `No se encontró el servicio con id ${id}` });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el servicio', error });
  }
};

/**
 * Crea un nuevo servicio.
 */
export const createService = async (req: Request, res: Response) => {
  try {
    const body: ServiceAttributes = req.body;
    const newService = await Service.create(body);
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el servicio', error });
  }
};

/**
 * Actualiza un servicio existente.
 */
export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body: ServiceAttributes = req.body;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: `No se encontró el servicio con id ${id}` });
    }

    await service.update(body);
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el servicio', error });
  }
};

/**
 * Elimina un servicio.
 */
export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: `No se encontró el servicio con id ${id}` });
    }

    await service.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el servicio', error });
  }
};