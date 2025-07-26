import React, { useState } from 'react';
import { CaniCoachMainLogo, MessageIcon, PawIcon, UserIcon } from './components/Icons/IconSet';
import './App.css';

// Composant simple de test
const SimpleApp: React.FC = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-logo">
            <CaniCoachMainLogo className="header-icon" />
            <span className="header-title">CaniCoach</span>
          </div>
          
          <div className="header-actions">
            <span className="user-email">Mode Test</span>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-container">
          <div className="welcome-content">
            <div className="welcome-header">
              <div className="app-logo">
                <div className="logo-text">
                  <span className="logo-cani">Cani</span>
                  <span className="logo-coach">Coach</span>
                </div>
              </div>
            </div>

            <div className="welcome-main">
              <div className="welcome-icon">
                <CaniCoachMainLogo size={80} className="main-dog-icon" />
              </div>
              
              <h1 className="welcome-title">
                Application Test
              </h1>
              
              <p className="welcome-subtitle">
                L'application fonctionne correctement !
              </p>

              <div className="welcome-actions">
                <button 
                  className="btn btn-primary btn-start-chat"
                  onClick={() => setMessage('Bouton cliqué !')}
                >
                  <MessageIcon size={20} />
                  Test Button
                </button>
                
                {message && (
                  <p style={{ color: 'green', marginTop: '1rem' }}>
                    {message}
                  </p>
                )}
              </div>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon chat-icon">
                  <MessageIcon size={24} />
                </div>
                <h3 className="feature-title">Chat IA</h3>
                <p className="feature-description">Interface fonctionnelle</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon esprit-icon">
                  🎓
                </div>
                <h3 className="feature-title">Méthodes</h3>
                <p className="feature-description">Éducation positive</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon paw-icon">
                  <PawIcon size={24} />
                </div>
                <h3 className="feature-title">Suivi</h3>
                <p className="feature-description">Accompagnement personnalisé</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SimpleApp;