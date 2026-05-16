import React from 'react';
import Meetings from './Meetings';
import Assignments from './Assignments';
import Clients from './Clients';
import Todos from './Todos';
import Services from './Services';
import CriticalServices from './CriticalServices';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Reuniones</h2>
          <Meetings />
        </div>
        <div className="dashboard-card">
          <h2>Asignaciones</h2>
          <Assignments />
        </div>
        <div className="dashboard-card">
          <h2>Clientes</h2>
          <Clients />
        </div>
        <div className="dashboard-card">
          <h2>Tareas Pendientes</h2>
          <Todos />
        </div>
        <div className="dashboard-card">
          <h2>Servicios por Vencer</h2>
          <Services />
        </div>
        <div className="dashboard-card">
          <h2>Servicios Críticos</h2>
          <CriticalServices />
        </div>
      </div>
  );
};

export default Dashboard;