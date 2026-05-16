import React, { useState, useEffect } from 'react';
import { Client, ClientStatus, Priority } from '../types';
import { clientApi } from '../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faClipboardQuestion, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Clients.css';
import AddClientForm from './AddClientForm';

// Helper para mapear el estado a una clase CSS
const getStatusClass = (status: ClientStatus) => {
  const map = {
    pendiente: 'status-pending',
    en_atencion: 'status-in-attention',
    atendido: 'status-attended',
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

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await clientApi.getAll();
        setClients(data);
      } catch (err) {
        setError('No se pudieron cargar los clientes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleClientAdded = (newClient: Client) => {
    setClients([newClient, ...clients]);
    setShowAddForm(false);
  };

  if (loading) {
    return <p>Cargando clientes...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <>
      <div className="clients-header">
        <button className="add-client-btn" onClick={() => setShowAddForm(!showAddForm)}>
          <FontAwesomeIcon icon={showAddForm ? faTimes : faPlus} />
          {showAddForm ? ' Cancelar' : ' Nueva Necesidad'}
        </button>
      </div>

      {showAddForm && <AddClientForm onClientAdded={handleClientAdded} />}

      <div className="clients-container">
        {clients.length === 0 && !showAddForm ? (
          <p>No hay clientes registrados.</p>
        ) : (
          <div className="clients-list">
            {clients.map((client) => (
              <div key={client.id} className={`client-card ${getPriorityClass(client.priority)}`}>
                <div className="client-card-header">
                  <h3>{client.name}</h3>
                  <span className={`status-badge ${getStatusClass(client.status)}`}>
                    {client.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="client-need"><FontAwesomeIcon icon={faClipboardQuestion} /> {client.need}</p>
                <div className="client-card-footer">
                  <div className="footer-item"><FontAwesomeIcon icon={faUserTie} /> <span>{client.contact}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Clients;