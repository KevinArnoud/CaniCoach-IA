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
    viewBox="0 0 40 40" 
    fill="none" 
    className={className}
  >
    {/* Chien sportif moderne */}
    <circle cx="20" cy="20" r="18" fill="url(#logoGradient)" opacity="0.1"/>
    
    {/* Casquette sportive */}
    <path d="M8 14C8 10 12 8 20 8C28 8 32 10 32 14V16H8V14Z" fill="currentColor" opacity="0.9"/>
    <ellipse cx="20" cy="8" rx="14" ry="4" fill="currentColor" opacity="0.7"/>
    <path d="M6 16C6 15 7 14 8 14H32C33 14 34 15 34 16C34 17 33 18 32 18H8C7 18 6 17 6 16Z" fill="currentColor" opacity="0.8"/>
    
    {/* Tête de chien athlétique */}
    <ellipse cx="20" cy="18" rx="11" ry="9" fill="currentColor" opacity="0.15"/>
    <path 
      d="M20 10C25 10 29 12 29 16C29 19 28 21 26 23L24 25C23.2 25.8 22.8 25.8 22 25L20 22L18 25C17.2 25.8 16.8 25.8 16 25L14 23C12 21 11 19 11 16C11 12 15 10 20 10Z" 
      fill="currentColor"
    />
    
    {/* Oreilles dressées d'athlète */}
    <ellipse cx="13" cy="13" rx="3" ry="5" fill="currentColor" opacity="0.95" transform="rotate(-20 13 13)"/>
    <ellipse cx="27" cy="13" rx="3" ry="5" fill="currentColor" opacity="0.95" transform="rotate(20 27 13)"/>
    {/* Intérieur des oreilles */}
    <ellipse cx="13.5" cy="13.5" rx="1.5" ry="3" fill="currentColor" opacity="0.6" transform="rotate(-20 13.5 13.5)"/>
    <ellipse cx="26.5" cy="13.5" rx="1.5" ry="3" fill="currentColor" opacity="0.6" transform="rotate(20 26.5 13.5)"/>
    
    {/* Yeux déterminés de champion */}
    <circle cx="16" cy="17" r="2" fill="white"/>
    <circle cx="24" cy="17" r="2" fill="white"/>
    <circle cx="16" cy="17" r="1.2" fill="currentColor"/>
    <circle cx="24" cy="17" r="1.2" fill="currentColor"/>
    {/* Reflets déterminés */}
    <circle cx="16.5" cy="16.5" r="0.5" fill="white"/>
    <circle cx="24.5" cy="16.5" r="0.5" fill="white"/>
    
    {/* Museau d'athlète avec sourire confiant */}
    <ellipse cx="20" cy="20" rx="3.5" ry="3" fill="currentColor" opacity="0.8"/>
    {/* Truffe noire d'athlète */}
    <ellipse cx="20" cy="19.5" rx="1.5" ry="1.2" fill="currentColor"/>
    {/* Sourire confiant de sportif */}
    <path d="M16.5 21C17.5 22.5 18.5 23 20 23C21.5 23 22.5 22.5 23.5 21" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    {/* Langue d'athlète qui dépasse */}
    <ellipse cx="20" cy="23.5" rx="1.2" ry="0.8" fill="#ff6b9d" opacity="0.9"/>
    
    {/* Corps musclé d'athlète */}
    <path 
      d="M11 26C11 26 15 28 20 28C25 28 29 26 29 26V35C29 36.1 28.1 37 27 37H13C11.9 37 11 36.1 11 35V26Z" 
      fill="currentColor" 
      opacity="0.7"
    />
    
    {/* Pattes puissantes d'athlète */}
    <ellipse cx="15" cy="37" rx="2" ry="2.5" fill="currentColor" opacity="0.9"/>
    <ellipse cx="25" cy="37" rx="2" ry="2.5" fill="currentColor" opacity="0.9"/>
    
    {/* Queue dynamique de champion */}
    <path d="M29 28C31 27 33.5 26.5 35 29C36 30.5 35.2 32 33.5 32C31.5 32 30 30 29 28Z" fill="currentColor" opacity="0.8"/>
    
    {/* Médaille de champion */}
    <circle cx="20" cy="30" r="2.5" fill="#FFD700" opacity="0.9"/>
    <circle cx="20" cy="30" r="1.8" fill="#FFA500" opacity="0.95"/>
    <text x="20" y="31.5" textAnchor="middle" fontSize="2.5" fill="white" fontWeight="bold">🏆</text>
    
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