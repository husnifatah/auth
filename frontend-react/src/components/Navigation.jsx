import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navigation = ({ activeSection, onSectionChange }) => {
  const { user } = useAuth();

  return (
    <nav className="navigation">
      <ul>
        <li>
          <button 
            onClick={() => onSectionChange('home')}
            className={activeSection === 'home' ? 'active' : ''}
          >
            Home
          </button>
        </li>
        <li>
          <button 
            onClick={() => onSectionChange('public')}
            className={activeSection === 'public' ? 'active' : ''}
          >
            Public
          </button>
        </li>
        {(user) && (
          <li>
            <button 
              onClick={() => onSectionChange('protected')}
              className={activeSection === 'protected' ? 'active' : ''}
            >
              Protected
            </button>
          </li>
        )}
        {(user && user.role === 'admin') && (
          <>
            <li>
              <button 
                onClick={() => onSectionChange('admin')}
                className={activeSection === 'admin' ? 'active' : ''}
              >
                Admin
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSectionChange('manager')}
                className={activeSection === 'manager' ? 'active' : ''}
              >
                Manager
              </button>
            </li>
          </>
        )}
        {(user && user.role === 'manager') && (
          <li>
            <button 
              onClick={() => onSectionChange('manager')}
              className={activeSection === 'manager' ? 'active' : ''}
            >
              Manager
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;