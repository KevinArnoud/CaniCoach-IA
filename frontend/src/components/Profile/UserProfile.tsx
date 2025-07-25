import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { UserIcon, DogIcon, PawIcon } from '../Icons/IconSet';
import './UserProfile.css';

interface UserProfileProps {
  onClose: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { user, signOut } = useAuth();
  const { status, trialTopic, resetTrial } = useSubscription();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const getStatusText = () => {
    switch (status) {
      case 'free_trial':
        return 'Essai gratuit';
      case 'active_monthly':
        return 'Abonnement mensuel';
      case 'active_annual':
        return 'Abonnement annuel';
      case 'cancelled':
        return 'Abonnement annulé';
      default:
        return 'Statut inconnu';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active_monthly':
      case 'active_annual':
        return 'status-active';
      case 'free_trial':
        return 'status-trial';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-unknown';
    }
  };

  const getTopicDisplayName = (topic: string | null): string => {
    if (!topic) return 'Aucun sujet sélectionné';
    const topicNames: { [key: string]: string } = {
      'mordillements': 'Mordillements',
      'proprete': 'Propreté', 
      'aboiements': 'Aboiements',
      'socialisation': 'Socialisation',
      'general': 'Questions générales'
    };
    return topicNames[topic] || topic;
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const handleResetTrial = () => {
    resetTrial();
    setShowResetConfirm(false);
  };

  return (
    <div className="profile-overlay">
      <div className="profile-modal">
        {/* Header */}
        <div className="profile-header">
          <button className="close-button" onClick={onClose}>
            ×
          </button>
          <div className="profile-avatar">
            <UserIcon size={48} />
          </div>
          <h2 className="profile-title">Mon Profil</h2>
        </div>

        {/* User Info */}
        <div className="profile-section">
          <h3 className="section-title">Informations personnelles</h3>
          <div className="info-item">
            <span className="info-label">Email :</span>
            <span className="info-value">{user?.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Membre depuis :</span>
            <span className="info-value">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString('fr-FR') : 'Aujourd\'hui'}
            </span>
          </div>
        </div>

        {/* Subscription Status */}
        <div className="profile-section">
          <h3 className="section-title">Abonnement</h3>
          <div className="subscription-status">
            <div className={`status-badge ${getStatusColor()}`}>
              {getStatusText()}
            </div>
            
            {status === 'free_trial' && (
              <div className="trial-info">
                <div className="trial-topic-info">
                  <span className="trial-text">
                    Sujet d'essai : {getTopicDisplayName(trialTopic)}
                  </span>
                  {trialTopic && (
                    <p className="trial-note">
                      Vous pouvez poser des questions illimitées sur ce sujet. 
                      Pour débloquer tous les sujets, abonnez-vous !
                    </p>
                  )}
                  {!trialTopic && (
                    <p className="trial-note">
                      Posez votre première question pour commencer votre essai gratuit !
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Development Tools */}
        <div className="profile-section dev-section">
          <h3 className="section-title">
            <span>🛠️</span>
            Outils de développement
          </h3>
          <p className="dev-note">
            Ces outils sont disponibles uniquement en mode développement
          </p>
          
          <div className="dev-actions">
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setShowResetConfirm(true)}
            >
              <PawIcon size={16} />
              Réinitialiser l'essai gratuit
            </button>
          </div>

          {showResetConfirm && (
            <div className="confirm-dialog">
              <p>Êtes-vous sûr de vouloir réinitialiser votre essai gratuit ?</p>
              <div className="confirm-actions">
                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={() => setShowResetConfirm(false)}
                >
                  Annuler
                </button>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={handleResetTrial}
                >
                  Confirmer
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="profile-actions">
          <button 
            className="btn btn-ghost btn-full"
            onClick={handleSignOut}
          >
            Se déconnecter
          </button>
        </div>

        {/* Footer */}
        <div className="profile-footer">
          <div className="app-info">
            <DogIcon size={24} />
            <div>
              <div className="app-name">CaniCoach IA</div>
              <div className="app-version">Version 1.0.0 - Mode Développement</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};