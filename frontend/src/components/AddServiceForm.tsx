import React, { useState } from 'react';
import { Service } from '../types';
import { serviceApi } from '../services/apiService';
import './AddServiceForm.css';

interface AddServiceFormProps {
  onFormSubmit: (service: Service) => void;
  onCancel: () => void;
  serviceToEdit?: Service | null;
}

const AddServiceForm: React.FC<AddServiceFormProps> = ({ onFormSubmit, onCancel, serviceToEdit }) => {
  const [name, setName] = useState('');
  const [provider, setProvider] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cost, setCost] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = !!serviceToEdit;

  React.useEffect(() => {
    if (isEditMode && serviceToEdit) {
      setName(serviceToEdit.name);
      setProvider(serviceToEdit.provider);
      setStartDate(serviceToEdit.startDate);
      setEndDate(serviceToEdit.endDate);
      setCost(serviceToEdit.cost);
    }
  }, [serviceToEdit, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !provider || !startDate || !endDate || cost <= 0) {
      setError('Todos los campos son obligatorios y el costo debe ser mayor a cero.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    const serviceData = {
      name,
      provider,
      startDate,
      endDate,
      cost: Number(cost),
    };

    try {
      let savedService: Service;
      if (isEditMode && serviceToEdit?.id) {
        savedService = await serviceApi.update(serviceToEdit.id, serviceData);
      } else {
        savedService = await serviceApi.create(serviceData);
      }
      onFormSubmit(savedService);
    } catch (err) {
      setError(isEditMode ? 'No se pudo actualizar el servicio.' : 'No se pudo crear el servicio.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="add-service-form" onSubmit={handleSubmit}>
      <h4>{isEditMode ? 'Editar Servicio' : 'Crear Nuevo Servicio'}</h4>
      {error && <p className="form-error">{error}</p>}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="service-name">Nombre Servicio *</label>
          <input id="service-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="service-provider">Proveedor *</label>
          <input id="service-provider" type="text" value={provider} onChange={(e) => setProvider(e.target.value)} required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="service-startDate">Fecha Inicio *</label>
          <input id="service-startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="service-endDate">Fecha Vencimiento *</label>
          <input id="service-endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="service-cost">Costo (USD) *</label>
          <input id="service-cost" type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))} required min="0.01" step="0.01" />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? (isEditMode ? 'Guardando...' : 'Creando...') : (isEditMode ? 'Guardar Cambios' : 'Crear Servicio')}
        </button>
      </div>
    </form>
  );
};

export default AddServiceForm;