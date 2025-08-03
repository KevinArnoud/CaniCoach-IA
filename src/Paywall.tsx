// src/Paywall.tsx
import React from 'react';

export default function Paywall() {
  return (
    <div className="paywall-container">
      <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎯</div>
      
      <h2>Félicitations, vous êtes allé au fond du sujet !</h2>
      
      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px' }}>
        Vous avez exploré en profondeur votre première thématique avec CaniCoach IA. 
        Pour débloquer tous les autres sujets, gérer plusieurs profils de chiens et continuer à construire une relation parfaite, choisissez votre formule.
      </p>

      <div className="subscription-options">
        <div style={{ 
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
          color: 'white',
          padding: '20px',
          borderRadius: 'var(--border-radius-medium)',
          marginBottom: '16px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ 
            position: 'absolute', 
            top: '10px', 
            right: '12px', 
            background: 'var(--color-success)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '8px',
            fontSize: '0.7rem',
            fontWeight: '600'
          }}>
            POPULAIRE
          </div>
     
           <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>Abonnement Mensuel</h3>
          <div style={{ fontSize: '1.8rem', fontWeight: '700', margin: '8px 0' }}>
            9,99€<span style={{ fontSize: '0.9rem', fontWeight: '400' }}>/mois</span>
          </div>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: '12px 0',
            textAlign: 'left',
            fontSize: '0.85rem'
          }}>
            <li style={{ marginBottom: '6px' }}>✅ Conseils illimités</li>
            <li style={{ marginBottom: '6px' }}>✅ Jusqu'à 5 profils de chiens</li>
            <li style={{ marginBottom: '6px' }}>✅ Suivi personnalisé</li>
            <li style={{ marginBottom: '6px' }}>✅ Support prioritaire</li>
          </ul>
          <button 
            className="button" 
            style={{ 
              backgroundColor: 'white',
              color: 'var(--color-primary)',
              fontWeight: '700',
              boxShadow: 'none',
              border: 'none',
              fontSize: '0.9rem',
              padding: '10px 16px',
              margin: '0'
            }}
          >
            Commencer maintenant
          </button>
        </div>

        <div style={{ 
          border: '2px solid var(--color-border-light)',
          padding: '20px',
          borderRadius: 'var(--border-radius-medium)',
          backgroundColor: 'var(--color-card-background-light)'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: 'var(--color-text-dark)', fontSize: '1.1rem' }}>Abonnement Annuel</h3>
          <div style={{ 
            fontSize: '1.8rem',
            fontWeight: '700', 
            margin: '8px 0',
            color: 'var(--color-primary)'
          }}>
            99,99€<span style={{ fontSize: '0.9rem', fontWeight: '400' }}>/an</span>
          </div>
          <div style={{ 
            color: 'var(--color-success)',
            fontWeight: '600',
            marginBottom: '12px',
            fontSize: '0.85rem'
          }}>
            Économisez 17% ! (2 mois gratuits)
          </div>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: '12px 0',
            textAlign: 'left',
            color: 'var(--color-text-dark)',
            fontSize: '0.85rem'
          }}>
            <li style={{ marginBottom: '6px' }}>✅ Tout du plan mensuel</li>
            <li style={{ marginBottom: '6px' }}>✅ Profils chiens illimités</li>
            <li style={{ marginBottom: '6px' }}>✅ Analyses comportementales avancées</li>
            <li style={{ marginBottom: '6px' }}>✅ Accès aux masterclass exclusives</li>
          </ul>
          <button 
            className="button secondary"
            style={{
              fontSize: '0.9rem',
              padding: '10px 16px',
              margin: '0'
            }}
          >
            Souscrire annuel
          </button>
        </div>
      </div>

      <div style={{ 
        margin: '24px 0',
        padding: '16px',
        backgroundColor: 'var(--color-primary-light)',
        borderRadius: 'var(--border-radius-medium)',
        border: '1px solid var(--color-border-light)'
      }}>
        <h4 style={{ 
          margin: '0 0 8px 0', 
          color: 'var(--color-primary)',
          fontSize: '1rem'
        }}>
          🔒 Garantie satisfait ou remboursé 30 jours
        </h4>
        <p style={{ 
          margin: 0, 
          fontSize: '0.85rem',
          color: 'var(--color-text-medium)'
        }}>
          Vous pouvez annuler à tout moment. Aucun engagement.
        </p>
      </div>

      <p className="paywall-note" style={{ fontSize: '0.8rem' }}>
        💳 Paiement sécurisé via Stripe • 🇫🇷 Développé en France avec ❤️
      </p>
    </div>
  );
}