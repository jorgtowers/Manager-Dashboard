import React, { useState, useEffect } from 'react';
import { Assignment, AssignmentStatus, Priority } from '../types';
import { assignmentApi } from '../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import './Assignments.css';

// Helper para mapear el estado a una clase CSS
const getStatusClass = (status: AssignmentStatus) => {
  const map = {
    pendiente: 'status-pending',
    en_progreso: 'status-in-progress',
    completado: 'status-completed',
  };
  return map[status] || '';
};

// Helper para mapear la prioridad a una clase CSS
const getPriorityClass = (priority: Priority) => {
  const map = {
    alta: 'priority-high',
    media: 'priority-medium',
    baja: 'priority-low',
  };
  return map[priority] || '';
};

const Assignments: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await assignmentApi.getAll();
        setAssignments(data);
      } catch (err) {
        setError('No se pudieron cargar las asignaciones.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) {
    return <p>Cargando asignaciones...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="assignments-container">
      {assignments.length === 0 ? (
        <p>No hay asignaciones activas.</p>
      ) : (
        <div className="assignments-grid">
          {assignments.map((assignment) => (
            <div key={assignment.id} className={`assignment-card ${getPriorityClass(assignment.priority)}`}>
              <div className="assignment-card-header">
                <h3>{assignment.title}</h3>
                <span className={`status-badge ${getStatusClass(assignment.status)}`}>
                  {assignment.status.replace('_', ' ')}
                </span>
              </div>
              <p className="assignment-description">{assignment.description}</p>
              <div className="assignment-card-footer">
                <div className="footer-item"><FontAwesomeIcon icon={faUser} /> <span>{assignment.employee}</span></div>
                <div className="footer-item"><FontAwesomeIcon icon={faBuilding} /> <span>{assignment.department}</span></div>
                <div className="footer-item"><FontAwesomeIcon icon={faCalendarCheck} /> <span>{new Date(assignment.dueDate + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assignments;