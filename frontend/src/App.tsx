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
          <strong>Interface utilisateur:</strong> ✅ Prête
        </div>
        
        <div className="status-item">
          <strong>Supabase:</strong> {supabase ? '✅ Client configuré' : '⚠️ À configurer'}
        </div>

        <div className="status-item">
          <strong>Dernière mise à jour:</strong> {currentTime}
        </div>

        <div className="status-item">
          <strong>🎨 Nouveau design:</strong> 🔄 En cours de création
        </div>
      </div>
      
      <div className="card">
        <h3>🎯 Prochaines étapes</h3>
        <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li>✅ Design system créé</li>
          <li>🔄 Création des composants d'authentification</li>
          <li>🔄 Interface de chat moderne</li>
          <li>🔄 Gestion des profils de chiens</li>
        </ul>
      </div>
      
      <p className="read-the-docs">
        🎉 On avance bien ! Le nouveau design arrive bientôt ! 
        <br />
        Basé sur les méthodes d'éducation positive de Tony Silvestre (Esprit Dog)
      </p>
    </>
  )
}

export default App