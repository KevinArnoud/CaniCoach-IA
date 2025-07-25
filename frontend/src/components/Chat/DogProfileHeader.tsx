import React from 'react';
import './DogProfileHeader.css';

interface DogProfileHeaderProps {
  dogName: string;
  breed: string;
  age: string;
  photoUrl?: string;
  onBackClick?: () => void;
}

export const DogProfileHeader: React.FC<DogProfileHeaderProps> = ({
  dogName,
  breed,
  age,
  photoUrl,
  onBackClick
}) => {
  // Emoji par défaut si pas de photo
  const defaultEmoji = "🐕";
  
  return (
    <div className="dog-profile-header">
      {/* Barre de statut et navigation */}
      <div className="status-bar">
        <div className="status-left">
          <span className="time">9:41</span>
        </div>
        <div className="status-center">
          <div className="notch"></div>
        </div>
        <div className="status-right">
          <div className="signal-bars">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <div className="wifi-icon">📶</div>
          <div className="battery">🔋</div>
        </div>
      </div>

      {/* Header principal */}
      <div className="header-main">
        <button className="back-button" onClick={onBackClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="header-title">
          <span className="app-name">CaniCoach IA</span>
        </div>
        
        <div className="header-actions">
          {/* Espace pour futurs boutons */}
        </div>
      </div>

      {/* Profil du chien */}
      <div className="dog-profile-main">
        <div className="dog-avatar-large">
          {photoUrl ? (
            <img src={photoUrl} alt={dogName} className="dog-photo-large" />
          ) : (
            <div className="dog-emoji-large">{defaultEmoji}</div>
          )}
        </div>
        
        <div className="dog-info-main">
          <h1 className="dog-name-large">{dogName}</h1>
          <p className="dog-details">{breed} • {age}</p>
        </div>
      </div>

      {/* Mini profil pour le chat */}
      <div className="dog-profile-mini">
        <div className="dog-avatar-mini">
          {photoUrl ? (
            <img src={photoUrl} alt={dogName} className="dog-photo-mini" />
          ) : (
            <div className="dog-emoji-mini">{defaultEmoji}</div>
          )}
        </div>
        
        <div className="dog-info-mini">
          <span className="dog-name-mini">{dogName}, {breed}</span>
          <span className="dog-age-mini">{age}</span>
        </div>
      </div>
    </div>
  );
};