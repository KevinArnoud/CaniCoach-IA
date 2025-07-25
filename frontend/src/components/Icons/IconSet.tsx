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
    <path 
      d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM8 7C8.55 7 9 7.45 9 8V10C9 10.55 8.55 11 8 11C7.45 11 7 10.55 7 10V8C7 7.45 7.45 7 8 7ZM16 7C16.55 7 17 7.45 17 8V10C17 10.55 16.55 11 16 11C15.45 11 15 10.55 15 10V8C15 7.45 15.45 7 16 7ZM12 8C14.21 8 16 9.79 16 12V16C16 18.21 14.21 20 12 20C9.79 20 8 18.21 8 16V12C8 9.79 9.79 8 12 8ZM10 13C10.55 13 11 13.45 11 14C11 14.55 10.55 15 10 15C9.45 15 9 14.55 9 14C9 13.45 9.45 13 10 13ZM14 13C14.55 13 15 13.45 15 14C15 14.55 14.55 15 14 15C13.45 15 13 14.55 13 14C13 13.45 13.45 13 14 13ZM12 16C12.55 16 13 16.45 13 17C13 17.55 12.55 18 12 18C11.45 18 11 17.55 11 17C11 16.45 11.45 16 12 16Z" 
      fill="currentColor"
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