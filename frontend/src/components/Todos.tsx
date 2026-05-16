import React, { useState, useEffect } from 'react';
import { Todo, Priority } from '../types';
import { todoApi } from '../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './Todos.css';

// Helper para obtener la clase CSS según la prioridad
const getPriorityClass = (priority: Priority) => {
  const map = {
    alta: 'priority-high',
    media: 'priority-medium',
    baja: 'priority-low',
  };
  return map[priority] || '';
};

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await todoApi.getAll();
        // Ordenar por fecha de vencimiento y luego por estado de completado
        const sortedData = data.sort((a, b) => {
          if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
          }
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
        setTodos(sortedData);
      } catch (err) {
        setError('No se pudieron cargar las tareas pendientes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleToggleComplete = async (id: number, currentStatus: boolean) => {
    // Guardar el estado original para poder revertirlo en caso de error
    const originalTodos = [...todos];

    // 1. Actualización optimista de la UI para una respuesta instantánea
    const updatedTodos = todos.map(t =>
      t.id === id ? { ...t, completed: !currentStatus } : t
    );
    setTodos(updatedTodos);

    try {
      // 2. Llamada a la API para persistir el cambio
      await todoApi.update(id, { completed: !currentStatus });
    } catch (err) {
      console.error("Failed to update todo status:", err);
      // 3. Si la API falla, revertir al estado original y notificar al usuario
      setTodos(originalTodos);
      alert('No se pudo actualizar la tarea. Por favor, inténtalo de nuevo.');
    }
  };

  if (loading) {
    return <p>Cargando tareas...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="todos-container">
      {todos.length === 0 ? (
        <p>¡No hay tareas pendientes!</p>
      ) : (
        <ul className="todos-list">
          {todos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div
                className="todo-status-icon"
                onClick={() => todo.id && handleToggleComplete(todo.id, todo.completed)}
                role="button"
                aria-label={`Marcar tarea ${todo.title} como ${todo.completed ? 'incompleta' : 'completada'}`}
                tabIndex={0}
              >
                <FontAwesomeIcon icon={todo.completed ? faCheckCircle : faCircle} />
              </div>
              <div className="todo-details">
                <span className="todo-title">{todo.title}</span>
                <span className="todo-due-date">
                  Vence: {new Date(todo.dueDate + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                </span>
              </div>
              <div className={`todo-priority ${getPriorityClass(todo.priority)}`}>
                <FontAwesomeIcon icon={faExclamationCircle} title={`Prioridad: ${todo.priority}`} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todos;