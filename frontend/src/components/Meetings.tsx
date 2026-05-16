import React, { useState, useEffect } from 'react';
import { Meeting } from '../types';
import { meetingApi } from '../services/apiService';
import './Meetings.css';

const Meetings: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <p>Cargando reuniones...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="meetings-list">
      {meetings.length === 0 ? (
        <p>No hay reuniones programadas.</p>
      ) : (
        <ul>
          {meetings.map((meeting) => (
            <li key={meeting.id} className="meeting-item">
              <div className="meeting-info">
                <strong>{meeting.title}</strong>
                <span>{new Date(meeting.date + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })} - {meeting.time}</span>
              </div>
              <div className="meeting-participants">
                <span>Participantes: {meeting.participants}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Meetings;