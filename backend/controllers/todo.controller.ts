import { Request, Response } from 'express';
import Todo, { TodoAttributes } from '../models/todo.model';

/**
 * Obtiene todas las tareas.
 */
export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.findAll({
      order: [['dueDate', 'ASC']]
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas', error });
  }
};

/**
 * Obtiene una tarea por su ID.
 */
export const getTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: `No se encontró la tarea con id ${id}` });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tarea', error });
  }
};

/**
 * Crea una nueva tarea.
 */
export const createTodo = async (req: Request, res: Response) => {
  try {
    const body: TodoAttributes = req.body;
    const newTodo = await Todo.create(body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea', error });
  }
};

/**
 * Actualiza una tarea existente.
 */
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body: TodoAttributes = req.body;

    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: `No se encontró la tarea con id ${id}` });
    }

    await todo.update(body);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tarea', error });
  }
};

/**
 * Elimina una tarea.
 */
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: `No se encontró la tarea con id ${id}` });
    }

    await todo.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea', error });
  }
};