import React, { useState } from 'react';
import { Client, ClientStatus, Priority } from '../types';
import { clientApi } from '../services/apiService';
import './AddClientForm.css';

interface AddClientFormProps {
  onClientAdded: (newClient: Client) => void;
}

const AddClientForm: React.FC<AddClientFormProps> = ({ onClientAdded }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [need, setNeed] = useState('');
  const [status, setStatus] = useState<ClientStatus>('pendiente');
  const [priority, setPriority] = useState<Priority>('media');
  const [description, setDescription] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact || !need) {
      setError('Los campos marcados con * son obligatorios.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    const newClientData = {
      name,
      contact,
      need,
      status,
      priority,
      description,
      date: new Date().toISOString().split('T')[0], // Set current date
    };

    try {
      const createdClient = await clientApi.create(newClientData);
      onClientAdded(createdClient);
      // Reset form
      setName('');
      setContact('');
      setNeed('');
      setStatus('pendiente');
      setPriority('media');
      setDescription('');
    } catch (err) {
      setError('No se pudo registrar la necesidad. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="add-client-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="client-name">Nombre Cliente *</label>
          <input id="client-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="client-contact">Contacto *</label>
          <input id="client-contact" type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="client-need">Necesidad Principal *</label>
        <input id="client-need" type="text" value={need} onChange={(e) => setNeed(e.target.value)} required />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="client-status">Estado *</label>
          <select id="client-status" value={status} onChange={(e) => setStatus(e.target.value as ClientStatus)}>
            <option value="pendiente">Pendiente</option>
            <option value="en_atencion">En Atención</option>
            <option value="atendido">Atendido</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="client-priority">Prioridad *</label>
          <select id="client-priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="client-description">Descripción</label>
        <textarea id="client-description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2}></textarea>
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registrando...' : 'Registrar Necesidad'}
      </button>
    </form>
  );
};

export default AddClientForm;