import React, { useState, useEffect } from 'react';
import { Service } from '../types';
import { serviceApi } from '../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import './Services.css';

// Helper para calcular días restantes y obtener una clase CSS
const getExpirationInfo = (endDate: string): { days: number; className: string } => {
  const end = new Date(endDate);
  const now = new Date();
  // Normalizar horas para comparar solo fechas
  end.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let className = 'safe';
  if (diffDays <= 7) {
    className = 'urgent';
  } else if (diffDays <= 30) {
    className = 'warning';
  }

  return { days: diffDays, className };
};

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceApi.getAll();
        // Ordenar por fecha de vencimiento para mostrar los más próximos primero
        const sortedData = data.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
        setServices(sortedData);
      } catch (err) {
        setError('No se pudieron cargar los servicios.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <p>Cargando servicios...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="services-container">
      {services.length === 0 ? (
        <p>No hay servicios registrados.</p>
      ) : (
        <ul className="services-list">
          {services.map((service) => {
            const { days, className } = getExpirationInfo(service.endDate);
            return (
              <li key={service.id} className="service-item">
                <div className="service-info">
                  <span className="service-name">{service.name}</span>
                  <span className="service-provider">{service.provider}</span>
                </div>
                <div className={`days-left ${className}`}>
                  <FontAwesomeIcon icon={faCalendarTimes} />
                  <span>{days < 0 ? 'Vencido' : days === 0 ? 'Vence hoy' : `Vence en ${days} días`}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Services;