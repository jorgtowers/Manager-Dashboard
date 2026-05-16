import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    setCurrentDate(date.toLocaleDateString('es-ES', options));
  }, []);

  return (
    <header className="header">
      <button className="menu-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="header-title">
        <h1>Tablero de Control - Área de Tecnología</h1>
        <p id="current-date">{currentDate}</p>
      </div>
      <div className="header-actions">
        <button className="btn-notification">
          <FontAwesomeIcon icon={faBell} />
        </button>
        <div className="user-info">
          <FontAwesomeIcon icon={faUserCircle} />
          <span>Gerente IT</span>
        </div>
      </div>
    </header>
  );
};

export default Header;