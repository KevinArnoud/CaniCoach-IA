// src/App.tsx - Version nettoyée
import { useState, useEffect } from 'react';
import { supabase } from './utils/supabaseClient';
import Auth from './Auth';
import Account from './Account';
import Chatbot from './Chatbot';
import Journal from './Journal';

export type AuthSession = Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session'];

export default function App() {
  const [session, setSession] = useState<AuthSession>(null);
  const [activeView, setActiveView] = useState<'chatbot' | 'account' | 'journal'>('chatbot');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const renderActiveView = () => {
    if (!session) return null;

    switch(activeView) {
      case 'account':
        return <Account key={session.user.id} session={session} />;
      case 'journal':
        return <Journal session={session} />;
      case 'chatbot':
      default:
        return <Chatbot session={session} onInteraction={() => {}} />; // onInteraction vide maintenant
    }
  };

  // 🎯 Fonction pour obtenir les stats locales (pour les boutons)
  const getLocalStats = () => {
    const interactions = parseInt(localStorage.getItem('canicoach_interactions') || '0');
    const problems = parseInt(localStorage.getItem('canicoach_problems_resolved') || '0');
    return { interactions, problems };
  };

  const stats = getLocalStats();

  return (
    <>
      {!session ? <Auth /> : (
        <div className="app-main-container">
          <div className="app-nav-buttons three-buttons">
            <button 
              onClick={() => setActiveView('chatbot')} 
              className={activeView === 'chatbot' ? 'active' : ''}
            >
              🎯 Coaching
              {stats.interactions > 0 && (
                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                  {stats.interactions} msg • {stats.problems} résolu
                </div>
              )}
            </button>
            <button 
              onClick={() => setActiveView('journal')} 
              className={activeView === 'journal' ? 'active' : ''}
            >
              📓 Journal
            </button>
            <button 
              onClick={() => setActiveView('account')} 
              className={activeView === 'account' ? 'active' : ''}
            >
              👤 Profil
            </button>
          </div>
          
          <div className="scrollable-content">
            {renderActiveView()}
          </div>

          {/* Bouton de debug pour la démo */}
          {session && (
            <div style={{ 
              padding: '12px 16px', 
              textAlign: 'center', 
              background: 'var(--color-card-background-light)', 
              borderTop: '1px solid var(--color-border-light)'
            }}>
              <button 
                onClick={() => {
                  localStorage.removeItem('canicoach_interactions');
                  localStorage.removeItem('canicoach_problems_resolved');
                  window.location.reload();
                }} 
                className="button secondary" 
                style={{ 
                  width: 'auto', 
                  padding: '8px 16px', 
                  fontSize: '0.8rem', 
                  margin: 0 
                }}
              >
                🔄 Reset Stats (Démo)
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}