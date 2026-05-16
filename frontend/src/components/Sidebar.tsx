import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import {
  faHome,
  faCalendarAlt,
  faTasks,
  faFileSignature,
  faUsers,
  faClipboardList,
  faBell,
  faExclamationTriangle,
  faServer,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <FontAwesomeIcon icon={faServer} />
          <span>TechManager</span>
        </div>
        <button className="close-sidebar" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" className="nav-item" end>
          <FontAwesomeIcon icon={faHome} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/meetings" className="nav-item">
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span>Reuniones</span>
        </NavLink>
        <NavLink to="/assignments" className="nav-item">
          <FontAwesomeIcon icon={faTasks} />
          <span>Asignaciones</span>
        </NavLink>
        <NavLink to="/requests" className="nav-item">
          <FontAwesomeIcon icon={faFileSignature} />
          <span>Solicitudes</span>
        </NavLink>
        <NavLink to="/clients" className="nav-item">
          <FontAwesomeIcon icon={faUsers} />
          <span>Clientes</span>
        </NavLink>
        <NavLink to="/todos" className="nav-item">
          <FontAwesomeIcon icon={faClipboardList} />
          <span>Por Hacer</span>
        </NavLink>
        <NavLink to="/services" className="nav-item">
          <FontAwesomeIcon icon={faBell} />
          <span>Servicios</span>
        </NavLink>
        <NavLink to="/critical-services" className="nav-item">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <span>Serv. Críticos</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;