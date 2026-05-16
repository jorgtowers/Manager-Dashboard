import React, { useState } from 'react';
import { Meeting } from '../types';
import { meetingApi } from '../services/apiService';
import './AddMeetingForm.css';

interface AddMeetingFormProps {
  onFormSubmit: (newMeeting: Meeting) => void;
  onCancel: () => void;
  meetingToEdit?: Meeting | null;
}

const AddMeetingForm: React.FC<AddMeetingFormProps> = ({ onFormSubmit, onCancel, meetingToEdit }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(60);
  const [participants, setParticipants] = useState('');
  const [description, setDescription] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = !!meetingToEdit;

  React.useEffect(() => {
    if (isEditMode && meetingToEdit) {
      setTitle(meetingToEdit.title);
      // The date from the DB is likely YYYY-MM-DDTHH:mm:ss.sssZ, but the input needs YYYY-MM-DD
      setDate(meetingToEdit.date.split('T')[0]);
      setTime(meetingToEdit.time);
      setDuration(meetingToEdit.duration);
      setParticipants(meetingToEdit.participants);
      setDescription(meetingToEdit.description);
    }
  }, [meetingToEdit, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time || !duration || !participants) {
      setError('Los campos marcados con * son obligatorios.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    const meetingData = {
      title,
      date,
      time,
      duration: Number(duration),
      participants,
      description,
    };

    try {
      let savedMeeting: Meeting;
      if (isEditMode && meetingToEdit?.id) {
        savedMeeting = await meetingApi.update(meetingToEdit.id, meetingData);
      } else {
        savedMeeting = await meetingApi.create(meetingData);
      }
      onFormSubmit(savedMeeting);
    } catch (err) {
      setError(isEditMode ? 'No se pudo actualizar la reunión.' : 'No se pudo crear la reunión.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="add-meeting-form" onSubmit={handleSubmit}>
      <h4>{isEditMode ? 'Editar Reunión' : 'Crear Nueva Reunión'}</h4>
      {error && <p className="form-error">{error}</p>}
      <div className="form-group">
        <label htmlFor="meeting-title">Título *</label>
        <input id="meeting-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: Revisión de Sprint" required />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="meeting-date">Fecha *</label>
          <input id="meeting-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="meeting-time">Hora *</label>
          <input id="meeting-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="meeting-duration">Duración (min) *</label>
          <input id="meeting-duration" type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="meeting-participants">Participantes *</label>
        <input id="meeting-participants" type="text" value={participants} onChange={(e) => setParticipants(e.target.value)} placeholder="Ej: Equipo de Desarrollo, PM" required />
      </div>
      <div className="form-group">
        <label htmlFor="meeting-description">Descripción</label>
        <textarea id="meeting-description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Temas a tratar..."></textarea>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? (isEditMode ? 'Guardando...' : 'Creando...') : (isEditMode ? 'Guardar Cambios' : 'Crear Reunión')}
        </button>
      </div>
    </form>
  );
};

export default AddMeetingForm;