import React, { useState, useEffect } from 'react';
import { Service } from '../types';
import { serviceApi } from '../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarTimes, faPlus, faTimes, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Services.css';
import AddServiceForm from './AddServiceForm';

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
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

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

  const handleFormSubmit = (savedService: Service) => {
    let updatedServices;
    if (editingService) {
      // Update existing service
      updatedServices = services.map(s => s.id === savedService.id ? savedService : s);
    } else {
      // Add new service
      updatedServices = [...services, savedService];
    }
    // Re-sort the list
    updatedServices.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
    setServices(updatedServices);
    setShowAddForm(false);
    setEditingService(null);
  };

  const handleEditClick = (service: Service) => {
    setEditingService(service);
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este servicio? Esta acción no se puede deshacer.')) {
      try {
        await serviceApi.delete(id);
        setServices(services.filter(s => s.id !== id));
      } catch (err) {
        console.error("Failed to delete service:", err);
        alert('No se pudo eliminar el servicio. Por favor, inténtalo de nuevo.');
      }
    }
  };

  if (loading) {
    return <p>Cargando servicios...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <>
      <div className="services-header">
        <button className="add-service-btn" onClick={() => { setEditingService(null); setShowAddForm(!showAddForm); }}>
          <FontAwesomeIcon icon={showAddForm ? faTimes : faPlus} />
          {showAddForm ? ' Cancelar' : ' Nuevo Servicio'}
        </button>
      </div>

      {showAddForm && (
        <AddServiceForm
          onFormSubmit={handleFormSubmit}
          onCancel={() => { setShowAddForm(false); setEditingService(null); }}
          serviceToEdit={editingService}
        />
      )}

      <div className="services-container">
        {services.length === 0 && !loading && !showAddForm ? (
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
                <div className="service-actions">
                  <div className={`days-left ${className}`}>
                    <FontAwesomeIcon icon={faCalendarTimes} />
                    <span>{days < 0 ? 'Vencido' : days === 0 ? 'Vence hoy' : `Vence en ${days} días`}</span>
                  </div>
                  <button className="btn-edit" onClick={() => handleEditClick(service)}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </button>
                  <button className="btn-delete" onClick={() => service.id && handleDelete(service.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Services;