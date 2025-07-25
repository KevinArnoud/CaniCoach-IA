import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { AuthForm } from './components/Auth/AuthForm';
import { ChatPage } from './components/Chat/ChatPage';
import { DogProfileForm } from './components/DogProfile/DogProfileForm';
import { UserProfile } from './components/Profile/UserProfile';
import { ProgressJournal } from './components/Features/ProgressJournal';
import { WeeklyChallenges } from './components/Features/WeeklyChallenges';
import { DogIcon, MessageIcon, PawIcon, UserIcon } from './components/Icons/IconSet';
import './components/Auth/Auth.css';
import './App.css';

interface DogProfile {
  name: string;
  breed: string;
  dateOfBirth: string;
  background: string;
  healthIssues: string;
  photoUrl?: string;
}

// Page d'accueil style Esprit Dog
const WelcomePage: React.FC<{ 
  onStartChat: () => void; 
  onCreateProfile: () => void;
  onShowProgressJournal: () => void;
  onShowWeeklyChallenges: () => void;
}> = ({ 
  onStartChat, 
  onCreateProfile,
  onShowProgressJournal,
  onShowWeeklyChallenges
}) => {
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
            basé sur les méthodes d'Esprit Dog de Tony Silvestre.
          </p>

          <div className="welcome-actions">
            <button 
              onClick={onCreateProfile}
              className="btn btn-primary btn-start-chat"
            >
              <UserIcon size={20} />
              Créer le profil de mon chien
            </button>
            
            <button 
              onClick={onStartChat}
              className="btn btn-secondary btn-start-chat"
            >
              <MessageIcon size={20} />
              Chat rapide
            </button>
          </div>
        </div>

        {/* Fonctionnalités */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon chat-icon">
              <MessageIcon size={24} />
            </div>
            <h3 className="feature-title">Chat IA personnalisé</h3>
            <p className="feature-description">Conseils adaptés à votre chien et sa personnalité</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon esprit-icon">
              🎓
            </div>
            <h3 className="feature-title">Méthodes Esprit Dog</h3>
            <p className="feature-description">Éducation positive et bienveillante de Tony Silvestre</p>
            <button 
              className="btn btn-secondary btn-sm feature-button"
              onClick={onShowWeeklyChallenges}
            >
              Voir les défis
            </button>
          </div>

          <div className="feature-card">
            <div className="feature-icon paw-icon">
              <PawIcon size={24} />
            </div>
            <h3 className="feature-title">Suivi personnalisé</h3>
            <p className="feature-description">Accompagnement adapté à chaque étape</p>
            <button 
              className="btn btn-secondary btn-sm feature-button"
              onClick={onShowProgressJournal}
            >
              Voir le journal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard principal après connexion
const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [currentView, setCurrentView] = useState<'welcome' | 'profile' | 'chat'>('welcome');
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showProgressJournal, setShowProgressJournal] = useState(false);
  const [showWeeklyChallenges, setShowWeeklyChallenges] = useState(false);
  const [dogProfile, setDogProfile] = useState<DogProfile | null>(null);

  const handleSignOut = async () => {
    await signOut();
  };

  const handleProfileSubmit = (profile: DogProfile) => {
    setDogProfile(profile);
    setCurrentView('chat');
  };

  const calculateAge = (birthDate: string): string => {
    if (!birthDate) return '';
    
    const birth = new Date(birthDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birth.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} mois`;
    } else {
      const years = Math.floor(diffDays / 365);
      const remainingMonths = Math.floor((diffDays % 365) / 30);
      return `${years} an${years > 1 ? 's' : ''}${remainingMonths > 0 ? ` et ${remainingMonths} mois` : ''}`;
    }
  };

  if (currentView === 'profile') {
    return (
      <DogProfileForm 
        onSubmit={handleProfileSubmit}
        onSkip={() => setCurrentView('chat')}
      />
    );
  }

  if (currentView === 'chat') {
    return (
      <ChatPage 
        onBackClick={() => setCurrentView('welcome')}
        dogName={dogProfile?.name || 'votre chien'}
        breed={dogProfile?.breed || 'Chien'}
        age={dogProfile?.dateOfBirth ? calculateAge(dogProfile.dateOfBirth) : 'Âge non spécifié'}
      />
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
              onClick={() => setShowUserProfile(true)}
              className="btn btn-ghost btn-sm"
            >
              <UserIcon size={16} />
              Profil
            </button>
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
        <WelcomePage 
          onStartChat={() => setCurrentView('chat')}
          onCreateProfile={() => setCurrentView('profile')}
          onShowProgressJournal={() => setShowProgressJournal(true)}
          onShowWeeklyChallenges={() => setShowWeeklyChallenges(true)}
        />
      </main>
      
      {showUserProfile && (
        <UserProfile onClose={() => setShowUserProfile(false)} />
      )}
      
      {showProgressJournal && (
        <ProgressJournal 
          onClose={() => setShowProgressJournal(false)}
          dogName={dogProfile?.name || 'votre chien'}
        />
      )}
      
      {showWeeklyChallenges && (
        <WeeklyChallenges 
          onClose={() => setShowWeeklyChallenges(false)}
          dogName={dogProfile?.name || 'votre chien'}
        />
      )}
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

  return user ? (
    <SubscriptionProvider>
      <Dashboard />
    </SubscriptionProvider>
  ) : (
    <AuthForm />
  );
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