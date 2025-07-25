// Icônes professionnelles style Esprit Dog - Pas d'emojis !

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Logo principal - Style moderne et pro
export const DogIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    {/* Tête du chien plus reconnaissable */}
    <ellipse cx="12" cy="10" rx="7" ry="6" fill="currentColor" opacity="0.15"/>
    <path 
      d="M12 4C15.31 4 18 6.69 18 10C18 11.5 17.5 12.87 16.66 13.96L15.5 15.5C15.22 15.89 14.64 15.89 14.36 15.5L12 12.5L9.64 15.5C9.36 15.89 8.78 15.89 8.5 15.5L7.34 13.96C6.5 12.87 6 11.5 6 10C6 6.69 8.69 4 12 4Z" 
      fill="currentColor"
    />
    {/* Oreilles tombantes plus réalistes */}
    <ellipse cx="8.5" cy="7" rx="2.5" ry="4" fill="currentColor" opacity="0.9" transform="rotate(-20 8.5 7)"/>
    <ellipse cx="15.5" cy="7" rx="2.5" ry="4" fill="currentColor" opacity="0.9" transform="rotate(20 15.5 7)"/>
    {/* Yeux */}
    <circle cx="10" cy="9" r="1.2" fill="white"/>
    <circle cx="14" cy="9" r="1.2" fill="white"/>
    <circle cx="10" cy="9" r="0.6" fill="currentColor"/>
    <circle cx="14" cy="9" r="0.6" fill="currentColor"/>
    {/* Museau avec truffe */}
    <ellipse cx="12" cy="11.5" rx="2" ry="1.5" fill="currentColor" opacity="0.7"/>
    <ellipse cx="12" cy="11" rx="0.8" ry="0.6" fill="currentColor"/>
    {/* Bouche souriante */}
    <path d="M10.5 12.5C11 13 11.5 13.2 12 13.2C12.5 13.2 13 13 13.5 12.5" stroke="currentColor" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
    {/* Corps stylisé */}
    <path 
      d="M8 16C8 16 10 17 12 17C14 17 16 16 16 16V20C16 21.1 15.1 22 14 22H10C8.9 22 8 21.1 8 20V16Z" 
      fill="currentColor" 
      opacity="0.7"
    />
    {/* Queue qui remue */}
    <path d="M16.5 18C17 17.5 17.8 17.2 18.5 17.8C19 18.2 18.8 19 18.2 19.2C17.5 19.5 16.8 19 16.5 18Z" fill="currentColor" opacity="0.8"/>
  </svg>
);

// Logo principal CaniCoach - Chien très reconnaissable
export const CaniCoachLogo: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
  >
    {/* Chien réaliste moderne */}
    <circle cx="16" cy="16" r="15" fill="url(#logoGradient)" opacity="0.08"/>
    
    {/* Tête de chien réaliste */}
    <ellipse cx="16" cy="14" rx="8" ry="7" fill="currentColor" opacity="0.15"/>
    <path 
      d="M16 8C20.5 8 24 10.5 24 14C24 16.5 23 18.5 21.5 20L20 21.5C19.5 22 19 22 18.5 21.5L16 18.5L13.5 21.5C13 22 12.5 22 12 21.5L10.5 20C9 18.5 8 16.5 8 14C8 10.5 11.5 8 16 8Z" 
      fill="currentColor"
    />
    
    {/* Oreilles tombantes réalistes */}
    <ellipse cx="11" cy="11" rx="2.5" ry="4.5" fill="currentColor" opacity="0.95" transform="rotate(-25 11 11)"/>
    <ellipse cx="21" cy="11" rx="2.5" ry="4.5" fill="currentColor" opacity="0.95" transform="rotate(25 21 11)"/>
    {/* Intérieur des oreilles rose */}
    <ellipse cx="11.5" cy="11.5" rx="1.2" ry="2.8" fill="#ff9999" opacity="0.7" transform="rotate(-25 11.5 11.5)"/>
    <ellipse cx="20.5" cy="11.5" rx="1.2" ry="2.8" fill="#ff9999" opacity="0.7" transform="rotate(25 20.5 11.5)"/>
    
    {/* Yeux expressifs et réalistes */}
    <ellipse cx="13" cy="13.5" rx="1.8" ry="2.2" fill="white"/>
    <ellipse cx="19" cy="13.5" rx="1.8" ry="2.2" fill="white"/>
    {/* Pupilles noires */}
    <ellipse cx="13" cy="14" rx="1.2" ry="1.5" fill="currentColor"/>
    <ellipse cx="19" cy="14" rx="1.2" ry="1.5" fill="currentColor"/>
    {/* Reflets dans les yeux */}
    <ellipse cx="13.5" cy="13.2" rx="0.4" ry="0.6" fill="white"/>
    <ellipse cx="19.5" cy="13.2" rx="0.4" ry="0.6" fill="white"/>
    {/* Petits reflets secondaires */}
    <circle cx="12.7" cy="14.5" r="0.2" fill="white" opacity="0.8"/>
    <circle cx="18.7" cy="14.5" r="0.2" fill="white" opacity="0.8"/>
    
    {/* Museau réaliste avec volume */}
    <ellipse cx="16" cy="17" rx="3" ry="2.5" fill="currentColor" opacity="0.8"/>
    <ellipse cx="16" cy="16.5" rx="2.2" ry="1.8" fill="currentColor" opacity="0.9"/>
    
    {/* Truffe noire réaliste */}
    <ellipse cx="16" cy="16" rx="1.2" ry="1" fill="currentColor"/>
    {/* Reflet sur la truffe */}
    <ellipse cx="15.7" cy="15.7" rx="0.3" ry="0.2" fill="white" opacity="0.6"/>
    
    {/* Ligne du museau */}
    <path d="M16 16.8L16 18.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
    
    {/* Bouche souriante réaliste */}
    <path d="M13.5 18.5C14.5 19.5 15.2 19.8 16 19.8C16.8 19.8 17.5 19.5 18.5 18.5" 
          stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"/>
    
    {/* Langue rose qui dépasse légèrement */}
    <ellipse cx="16" cy="20" rx="0.8" ry="0.5" fill="#ff9999" opacity="0.9"/>
    
    {/* Corps simple mais proportionné */}
    <ellipse cx="16" cy="24" rx="6" ry="4" fill="currentColor" opacity="0.7"/>
    
    {/* Pattes avant */}
    <ellipse cx="13" cy="27" rx="1.2" ry="2" fill="currentColor" opacity="0.8"/>
    <ellipse cx="19" cy="27" rx="1.2" ry="2" fill="currentColor" opacity="0.8"/>
    
    {/* Queue qui remue */}
    <path d="M22 22C23.5 21.5 25 21.8 25.5 23.5C25.8 24.5 25.2 25.2 24.2 25C23 24.7 22.2 23.2 22 22Z" 
          fill="currentColor" opacity="0.8"/>
    
    {/* Collier simple */}
    <ellipse cx="16" cy="21" rx="7" ry="1" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
    <circle cx="16" cy="20.2" r="0.8" fill="currentColor" opacity="0.7"/>
    
    {/* Définition du gradient */}
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.05"/>
      </linearGradient>
    </defs>
  </svg>
);

