import { Request, Response } from 'express';
import CriticalService, { CriticalServiceAttributes } from '../models/criticalService.model';

const getCurrentTime = () => new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

/**
 * Obtiene todos los servicios críticos.
 */
export const getAllCriticalServices = async (req: Request, res: Response) => {
  try {
    const services = await CriticalService.findAll({
      order: [['name', 'ASC']]
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los servicios críticos', error });
  }
};

/**
 * Obtiene un servicio crítico por su ID.
 */
export const getCriticalServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await CriticalService.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: `No se encontró el servicio crítico con id ${id}` });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el servicio crítico', error });
  }
};

/**
 * Crea un nuevo servicio crítico.
 */
export const createCriticalService = async (req: Request, res: Response) => {
  try {
    const { name, ip, department } = req.body;
    const newService = await CriticalService.create({
      name,
      ip,
      department,
      status: 'up',
      lastCheck: getCurrentTime()
    });
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el servicio crítico', error });
  }
};

/**
 * Actualiza un servicio crítico existente.
 */
export const updateCriticalService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body: Partial<CriticalServiceAttributes> = req.body;

    const service = await CriticalService.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: `No se encontró el servicio crítico con id ${id}` });
    }

    // Si el estado cambia, actualizamos la hora del chequeo.
    if (body.status && body.status !== service.status) {
      body.lastCheck = getCurrentTime();
    }

    await service.update(body);
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el servicio crítico', error });
  }
};

/**
 * Elimina un servicio crítico.
 */
export const deleteCriticalService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await CriticalService.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: `No se encontró el servicio crítico con id ${id}` });
    }

    await service.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el servicio crítico', error });
  }
};