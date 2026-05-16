import React, { useState } from 'react';
import { Todo, Priority } from '../types';
import { todoApi } from '../services/apiService';
import './AddTodoForm.css';

interface AddTodoFormProps {
  onTodoAdded: (newTodo: Todo) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onTodoAdded }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('media');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) {
      setError('El título y la fecha son obligatorios.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    const newTodoData = {
      title,
      priority,
      dueDate,
      completed: false,
    };

    try {
      const createdTodo = await todoApi.create(newTodoData);
      onTodoAdded(createdTodo);
      // Reset form
      setTitle('');
      setPriority('media');
      setDueDate('');
    } catch (err) {
      setError('No se pudo crear la tarea. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="todo-title">Título</label>
          <input
            id="todo-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="¿Qué necesitas hacer?"
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="todo-priority">Prioridad</label>
          <select id="todo-priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="todo-dueDate">Fecha Límite</label>
          <input id="todo-dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div>
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Añadiendo...' : 'Añadir Tarea'}
      </button>
    </form>
  );
};

export default AddTodoForm;