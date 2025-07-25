import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthForm } from './components/Auth/AuthForm';
import { ChatPage } from './components/Chat/ChatPage';
import { DogIcon, MessageIcon, PawIcon } from './components/Icons/IconSet';
import './components/Auth/Auth.css';
import './styles/design-system.css';
import './App.css';

// Page d'accueil style Esprit Dog
const WelcomePage: React.FC<{ onStartChat: () => void }> = ({ onStartChat }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        {/* Header avec logo */}
        <div className="welcome-header">
          <div className="app-logo">
            <DogIcon className="logo-icon" />
            <div className="logo-text">
              <span className="logo-cani">Cani</span>
              <span className="logo-coach">Coach</span>
            </div>
          </div>
        </div>

        {/* Section principale */}
        <div className="welcome-main">
          <div className="welcome-icon">
            <DogIcon size={80} className="main-dog-icon" />
          </div>
          
          <h1 className="welcome-title">
            Bienvenue ! 
            <span className="celebration-icon">🎉</span>
          </h1>
          
          <p className="welcome-subtitle">
            Votre coach personnel pour l'éducation canine bienveillante, 
            basé sur les méthodes d'Esprit Dog.
          </p>

          <button 
            onClick={onStartChat}
            className="btn btn-primary btn-start-chat"
          >
            <MessageIcon size={20} />
            Commencer le chat
          </button>
        </div>

        {/* Fonctionnalités */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon chat-icon">
              <MessageIcon size={24} />
            </div>
            <h3 className="feature-title">Chat IA personnalisé</h3>
            <p className="feature-description">Conseils adaptés à votre chien</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon esprit-icon">
              🎓
            </div>
            <h3 className="feature-title">Méthodes Esprit Dog</h3>
            <p className="feature-description">Éducation positive et bienveillante</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon paw-icon">
              <PawIcon size={24} />
            </div>
            <h3 className="feature-title">Suivi personnalisé</h3>
            <p className="feature-description">Accompagnement adapté à chaque chien</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard principal après connexion
const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [currentView, setCurrentView] = useState<'welcome' | 'chat'>('welcome');

  const handleSignOut = async () => {
    await signOut();
  };

  if (currentView === 'chat') {
    return (
      <ChatPage onBackClick={() => setCurrentView('welcome')} />
    );
  }

  return (
    <div className="dashboard">
      {/* Header minimaliste */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-logo">
            <DogIcon className="header-icon" />
            <span className="header-title">CaniCoach</span>
          </div>
          
          <div className="header-actions">
            <span className="user-email">{user?.email}</span>
            <button 
              onClick={handleSignOut} 
              className="btn btn-ghost btn-sm"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="dashboard-main">
        <WelcomePage onStartChat={() => setCurrentView('chat')} />
      </main>
    </div>
  );
};

// Composant de chargement
const LoadingScreen: React.FC = () => (
  <div className="loading-container">
    <div className="loading-content">
      <DogIcon size={48} className="loading-icon" />
      <h2 className="loading-title">CaniCoach</h2>
      <p className="loading-text">Chargement...</p>
      <div className="loading-spinner"></div>
    </div>
  </div>
);

// Gestion de l'état d'authentification
const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return user ? <Dashboard /> : <AuthForm />;
};

// App principale
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;