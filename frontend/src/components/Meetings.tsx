import React, { useState, useEffect } from 'react';
import { Meeting } from '../types';
import { meetingApi } from '../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddMeetingForm from './AddMeetingForm';
import './Meetings.css';

const Meetings: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await meetingApi.getAll();
        // Ordenar reuniones por fecha y hora para mostrar las más próximas primero
        const sortedData = data.sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateA.getTime() - dateB.getTime();
        });
        setMeetings(sortedData);
      } catch (err) {
        setError('No se pudieron cargar las reuniones. Asegúrate de que el backend esté funcionando.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const handleFormSubmit = (savedMeeting: Meeting) => {
    let updatedMeetings;
    if (editingMeeting) {
      updatedMeetings = meetings.map(m => m.id === savedMeeting.id ? savedMeeting : m);
    } else {
      updatedMeetings = [...meetings, savedMeeting];
    }

    updatedMeetings.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

    setMeetings(updatedMeetings);
    setShowAddForm(false);
    setEditingMeeting(null);
  };

  const handleEditClick = (meeting: Meeting) => {
    setEditingMeeting(meeting);
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta reunión?')) {
      try {
        await meetingApi.delete(id);
        setMeetings(meetings.filter(m => m.id !== id));
      } catch (err) {
        console.error("Failed to delete meeting:", err);
        alert('No se pudo eliminar la reunión. Por favor, inténtalo de nuevo.');
      }
    }
  };

  if (loading) {
    return <p>Cargando reuniones...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <>
      <div className="meetings-header">
        <button className="add-meeting-btn" onClick={() => { setEditingMeeting(null); setShowAddForm(!showAddForm); }}>
          <FontAwesomeIcon icon={showAddForm ? faTimes : faPlus} />
          {showAddForm ? ' Cancelar' : ' Nueva Reunión'}
        </button>
      </div>

      {showAddForm && (
        <AddMeetingForm
          onFormSubmit={handleFormSubmit}
          onCancel={() => { setShowAddForm(false); setEditingMeeting(null); }}
          meetingToEdit={editingMeeting}
        />
      )}

      <div className="meetings-list">
        {meetings.length === 0 && !loading && !showAddForm ? (
          <p>No hay reuniones programadas.</p>
        ) : (
          <ul>
            {meetings.map((meeting) => (
              <li key={meeting.id} className="meeting-item">
                <div className="meeting-details">
                  <div className="meeting-info">
                    <strong>{meeting.title}</strong>
                    <span>{new Date(meeting.date + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })} - {meeting.time}</span>
                  </div>
                  <div className="meeting-participants">
                    <span>Participantes: {meeting.participants}</span>
                  </div>
                </div>
                <div className="meeting-actions">
                  <button className="btn-edit" title="Editar Reunión" onClick={() => handleEditClick(meeting)}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </button>
                  <button className="btn-delete" title="Eliminar Reunión" onClick={() => meeting.id && handleDelete(meeting.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Meetings;