import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthForm } from './components/Auth/AuthForm';
import { ChatPage } from './components/Chat/ChatPage';
import './components/Auth/Auth.css';
import './styles/globals.css';
import './App.css';

// Composant principal de l'app (après connexion)
const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [showChat, setShowChat] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  // Si on veut voir le chat, on affiche le nouveau design
  if (showChat) {
    return (
      <ChatPage onBackClick={() => setShowChat(false)} />
    );
  }

  // Sinon, on affiche l'ancien dashboard avec un bouton pour tester
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🐕 CaniCoach IA</h1>
          <div className="user-info">
            <span>Bonjour {user?.email}</span>
            <button onClick={handleSignOut} className="sign-out-btn">
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Bienvenue dans CaniCoach IA ! 🎉</h2>
          <p>Votre coach personnel pour l'éducation canine éthique</p>
          
          {/* Bouton pour tester le nouveau design */}
          <div style={{ margin: '2rem 0' }}>
            <button 
              onClick={() => setShowChat(true)}
              className="btn btn-primary"
              style={{ 
                padding: '1rem 2rem',
                fontSize: '1.1rem'
              }}
            >
              Essayer le nouveau chat
            </button>
          </div>
        </div>
      </main>
    </div>