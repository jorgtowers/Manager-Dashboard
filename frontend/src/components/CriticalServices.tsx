import React, { useState, useEffect } from 'react';
import { CriticalService } from '../types';
import { criticalServiceApi } from '../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faServer, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import './CriticalServices.css';

const CriticalServices: React.FC = () => {
  const [services, setServices] = useState<CriticalService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await criticalServiceApi.getAll();
        setServices(data);
      } catch (err) {
        setError('No se pudo obtener el estado de los servicios críticos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
    // Establecer un sondeo para refrescar los datos cada 30 segundos
    const intervalId = setInterval(fetchServices, 30000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <p>Obteniendo estado de servicios...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="critical-services-container">
      {services.length === 0 ? (
        <p>No hay servicios críticos monitorizados.</p>
      ) : (
        <ul className="critical-services-list">
          {services.map((service) => (
            <li key={service.id} className="critical-service-item">
              <div className="service-status">
                <FontAwesomeIcon
                  icon={faCircle}
                  className={`status-indicator ${service.status === 'up' ? 'status-up' : 'status-down'}`}
                />
                <span className="service-name">{service.name}</span>
              </div>
              <div className="service-details">
                <span><FontAwesomeIcon icon={faServer} /> {service.ip}</span>
                <span><FontAwesomeIcon icon={faNetworkWired} /> {service.department}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CriticalServices;