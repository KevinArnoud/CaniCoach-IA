// src/Auth.tsx
import { useState } from 'react';
import { supabase } from './utils/supabaseClient';
import logo from './assets/logo-canicoach.png'; // <-- 1. IMPORTATION DU LOGO

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      alert(error.message);
    } else {
      alert('📧 Vérifiez votre email pour le lien de connexion !');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-widget">
        {/* Logo et titre */}
        <div style={{ marginBottom: '32px' }}>
          {/* 2. REMPLACEMENT DE L'EMOJI PAR LE LOGO */}
          <img src={logo} alt="Logo de CaniCoach IA" className="auth-logo" />
          <h1 style={{ marginTop: '16px' }}>CaniCoach</h1>
          <p className="description">
            Votre coach personnel pour l'éducation canine.<br/>
            Connectez-vous pour commencer votre parcours !
          </p>
        </div>

        {/* Connexion Google */}
        <button 
          className="button" 
          onClick={handleGoogleLogin} 
          disabled={loading}
          style={{
            background: 'linear-gradient(135deg, #4285f4 0%, #34a853 100%)', // Style Google conservé
            marginBottom: '20px'
          }}
        >
          {loading ? '⏳ Connexion...' : '🔑 Connexion avec Google'}
        </button>

        {/* Séparateur */}
        <div className="auth-divider">
          <span>ou</span>
        </div>

        {/* Connexion par email */}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Adresse email</label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button className="button" type="submit" disabled={loading || !email.trim()}>
            {loading ? '⏳ Envoi...' : '✉️ Envoyer le lien magique'}
          </button>
        </form>

        {/* Information complémentaire */}
        <div style={{ 
          marginTop: '24px', 
          padding: '16px', 
          backgroundColor: 'rgba(42, 77, 105, 0.05)', // Utilise une version light de notre primaire
          borderRadius: 'var(--border-radius-small)',
          border: '1px solid var(--color-border-light)'
        }}>
          <p style={{ 
            margin: 0, 
            fontSize: '0.85rem', 
            color: 'var(--color-text-medium)',
            lineHeight: 1.4
          }}>
            💡 <strong>Lien magique :</strong> Pas de mot de passe à retenir !<br/>
            Cliquez simplement sur le lien reçu par email.
          </p>
        </div>
      </div>
    </div>
  );
}