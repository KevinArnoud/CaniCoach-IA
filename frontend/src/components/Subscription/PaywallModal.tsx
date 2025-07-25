import React from 'react';
import { DogIcon, PawIcon } from '../Icons/IconSet';
import './PaywallModal.css';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (plan: 'monthly' | 'annual') => void;
  currentTopic: string | null;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  onUpgrade,
  currentTopic
}) => {
  if (!isOpen) return null;

  const getTopicDisplayName = (topic: string | null): string => {
    if (!topic) return 'votre premier sujet';
    const topicNames: { [key: string]: string } = {
      'mordillements': 'les mordillements',
      'proprete': 'la propreté',
      'aboiements': 'les aboiements',
      'socialisation': 'la socialisation',
      'general': 'les questions générales'
    };
    return topicNames[topic] || topic;
  };
  return (
    <div className="paywall-overlay">
      <div className="paywall-modal">
        {/* Header */}
        <div className="paywall-header">
          <div className="paywall-icon">
            <DogIcon size={48} />
          </div>
          <h2 className="paywall-title">
            Nouveau sujet détecté ! 🎯
          </h2>
          <p className="paywall-subtitle">
            Vous avez exploré {getTopicDisplayName(currentTopic)} avec succès !
            <br />
            Pour débloquer tous les sujets, choisissez votre abonnement.
          </p>
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