import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

function App() {
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString('fr-FR'))
  }, [])

  return (
    <>
      <div>
        <div className="logo-container">
          <h1 className="logo-text">🐕 CaniCoach IA</h1>
          <p className="tagline">Votre coach personnel pour l'éducation canine éthique</p>
        </div>
      </div>
      
      <div className="card">
        <h2>🚀 Statut du Projet</h2>
        
        <div className="status-item">
          <strong>Frontend React/TypeScript:</strong> ✅ Opérationnel
        </div>
        
        <div className="status-item">
          <strong>PWA (Progressive Web App):</strong> ✅ Configuré
        </div>
        
        <div className="status-item">
          <strong>Interface utilisateur:</strong> ✅ Prête
        </div>
        
        <div className="status-item">
          <strong>Supabase:</strong> {supabase ? '✅ Client configuré' : '⚠️ À configurer'}
        </div>

        <div className="status-item">
          <strong>Dernière mise à jour:</strong> {currentTime}
        </div>
      </div>
      
      <div className="card">
        <h3>🎯 Prochaines étapes</h3>
        <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li>Configuration de la base de données Supabase</li>
          <li>Système d'authentification utilisateur</li>
          <li>Interface de chat avec l'IA</li>
          <li>Gestion des profils de chiens</li>
          <li>Système d'abonnement</li>
        </ul>
      </div>
      
      <p className="read-the-docs">
        🎉 Votre application CaniCoach IA est maintenant fonctionnelle ! 
        <br />
        Basée sur les méthodes d'éducation positive de Tony Silvestre (Esprit Dog)
      </p>
    </>
  )
}

export default App