// Logo alternatif minimaliste
export const MinimalDogLogo: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    {/* Silhouette de chien simple mais reconnaissable */}
    <circle cx="12" cy="8" r="5" fill="currentColor" opacity="0.1"/>
    <circle cx="12" cy="8" r="4" fill="currentColor"/>
    {/* Oreilles simples */}
    <circle cx="9" cy="6" r="2" fill="currentColor" opacity="0.8"/>
    <circle cx="15" cy="6" r="2" fill="currentColor" opacity="0.8"/>
    {/* Yeux */}
    <circle cx="10.5" cy="8" r="0.5" fill="white"/>
    <circle cx="13.5" cy="8" r="0.5" fill="white"/>
    {/* Museau */}
    <circle cx="12" cy="10" r="1" fill="currentColor" opacity="0.6"/>
    {/* Corps simple */}
    <rect x="10" y="12" width="4" height="8" rx="2" fill="currentColor" opacity="0.7"/>
    {/* Pattes */}
    <circle cx="11" cy="20" r="1" fill="currentColor" opacity="0.8"/>
    <circle cx="13" cy="20" r="1" fill="currentColor" opacity="0.8"/>
    {/* Queue */}
    <circle cx="15" cy="16" r="1.5" fill="currentColor" opacity="0.6"/>
  </svg>
);
// Icône utilisateur moderne
export const UserIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13 3V5L11 7V9H3V11H21V9Z" 
      fill="currentColor"
    />
    <circle cx="12" cy="8" r="4" fill="currentColor"/>
    <path d="M4 18C4 15.79 7.58 14 12 14S20 15.79 20 18V20H4V18Z" fill="currentColor"/>
  </svg>
);

// Icône email élégante
export const MailIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Icône cadenas sécurisé
export const LockIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <rect x="3" y="11" width="18" height="10" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="16" r="1" fill="currentColor"/>
    <path d="M7 11V7A5 5 0 0 1 17 7V11" fill="none" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

// Icône message professionnel
export const MessageIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Icône envoi moderne
export const SendIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Icône patte stylisée (pour remplacer emoji)
export const PawIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    {/* Icône moderne de suivi/progression */}
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.2"/>
    
    {/* Indicateurs de progression autour */}
    <circle cx="12" cy="4" r="1.5" fill="currentColor" opacity="0.6"/>
    <circle cx="18.36" cy="7.64" r="1.5" fill="currentColor" opacity="0.7"/>
    <circle cx="18.36" cy="16.36" r="1.5" fill="currentColor" opacity="0.8"/>
    <circle cx="12" cy="20" r="1.5" fill="currentColor" opacity="0.9"/>
    <circle cx="5.64" cy="16.36" r="1.5" fill="currentColor" opacity="0.8"/>
    <circle cx="5.64" cy="7.64" r="1.5" fill="currentColor" opacity="0.7"/>
  </svg>
);

// Icône retour élégant
export const ArrowLeftIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M19 12H5M12 19L5 12L12 5" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Icône profil chien stylisé
export const DogProfileIcon: React.FC<IconProps> = ({ className = '', size = 40 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 40 40" 
    fill="none" 
    className={className}
  >
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1"/>
    <path 
      d="M20 10C22.21 10 24 11.79 24 14C24 16.21 22.21 18 20 18C17.79 18 16 16.21 16 14C16 11.79 17.79 10 20 10ZM14 16C14.55 16 15 16.45 15 17V19C15 19.55 14.55 20 14 20C13.45 20 13 19.55 13 19V17C13 16.45 13.45 16 14 16ZM26 16C26.55 16 27 16.45 27 17V19C27 19.55 26.55 20 26 20C25.45 20 25 19.55 25 19V17C25 16.45 25.45 16 26 16ZM20 19C23.31 19 26 21.69 26 25V28C26 29.1 25.1 30 24 30H16C14.9 30 14 29.1 14 28V25C14 21.69 16.69 19 20 19Z" 
      fill="currentColor"
    />
  </svg>
);