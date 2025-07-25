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
    {/* Fond avec gradient */}
    <circle cx="16" cy="16" r="15" fill="url(#logoGradient)" opacity="0.08"/>
    
    {/* Tête de chien très reconnaissable */}
    <ellipse cx="16" cy="14" rx="9" ry="7" fill="currentColor" opacity="0.1"/>
    <path 
      d="M16 6C20 6 23 8.5 23 12C23 14 22.2 15.8 20.8 17L19 19C18.5 19.5 17.8 19.5 17.3 19L16 17L14.7 19C14.2 19.5 13.5 19.5 13 19L11.2 17C9.8 15.8 9 14 9 12C9 8.5 12 6 16 6Z" 
      fill="currentColor"
    />
    
    {/* Oreilles tombantes très reconnaissables */}
    <ellipse cx="11" cy="10" rx="3" ry="5" fill="currentColor" opacity="0.95" transform="rotate(-25 11 10)"/>
    <ellipse cx="21" cy="10" rx="3" ry="5" fill="currentColor" opacity="0.95" transform="rotate(25 21 10)"/>
    {/* Intérieur des oreilles */}
    <ellipse cx="11.5" cy="10.5" rx="1.5" ry="3" fill="currentColor" opacity="0.6" transform="rotate(-25 11.5 10.5)"/>
    <ellipse cx="20.5" cy="10.5" rx="1.5" ry="3" fill="currentColor" opacity="0.6" transform="rotate(25 20.5 10.5)"/>
    
    {/* Yeux expressifs et amicaux */}
    <circle cx="13" cy="12" r="1.5" fill="white"/>
    <circle cx="19" cy="12" r="1.5" fill="white"/>
    <circle cx="13" cy="12" r="0.8" fill="currentColor"/>
    <circle cx="19" cy="12" r="0.8" fill="currentColor"/>
    {/* Reflets dans les yeux */}
    <circle cx="13.3" cy="11.7" r="0.3" fill="white"/>
    <circle cx="19.3" cy="11.7" r="0.3" fill="white"/>
    
    {/* Museau proéminent */}
    <ellipse cx="16" cy="15" rx="2.5" ry="2" fill="currentColor" opacity="0.8"/>
    {/* Truffe noire */}
    <ellipse cx="16" cy="14.5" rx="1" ry="0.8" fill="currentColor"/>
    {/* Bouche souriante */}
    <path d="M14 16C15 17 16 17.2 16 17.2C16 17.2 17 17 18 16" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"/>
    {/* Langue qui dépasse légèrement */}
    <ellipse cx="16" cy="17.5" rx="0.8" ry="0.4" fill="#ff6b9d" opacity="0.8"/>
    
    {/* Corps stylisé */}
    <path 
      d="M10 20C10 20 13 21.5 16 21.5C19 21.5 22 20 22 20V26C22 27.1 21.1 28 20 28H12C10.9 28 10 27.1 10 26V20Z" 
      fill="currentColor" 
      opacity="0.7"
    />
    
    {/* Pattes avant */}
    <ellipse cx="13" cy="28" rx="1.2" ry="1.5" fill="currentColor" opacity="0.9"/>
    <ellipse cx="19" cy="28" rx="1.2" ry="1.5" fill="currentColor" opacity="0.9"/>
    
    {/* Queue qui remue */}
    <path d="M22 22C23 21 24.5 20.5 25.5 22C26 22.8 25.5 24 24.5 24C23.2 24 22.5 23 22 22Z" fill="currentColor" opacity="0.8"/>
    
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
    <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M8.5 7C9.33 7 10 7.67 10 8.5S9.33 10 8.5 10 7 9.33 7 8.5 7.67 7 8.5 7M15.5 7C16.33 7 17 7.67 17 8.5S16.33 10 15.5 10 14 9.33 14 8.5 14.67 7 15.5 7M12 8.5C12.83 8.5 13.5 9.17 13.5 10S12.83 11.5 12 11.5 10.5 10.83 10.5 10 11.17 8.5 12 8.5M9.5 11.5C10.33 11.5 11 12.17 11 13S10.33 14.5 9.5 14.5 8 13.83 8 13 8.67 11.5 9.5 11.5M14.5 11.5C15.33 11.5 16 12.17 16 13S15.33 14.5 14.5 14.5 13 13.83 13 13 13.67 11.5 14.5 11.5M12 13C13.1 13 14 13.9 14 15S13.1 17 12 17 10 16.1 10 15 10.9 13 12 13Z"/>
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