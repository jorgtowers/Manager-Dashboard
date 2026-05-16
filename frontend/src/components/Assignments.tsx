import React, { useState, useEffect } from 'react';
import { Assignment, AssignmentStatus, Priority } from '../types';
import { assignmentApi } from '../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding, faCalendarCheck, faPlus, faTimes, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Assignments.css';
import AddAssignmentForm from './AddAssignmentForm';

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
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);

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

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta asignación?')) {
      try {
        await assignmentApi.delete(id);
        setAssignments(assignments.filter(a => a.id !== id));
      } catch (err) {
        console.error("Failed to delete assignment:", err);
        alert('No se pudo eliminar la asignación. Por favor, inténtalo de nuevo.');
      }
    }
  };

  const handleFormSubmit = (savedAssignment: Assignment) => {
    let updatedAssignments;
    if (editingAssignment) {
      // Update existing assignment
      updatedAssignments = assignments.map(a => a.id === savedAssignment.id ? savedAssignment : a);
    } else {
      // Add new assignment to the top
      updatedAssignments = [savedAssignment, ...assignments];
    }
    setAssignments(updatedAssignments);
    setShowAddForm(false);
    setEditingAssignment(null);
  };

  const handleEditClick = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setShowAddForm(true);
  };

  if (loading) {
    return <p>Cargando asignaciones...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <>
      <div className="assignments-header">
        <button className="add-assignment-btn" onClick={() => { setEditingAssignment(null); setShowAddForm(!showAddForm); }}>
          <FontAwesomeIcon icon={showAddForm ? faTimes : faPlus} />
          {showAddForm ? ' Cancelar' : ' Nueva Asignación'}
        </button>
      </div>

      {showAddForm && (
        <AddAssignmentForm
          onFormSubmit={handleFormSubmit}
          onCancel={() => { setShowAddForm(false); setEditingAssignment(null); }}
          assignmentToEdit={editingAssignment}
        />
      )}

      <div className="assignments-container">
        {assignments.length === 0 && !loading && !showAddForm ? (
          <p>No hay asignaciones activas.</p>
        ) : (
          <div className="assignments-grid">
            {assignments.map((assignment) => (
              <div key={assignment.id} className={`assignment-card ${getPriorityClass(assignment.priority)}`}>
                <div className="assignment-card-header">
                  <h3>{assignment.title}</h3>
                  <div className="assignment-actions">
                    <span className={`status-badge ${getStatusClass(assignment.status)}`}>
                      {assignment.status.replace('_', ' ')}
                    </span>
                    <button className="btn-edit" title="Editar Asignación" onClick={() => handleEditClick(assignment)}>
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                    <button className="btn-delete" title="Eliminar Asignación" onClick={() => assignment.id && handleDelete(assignment.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
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
    </>
  );
};

export default Assignments;