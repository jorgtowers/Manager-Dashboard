import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Meetings from './components/Meetings';
import Assignments from './components/Assignments';
import Clients from './components/Clients';
import Todos from './components/Todos';
import Services from './components/Services';
import CriticalServices from './components/CriticalServices';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* La ruta principal (índice) muestra el Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Rutas para cada módulo individual */}
        <Route path="meetings" element={<div className="module-page-container"><Meetings /></div>} />
        <Route path="assignments" element={<div className="module-page-container"><Assignments /></div>} />
        <Route path="clients" element={<div className="module-page-container"><Clients /></div>} />
        <Route path="todos" element={<div className="module-page-container"><Todos /></div>} />
        <Route path="services" element={<div className="module-page-container"><Services /></div>} />
        <Route path="critical-services" element={<div className="module-page-container"><CriticalServices /></div>} />

        {/* Placeholder para módulos futuros */}
        <Route path="requests" element={<div className="module-page-container"><h2>Módulo de Solicitudes (Próximamente)</h2></div>} />
      </Route>
    </Routes>
  );
}

export default App;