import { Request, Response } from 'express';
import Assignment, { AssignmentAttributes } from '../models/assignment.model';

/**
 * Obtiene todas las asignaciones.
 */
export const getAllAssignments = async (req: Request, res: Response) => {
  try {
    const assignments = await Assignment.findAll({
      order: [['dueDate', 'ASC']]
    });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las asignaciones', error });
  }
};

/**
 * Obtiene una asignación por su ID.
 */
export const getAssignmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findByPk(id);
    if (!assignment) {
      return res.status(404).json({ message: `No se encontró la asignación con id ${id}` });
    }
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la asignación', error });
  }
};

/**
 * Crea una nueva asignación.
 */
export const createAssignment = async (req: Request, res: Response) => {
  try {
    const body: AssignmentAttributes = req.body;
    const newAssignment = await Assignment.create(body);
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la asignación', error });
  }
};

/**
 * Actualiza una asignación existente.
 */
export const updateAssignment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body: AssignmentAttributes = req.body;

    const assignment = await Assignment.findByPk(id);
    if (!assignment) {
      return res.status(404).json({ message: `No se encontró la asignación con id ${id}` });
    }

    await assignment.update(body);
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la asignación', error });
  }
};

/**
 * Elimina una asignación.
 */
export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findByPk(id);

    if (!assignment) {
      return res.status(404).json({ message: `No se encontró la asignación con id ${id}` });
    }

    await assignment.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la asignación', error });
  }
};