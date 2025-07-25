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
  const defaultEmoji = "🐕";
  
  return (
    <div className="dog-profile-header">
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

      <div className="header-main">
        <button className="back-button" onClick={onBackClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="header-title">
          <h1 className="app-name">CaniCoach IA</h1>
        </div>
        
        <div className="header-actions"></div>
      </div>

      <div className="dog-profile-section">
        <div className="dog-avatar">
          {photoUrl ? (
            <img src={photoUrl} alt={dogName} className="dog-photo" />
          ) : (
            <div className="dog-emoji">{defaultEmoji}</div>
          )}
        </div>
        
        <div className="dog-info">
          <h1 className="dog-name">{dogName}</h1>
          <p className="dog-details">{breed} • {age}</p>
        </div>
      </div>

      <div className="chat-header-mini">
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