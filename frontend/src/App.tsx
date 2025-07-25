import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [apiStatus, setApiStatus] = useState<string>('Checking...')

  useEffect(() => {
    // Test API connection
    const testAPI = async () => {
      try {
        const response = await fetch('/api/health')
        if (response.ok) {
          const data = await response.json()
          setApiStatus(`✅ ${data.message}`)
        } else {
          setApiStatus('❌ API connection failed')
        }
      } catch (error) {
        setApiStatus('❌ API not reachable')
      } finally {
        setIsLoading(false)
      }
    }

    testAPI()
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
          <strong>Frontend React/TypeScript:</strong> ✅ Configuré
        </div>
        
        <div className="status-item">
          <strong>PWA (Progressive Web App):</strong> ✅ Configuré
        </div>
        
        <div className="status-item">
          <strong>Backend Node.js/Express:</strong> {isLoading ? '⏳ Vérification...' : apiStatus}
        </div>
        
        <div className="status-item">
          <strong>Supabase:</strong> {supabase ? '✅ Client configuré' : '⚠️ À configurer'}
        </div>
      </div>
      
      <p className="read-the-docs">
        Structure de base prête ! Prochaines étapes : configuration de Supabase et développement des fonctionnalités.
      </p>
    </>
  )
}

export default App
