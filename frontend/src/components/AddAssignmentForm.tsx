import React, { useState } from 'react';
import { Assignment, AssignmentStatus, Priority } from '../types';
import { assignmentApi } from '../services/apiService';
import './AddAssignmentForm.css';

interface AddAssignmentFormProps {
  onFormSubmit: (assignment: Assignment) => void;
  onCancel: () => void;
  assignmentToEdit?: Assignment | null;
}

const AddAssignmentForm: React.FC<AddAssignmentFormProps> = ({ onFormSubmit, onCancel, assignmentToEdit }) => {
  const [title, setTitle] = useState('');
  const [employee, setEmployee] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState<AssignmentStatus>('pendiente');
  const [priority, setPriority] = useState<Priority>('media');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = !!assignmentToEdit;

  React.useEffect(() => {
    if (isEditMode && assignmentToEdit) {
      setTitle(assignmentToEdit.title);
      setEmployee(assignmentToEdit.employee);
      setDepartment(assignmentToEdit.department);
      setStatus(assignmentToEdit.status);
      setPriority(assignmentToEdit.priority);
      setDescription(assignmentToEdit.description);
      // The date from the DB is likely YYYY-MM-DDTHH:mm:ss.sssZ, but the input needs YYYY-MM-DD
      setDueDate(assignmentToEdit.dueDate.split('T')[0]);
    }
  }, [assignmentToEdit, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !employee || !department || !dueDate) {
      setError('Los campos marcados con * son obligatorios.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    const assignmentData = {
      title,
      employee,
      department,
      status,
      priority,
      description,
      dueDate,
    };

    try {
      let savedAssignment: Assignment;
      if (isEditMode && assignmentToEdit?.id) {
        savedAssignment = await assignmentApi.update(assignmentToEdit.id, assignmentData);
      } else {
        savedAssignment = await assignmentApi.create(assignmentData);
      }
      onFormSubmit(savedAssignment);
    } catch (err) {
      setError(isEditMode ? 'No se pudo actualizar la asignación.' : 'No se pudo crear la asignación.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="add-assignment-form" onSubmit={handleSubmit}>
      <h4>{isEditMode ? 'Editar Asignación' : 'Crear Nueva Asignación'}</h4>
      {error && <p className="form-error">{error}</p>}
      <div className="form-group">
        <label htmlFor="assignment-title">Título *</label>
        <input id="assignment-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="assignment-employee">Empleado *</label>
          <input id="assignment-employee" type="text" value={employee} onChange={(e) => setEmployee(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="assignment-department">Departamento *</label>
          <input id="assignment-department" type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="assignment-status">Estado *</label>
          <select id="assignment-status" value={status} onChange={(e) => setStatus(e.target.value as AssignmentStatus)}>
            <option value="pendiente">Pendiente</option>
            <option value="en_progreso">En Progreso</option>
            <option value="completado">Completado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="assignment-priority">Prioridad *</label>
          <select id="assignment-priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="assignment-dueDate">Fecha Límite *</label>
          <input id="assignment-dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="assignment-description">Descripción</label>
        <textarea id="assignment-description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2}></textarea>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? (isEditMode ? 'Guardando...' : 'Creando...') : (isEditMode ? 'Guardar Cambios' : 'Crear Asignación')}
        </button>
      </div>
    </form>
  );
};

export default AddAssignmentForm;