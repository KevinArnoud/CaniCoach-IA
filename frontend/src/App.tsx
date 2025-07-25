import React, { useState, useEffect } from 'react';
import './App.css';

interface ServiceStatus {
  name: string;
  status: 'connected' | 'disconnected' | 'loading';
  description: string;
}

function App() {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: 'Frontend', status: 'connected', description: 'Interface utilisateur' },
    { name: 'Backend API', status: 'loading', description: 'Serveur Express' },
    { name: 'Supabase', status: 'disconnected', description: 'Base de données' },
    { name: 'Authentification', status: 'disconnected', description: 'Système de connexion' }
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulation du chargement initial
    setTimeout(() => setIsLoading(false), 2000);
    
    // Test de connexion au backend
    const testBackend = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/health');
        if (response.ok) {
          setServices(prev => prev.map(service => 
            service.name === 'Backend API' 
              ? { ...service, status: 'connected' }
              : service
          ));
        }
      } catch (error) {
        setServices(prev => prev.map(service => 
          service.name === 'Backend API' 
            ? { ...service, status: 'disconnected' }
            : service
        ));
      }
    };

    testBackend();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return '✅';
      case 'disconnected': return '❌';
      case 'loading': return '⏳';
      default: return '❓';
    }
  };

  const roadmapItems = [
    { step: 1, title: 'Infrastructure de base', status: 'completed', description: 'Frontend + Backend + Base de données' },
    { step: 2, title: 'Authentification utilisateur', status: 'in-progress', description: 'Inscription, connexion, profils' },
    { step: 3, title: 'Interface de chat IA', status: 'pending', description: 'Chat intelligent avec conseils personnalisés' },
    { step: 4, title: 'Gestion des profils chiens', status: 'pending', description: 'Fiches détaillées des compagnons' },
    { step: 5, title: 'Système d\'abonnement', status: 'pending', description: 'Intégration Stripe et plans premium' },
    { step: 6, title: 'Base de connaissance', status: 'pending', description: 'Méthodes Esprit Dog intégrées' }
  ];

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="logo-container">
            <span className="logo">🐕</span>
            <h1>CaniCoach IA</h1>
          </div>
          <div className="loading-spinner"></div>
          <p>Initialisation de votre coach canin intelligent...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <span className="logo">🐕</span>
            <div>
              <h1>CaniCoach IA</h1>
              <p className="tagline">Votre coach canin intelligent basé sur les méthodes Esprit Dog</p>
            </div>
          </div>
          <div className="status-badge">
            <span className="status-dot"></span>
            En développement
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="status-section">
          <h2>🔍 Statut des Services</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className={`service-card ${service.status}`}>
                <div className="service-header">
                  <span className="service-icon">{getStatusIcon(service.status)}</span>
                  <h3>{service.name}</h3>
                </div>
                <p>{service.description}</p>
                <div className="service-status">
                  {service.status === 'connected' && 'Opérationnel'}
                  {service.status === 'disconnected' && 'À configurer'}
                  {service.status === 'loading' && 'Connexion...'}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="roadmap-section">
          <h2>🗺️ Roadmap de Développement</h2>
          <div className="roadmap">
            {roadmapItems.map((item, index) => (
              <div key={index} className={`roadmap-item ${item.status}`}>
                <div className="step-number">{item.step}</div>
                <div className="step-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="step-status">
                    {item.status === 'completed' && '✅ Terminé'}
                    {item.status === 'in-progress' && '🔄 En cours'}
                    {item.status === 'pending' && '⏳ À venir'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="config-section">
          <h2>⚙️ Guide de Configuration</h2>
          <div className="config-steps">
            <div className="config-step">
              <h3>1. Créer un projet Supabase</h3>
              <p>Rendez-vous sur <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">supabase.com</a> et créez un nouveau projet</p>
            </div>
            <div className="config-step">
              <h3>2. Configurer les variables d'environnement</h3>
              <p>Ajoutez vos clés Supabase dans les fichiers <code>.env</code></p>
            </div>
            <div className="config-step">
              <h3>3. Exécuter les migrations</h3>
              <p>Utilisez l'éditeur SQL de Supabase pour créer les tables</p>
            </div>
            <div className="config-step">
              <h3>4. Démarrer le backend</h3>
              <p>Lancez <code>cd backend && npm run dev</code> dans un terminal séparé</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2024 CaniCoach IA - Propulsé par les méthodes Esprit Dog 🐾</p>
      </footer>
    </div>
  );
}

export default App;