import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import ContentSection from './components/ContentSection';
import './App.css';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('login');
  const [activeSection, setActiveSection] = useState('');

  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is logged in, show the main app
  if (user) {
    return (
      <div className="app">
        <header>
          <h1>Authentication System</h1>
          <Dashboard />
        </header>
        
        <Navigation 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        
        <main>
          <ContentSection section={activeSection} />
        </main>
      </div>
    );
  }

  // If user is not logged in, show login/register
  return (
    <div className="app">
      <header>
        <h1>Authentication System</h1>
      </header>
      
      <main>
        {currentView === 'login' ? (
          <Login onShowRegister={() => setCurrentView('register')} />
        ) : (
          <Register onShowLogin={() => setCurrentView('login')} />
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
