import React from 'react';
import { DogIcon, PawIcon } from '../Icons/IconSet';
import './PaywallModal.css';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (plan: 'monthly' | 'annual') => void;
  trialProblemsUsed: number;
  maxTrialProblems: number;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  onUpgrade,
  trialProblemsUsed,
  maxTrialProblems
}) => {
  if (!isOpen) return null;

  return (
    <div className="paywall-overlay">
      <div className="paywall-modal">
        {/* Header */}
        <div className="paywall-header">
          <div className="paywall-icon">
            <DogIcon size={48} />
          </div>
          <h2 className="paywall-title">
            Félicitations ! 🎉
          </h2>
          <p className="paywall-subtitle">
            Vous avez résolu votre premier problème avec CaniCoach IA !
            <br />
            Continuez votre parcours d'éducation canine bienveillante.
          </p>
        </div>

        {/* Progress */}
        <div className="trial-progress">
          <div className="progress-info">
            <span className="progress-text">
              Essai gratuit utilisé : {trialProblemsUsed}/{maxTrialProblems} problème
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(trialProblemsUsed / maxTrialProblems) * 100}%` }}
            />
          </div>
        </div>

        {/* Plans */}
        <div className="subscription-plans">
          <div className="plan-card plan-annual featured">
            <div className="plan-badge">Recommandé</div>
            <div className="plan-header">
              <h3 className="plan-name">Abonnement Annuel</h3>
              <div className="plan-price">
                <span className="price-amount">9,99€</span>
                <span className="price-period">/mois</span>
              </div>
              <div className="plan-savings">
                Économisez 2 mois !
              </div>
            </div>
            <ul className="plan-features">
              <li>✅ Accès illimité au chat IA</li>
              <li>✅ Profils multiples de chiens</li>
              <li>✅ Méthodes Esprit Dog complètes</li>
              <li>✅ Suivi personnalisé</li>
              <li>✅ Défis hebdomadaires</li>
              <li>✅ Journal de progrès</li>
            </ul>
            <button 
              className="btn btn-primary plan-button"
              onClick={() => onUpgrade('annual')}
            >
              Choisir l'annuel
            </button>
          </div>

          <div className="plan-card plan-monthly">
            <div className="plan-header">
              <h3 className="plan-name">Abonnement Mensuel</h3>
              <div className="plan-price">
                <span className="price-amount">11,99€</span>
                <span className="price-period">/mois</span>
              </div>
            </div>
            <ul className="plan-features">
              <li>✅ Accès illimité au chat IA</li>
              <li>✅ Profils multiples de chiens</li>
              <li>✅ Méthodes Esprit Dog complètes</li>
              <li>✅ Suivi personnalisé</li>
            </ul>
            <button 
              className="btn btn-secondary plan-button"
              onClick={() => onUpgrade('monthly')}
            >
              Choisir le mensuel
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="paywall-footer">
          <div className="trust-indicators">
            <div className="trust-item">
              <PawIcon size={20} />
              <span>Méthodes Esprit Dog certifiées</span>
            </div>
            <div className="trust-item">
              <span>🔒</span>
              <span>Paiement sécurisé</span>
            </div>
            <div className="trust-item">
              <span>↩️</span>
              <span>Résiliation facile</span>
            </div>
          </div>
          
          <p className="paywall-guarantee">
            💝 <strong>Garantie satisfait ou remboursé 30 jours</strong>
          </p>
        </div>
      </div>
    </div>
  );
};