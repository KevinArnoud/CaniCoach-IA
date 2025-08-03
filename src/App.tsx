// src/App.tsx
import { useState, useEffect } from 'react';
import { supabase } from './utils/supabaseClient';
import Auth from './Auth';
import Account from './Account';
import Chatbot from './Chatbot';
import Paywall from './Paywall';
import Journal from './Journal';

export type AuthSession = Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session'];

const MAX_FREE_INTERACTIONS = 10;

export default function App() {
  const [session, setSession] = useState<AuthSession>(null);
  const [activeView, setActiveView] = useState<'chatbot' | 'account' | 'journal'>('chatbot');
  
  const [interactionCount, setInteractionCount] = useState<number>(() => {
    const savedCount = localStorage.getItem('canicoach_interaction_count');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });
  const [showPaywall, setShowPaywall] = useState(interactionCount >= MAX_FREE_INTERACTIONS);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === 'SIGNED_IN') resetFreeTrial();
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('canicoach_interaction_count', interactionCount.toString());
    if (interactionCount >= MAX_FREE_INTERACTIONS) {
      setShowPaywall(true);
    }
  }, [interactionCount]);

  const handleChatInteraction = () => {
    if (activeView === 'chatbot' && !showPaywall) {
      setInteractionCount(prevCount => prevCount + 1);
    }
  };
  
  const resetFreeTrial = () => {
    setInteractionCount(0);
    setShowPaywall(false);
  };
  
  // CORRECTION : On s'assure que chaque vue est bien dans un conteneur scrollable
  const renderActiveView = () => {
    if (!session) return null;

    let viewComponent;
    switch(activeView) {
      case 'account':
        viewComponent = <Account key={session.user.id} session={session} />;
        break;
      case 'journal':
        viewComponent = <Journal session={session} />;
        break;
      case 'chatbot':
      default:
        viewComponent = showPaywall 
          ? <Paywall />
          : <Chatbot session={session} onInteraction={handleChatInteraction} />;
        break;
    }
    return <div className="scrollable-content">{viewComponent}</div>;
  };

  return (
    <>
      {!session ? <Auth /> : (
        <div className="app-main-container">
          <div className="app-nav-buttons three-buttons">
            <button onClick={() => setActiveView('chatbot')} className={activeView === 'chatbot' ? 'active' : ''}>
              🎯 {MAX_FREE_INTERACTIONS - interactionCount > 0 ? `${MAX_FREE_INTERACTIONS - interactionCount} essais` : 'Essai terminé'}
            </button>
            <button onClick={() => setActiveView('journal')} className={activeView === 'journal' ? 'active' : ''}>
              📓 Journal
            </button>
            <button onClick={() => setActiveView('account')} className={activeView === 'account' ? 'active' : ''}>
              👤 Mon Profil
            </button>
          </div>
          
          {renderActiveView()}

          {session && (
            <div style={{ padding: '12px 16px', textAlign: 'center', background: 'var(--color-card-background-light)', borderTop: '1px solid var(--color-border-light)', flexShrink: 0 }}>
              <button onClick={resetFreeTrial} className="button secondary" style={{ width: 'auto', padding: '8px 16px', fontSize: '0.8rem', minHeight: 'auto', margin: 0 }}>
                🔄 Réinitialiser l'essai (Démo)
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}