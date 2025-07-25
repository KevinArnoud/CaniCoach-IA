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
    {/* Tête du chien stylisée */}
    <circle cx="12" cy="8" r="6" fill="currentColor" opacity="0.1"/>
    <path 
      d="M12 3C15.31 3 18 5.69 18 9C18 10.5 17.5 11.87 16.66 12.96L15.5 14.5C15.22 14.89 14.64 14.89 14.36 14.5L12 11.5L9.64 14.5C9.36 14.89 8.78 14.89 8.5 14.5L7.34 12.96C6.5 11.87 6 10.5 6 9C6 5.69 8.69 3 12 3Z" 
      fill="currentColor"
    />
    {/* Oreilles */}
    <ellipse cx="9" cy="6" rx="2" ry="3" fill="currentColor" opacity="0.8"/>
    <ellipse cx="15" cy="6" rx="2" ry="3" fill="currentColor" opacity="0.8"/>
    {/* Yeux */}
    <circle cx="10" cy="8" r="1" fill="white"/>
    <circle cx="14" cy="8" r="1" fill="white"/>
    {/* Museau */}
    <ellipse cx="12" cy="10" rx="1.5" ry="1" fill="currentColor" opacity="0.6"/>
    {/* Corps stylisé */}
    <path 
      d="M8 15C8 15 10 16 12 16C14 16 16 15 16 15V19C16 20.1 15.1 21 14 21H10C8.9 21 8 20.1 8 19V15Z" 
      fill="currentColor" 
      opacity="0.7"
    />
  </svg>
);

// Logo alternatif plus moderne
export const CaniCoachLogo: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
  >
    {/* Cercle de fond avec gradient */}
    <circle cx="16" cy="16" r="15" fill="url(#logoGradient)" opacity="0.1"/>
    
    {/* Forme principale du chien */}
    <path 
      d="M16 4C19.5 4 22.5 6.5 22.5 10C22.5 12 21.8 13.8 20.6 15.2L19 17.5C18.6 18 17.9 18 17.5 17.5L16 15L14.5 17.5C14.1 18 13.4 18 13 17.5L11.4 15.2C10.2 13.8 9.5 12 9.5 10C9.5 6.5 12.5 4 16 4Z" 
      fill="currentColor"
    />
    
    {/* Oreilles avec style moderne */}
    <path d="M12 7C12 5.5 13 4.5 14 5C14.5 5.2 15 6 15 7.5C15 9 14 10 13 9.5C12.2 9.1 12 8 12 7Z" fill="currentColor" opacity="0.9"/>
    <path d="M20 7C20 5.5 19 4.5 18 5C17.5 5.2 17 6 17 7.5C17 9 18 10 19 9.5C19.8 9.1 20 8 20 7Z" fill="currentColor" opacity="0.9"/>
    
    {/* Yeux expressifs */}
    <circle cx="13.5" cy="9" r="1.2" fill="white"/>
    <circle cx="18.5" cy="9" r="1.2" fill="white"/>
    <circle cx="13.5" cy="9" r="0.6" fill="currentColor"/>
    <circle cx="18.5" cy="9" r="0.6" fill="currentColor"/>
    
    {/* Museau souriant */}
    <ellipse cx="16" cy="11.5" rx="2" ry="1.2" fill="currentColor" opacity="0.7"/>
    <path d="M16 12.5C15.5 13 15.5 13.5 16 14C16.5 13.5 16.5 13 16 12.5Z" fill="white"/>
    
    {/* Corps stylisé */}
    <path 
      d="M11 18C11 18 13.5 19.5 16 19.5C18.5 19.5 21 18 21 18V25C21 26.7 19.7 28 18 28H14C12.3 28 11 26.7 11 25V18Z" 
      fill="currentColor" 
      opacity="0.6"
    />
    
    {/* Pattes */}
    <ellipse cx="13" cy="27" rx="1.5" ry="2" fill="currentColor" opacity="0.8"/>
    <ellipse cx="19" cy="27" rx="1.5" ry="2" fill="currentColor" opacity="0.8"/>
    
    {/* Définition du gradient */}
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.05"/>
      </linearGradient>
    </defs>
  </svg>
);

// Logo minimaliste et élégant
export const MinimalDogLogo: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    {/* Forme géométrique moderne */}
    <path 
      d="M12 2L18 8V16C18 19.31 15.31 22 12 22C8.69 22 6 19.31 6 16V8L12 2Z" 
      fill="currentColor" 
      opacity="0.1"
    />
    
    {/* Tête stylisée */}
    <path 
      d="M12 4L16 8V12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12V8L12 4Z" 
      fill="currentColor"
    />
    
    {/* Oreilles géométriques */}
    <path d="M9 6L12 4L11 7Z" fill="currentColor" opacity="0.8"/>
    <path d="M15 6L12 4L13 7Z" fill="currentColor" opacity="0.8"/>
    
    {/* Yeux minimalistes */}
    <circle cx="10.5" cy="10" r="0.8" fill="white"/>
    <circle cx="13.5" cy="10" r="0.8" fill="white"/>
    
    {/* Museau simple */}
    <path d="M12 12C11.5 12.5 11.5 13 12 13.5C12.5 13 12.5 12.5 12 12Z" fill="white"/>
    
    {/* Corps géométrique */}
    <path 
      d="M10 17V20C10 20.55 10.45 21 11 21H13C13.55 21 14 20.55 14 20V17H10Z" 
      fill="currentColor" 
      opacity="0.7"
    />
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