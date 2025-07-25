import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CaniCoachLogo, UserIcon, LockIcon, MailIcon } from '../Icons/IconSet';

type AuthMode = 'signin' | 'signup' | 'reset';

export const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { signIn, signUp, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('AuthForm: handleSubmit appelé', { mode, email });
    
    if (!email.trim()) {
      setError('Veuillez saisir votre email');
      return;
    }
    
    if (mode !== 'reset' && !password.trim()) {
      setError('Veuillez saisir votre mot de passe');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      let result;
      
      switch (mode) {
        case 'signin':
          console.log('AuthForm: Tentative de connexion');
          result = await signIn(email, password);
          break;
          
        case 'signup':
          console.log('AuthForm: Tentative d\'inscription');
          result = await signUp(email, password);
          break;
          
        case 'reset':
          console.log('AuthForm: Tentative de reset');
          result = await resetPassword(email);
          if (!result.error) {
            setMessage('Email de réinitialisation envoyé !');
          }
          break;
      }

      if (result?.error) {
        console.error('AuthForm: Erreur résultat', result.error);
        setError('Erreur de connexion. Vérifiez vos identifiants.');
      } else {
        console.log('AuthForm: Succès');
      }
    } catch (err) {
      console.error('AuthForm: Erreur catch', err);
      setError('Une erreur inattendue s\'est produite');
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'signin': return 'Connexion';
      case 'signup': return 'Inscription';
      case 'reset': return 'Réinitialiser le mot de passe';
    }
  };

  const getButtonText = () => {
    if (loading) return 'Chargement...';
    switch (mode) {
      case 'signin': return 'Se connecter';
      case 'signup': return 'S\'inscrire';
      case 'reset': return 'Envoyer le lien';
    }
  };

  console.log('AuthForm render - mode:', mode, 'loading:', loading);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-container">
            <CaniCoachLogo className="logo-icon" />
            <div className="logo-text">
              <span className="logo-cani">Cani</span>
              <span className="logo-coach">Coach</span>
            </div>
          </div>
          <h2 className="auth-title">{getTitle()}</h2>
          <p className="auth-subtitle">
            {mode === 'signin' && 'Accédez à votre espace personnel (Mode développement)'}
            {mode === 'signup' && 'Créez votre compte pour commencer'}
            {mode === 'reset' && 'Nous vous enverrons un lien de réinitialisation'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <MailIcon className="label-icon" />
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="votre@email.com"
              className="form-input"
              autoComplete="email"
            />
          </div>

          {mode !== 'reset' && (
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <LockIcon className="label-icon" />
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                minLength={6}
                className="form-input"
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              />
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              <span className="alert-text">{error}</span>
            </div>
          )}
          
          {message && (
            <div className="alert alert-success">
              <span className="alert-text">{message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary btn-full ${loading ? 'btn-loading' : ''}`}
          >
            {loading && <div className="spinner" />}
            {getButtonText()}
          </button>
        </form>

        <div className="auth-links">
          {mode === 'signin' && (
            <>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                  setMessage('');
                }}
                className="link-button"
              >
                Pas encore de compte ? <strong>S'inscrire</strong>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('reset');
                  setError('');
                  setMessage('');
                }}
                className="link-button link-subtle"
              >
                Mot de passe oublié ?
              </button>
            </>
          )}

          {mode === 'signup' && (
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setError('');
                setMessage('');
              }}
              className="link-button"
            >
              Déjà un compte ? <strong>Se connecter</strong>
            </button>
          )}

          {mode === 'reset' && (
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setError('');
                setMessage('');
              }}
              className="link-button"
            >
              ← Retour à la connexion
            </button>
          )}
        </div>

        <div className="auth-footer">
          <p className="footer-text">
            <strong>Mode développement :</strong> Utilisez n'importe quel email/mot de passe
          </p>
        </div>
      </div>
    </div>
  );
};