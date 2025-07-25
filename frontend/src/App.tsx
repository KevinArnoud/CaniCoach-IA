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
                fontSize: '1.1rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #007AFF, #0056CC)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              🚀 Tester le nouveau design Chat
            </button>
          </div>
          
          <div className="status-grid">
            <div className="status-card">
              <h3>🔐 Authentification</h3>
              <span className="status-success">✅ Connecté</span>
            </div>
            
            <div className="status-card">
              <h3>🎨 Nouveau Design</h3>
              <span className="status-success">✅ Prêt à tester</span>
            </div>
            
            <div className="status-card">
              <h3>💬 Chat IA</h3>
              <span className="status-pending">🔄 Interface créée</span>
            </div>
            
            <div className="status-card">
              <h3>🐕 Profils chiens</h3>
              <span className="status-pending">🔄 À développer</span>
            </div>
          </div>

          <div className="next-steps">
            <h3>🎯 Nouveau design disponible !</h3>
            <ul>
              <li>✅ Interface de chat moderne style iPhone</li>
              <li>✅ Header avec profil du chien</li>
              <li>✅ Messages avec bulles</li>
              <li>✅ Design responsive et animé</li>
              <li>🔄 Prochaine étape : vraie IA</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

// Composant pour gérer l'état d'authentification
const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <h2>🐕 CaniCoach IA</h2>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return user ? <Dashboard /> : <AuthForm />;
};

// App principale avec provider
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;