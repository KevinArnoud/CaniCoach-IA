import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

function App() {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [backendStatus, setBackendStatus] = useState<string>('⏳ Vérification...')

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString('fr-FR'))
    
    // Test de connexion au backend
    fetch('/api/health')
      .then(res => res.json())
      .then(() => setBackendStatus('✅ Connecté'))
      .catch(() => setBackendStatus('⚠️ Déconnecté'))
  }, [])

  return (
    <>
      <div>
        <div className="logo-container">
          <h1 className="logo-text">🐕 CaniCoach IA</h1>
          <p className="tagline">Votre coach personnel pour l'éducation canine éthique</p>
          <p className="subtitle">Basé sur les méthodes d'éducation positive de Tony Silvestre (Esprit Dog)</p>
        </div>
      </div>
      
      <div className="card">
        <h2>🚀 Statut du Projet</h2>
        
        <div className="status-grid">
          <div className="status-item">
            <strong>Frontend React/TypeScript:</strong> 
            <span className="status-success">✅ Opérationnel</span>
          </div>
          
          <div className="status-item">
            <strong>Backend API:</strong> 
            <span className={backendStatus.includes('✅') ? 'status-success' : 'status-warning'}>
              {backendStatus}
            </span>
          </div>
          
          <div className="status-item">
            <strong>PWA (Progressive Web App):</strong> 
            <span className="status-success">✅ Configuré</span>
          </div>
          
          <div className="status-item">
            <strong>Supabase:</strong> 
            <span className={supabase ? 'status-warning' : 'status-error'}>
              {supabase ? '⚠️ Configuré (clés manquantes)' : '❌ À configurer'}
            </span>
          </div>

          <div className="status-item">
            <strong>Base de données:</strong> 
            <span className="status-pending">🔄 Migrations prêtes</span>
          </div>

          <div className="status-item">
            <strong>Dernière mise à jour:</strong> 
            <span className="status-info">{currentTime}</span>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3>🎯 Prochaines étapes de développement</h3>
        <div className="roadmap">
          <div className="roadmap-item completed">
            <span className="roadmap-icon">✅</span>
            <div>
              <strong>Infrastructure de base</strong>
              <p>React + TypeScript + Vite + PWA</p>
            </div>
          </div>
          
          <div className="roadmap-item next">
            <span className="roadmap-icon">🔄</span>
            <div>
              <strong>Configuration Supabase</strong>
              <p>Base de données et authentification</p>
            </div>
          </div>
          
          <div className="roadmap-item pending">
            <span className="roadmap-icon">⏳</span>
            <div>
              <strong>Interface de chat IA</strong>
              <p>Conversation avec CaniCoach</p>
            </div>
          </div>
          
          <div className="roadmap-item pending">
            <span className="roadmap-icon">⏳</span>
            <div>
              <strong>Gestion des profils chiens</strong>
              <p>Création et modification des profils</p>
            </div>
          </div>
          
          <div className="roadmap-item pending">
            <span className="roadmap-icon">⏳</span>
            <div>
              <strong>Système d'abonnement</strong>
              <p>Intégration Stripe et gestion des paiements</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card info-card">
        <h3>📋 Configuration requise</h3>
        <div className="config-steps">
          <p><strong>1.</strong> Créez un projet sur <a href="https://supabase.com" target="_blank">supabase.com</a></p>
          <p><strong>2.</strong> Copiez vos clés dans <code>frontend/.env</code> et <code>backend/.env</code></p>
          <p><strong>3.</strong> Exécutez les migrations SQL dans l'éditeur Supabase</p>
          <p><strong>4.</strong> Démarrez le backend avec <code>cd backend && npm run dev</code></p>
        </div>
      </div>
      
      <footer className="app-footer">
        <p>
          🎉 <strong>CaniCoach IA</strong> - Éducation canine éthique et bienveillante
          <br />
          <small>Développé avec ❤️ pour renforcer la relation humain-chien</small>
        </p>
      </footer>
    </>
  )
}

export default App