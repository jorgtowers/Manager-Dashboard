import { Request, Response } from 'express';
import Meeting, { MeetingAttributes } from '../models/meeting.model';

/**
 * Obtiene todas las reuniones de la base de datos.
 */
export const getAllMeetings = async (req: Request, res: Response) => {
  try {
    // Usamos el modelo para buscar todos los registros
    const meetings = await Meeting.findAll({
      order: [['date', 'ASC'], ['time', 'ASC']] // Opcional: ordenarlas por fecha y hora
    });
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reuniones', error });
  }
};

/**
 * Crea una nueva reunión en la base de datos.
 */
export const createMeeting = async (req: Request, res: Response) => {
  try {
    const body: MeetingAttributes = req.body;

    // Validación básica para asegurar que los campos requeridos están presentes
    if (!body.title || !body.date || !body.time || !body.duration || !body.participants) {
      return res.status(400).json({ message: 'Faltan campos requeridos: title, date, time, duration, participants' });
    }

    const newMeeting = await Meeting.create(body);
    res.status(201).json(newMeeting);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reunión', error });
  }
};

/**
 * Actualiza una reunión existente en la base de datos.
 */
export const updateMeeting = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body: MeetingAttributes = req.body;

    const meeting = await Meeting.findByPk(id);

    if (!meeting) {
      return res.status(404).json({ message: `No se encontró la reunión con id ${id}` });
    }

    await meeting.update(body);
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la reunión', error });
  }
};

/**
 * Elimina una reunión de la base de datos.
 */
export const deleteMeeting = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findByPk(id);

    if (!meeting) {
      return res.status(404).json({ message: `No se encontró la reunión con id ${id}` });
    }

    await meeting.destroy();
    res.status(204).send(); // .send() porque 204 No Content no debe tener cuerpo
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la reunión', error });
  }
};