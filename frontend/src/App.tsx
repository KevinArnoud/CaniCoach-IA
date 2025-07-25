import React, { useState } from 'react';
import { ChatPage } from './components/Chat/ChatPage';
import './App.css';

const App: React.FC = () => {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return <ChatPage onBackClick={() => setShowChat(false)} />;
  }

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <div className="logo-section">
            <span className="logo">🐕</span>
            <div>
              <h1>CaniCoach IA</h1>
              <p className="tagline">Éducation canine éthique</p>
            </div>
          </div>
        </header>

        <main className="app-main">
          <div className="welcome-card">
            <h2>Bienvenue ! 🎉</h2>
            <p>Votre coach personnel pour l'éducation canine bienveillante, basé sur les méthodes d'Esprit Dog.</p>
            
            <button 
              onClick={() => setShowChat(true)}
              className="btn btn-primary start-chat-btn"
            >
              Commencer le chat
            </button>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">💬</span>
              <h3>Chat IA personnalisé</h3>
              <p>Conseils adaptés à votre chien</p>
            </div>
            
            <div className="feature-card">
              <span className="feature-icon">🎓</span>
              <h3>Méthodes Esprit Dog</h3>
              <p>Éducation positive et bienveillante</p>
            </div>
            
            <div className="feature-card">
              <span className="feature-icon">📱</span>
              <h3>Disponible 24/7</h3>
              <p>Votre coach toujours accessible</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;