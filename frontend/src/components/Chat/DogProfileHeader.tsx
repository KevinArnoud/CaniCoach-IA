import React from 'react';
import { ArrowLeftIcon, DogProfileIcon } from '../Icons/IconSet';
import './DogProfileHeader.css';

interface DogProfileHeaderProps {
  dogName: string;
  breed: string;
  age: string;
  photoUrl?: string;
  onBackClick?: () => void;
}

export const DogProfileHeader: React.FC<DogProfileHeaderProps> = React.memo(({
  dogName,
  breed,
  age,
  photoUrl,
  onBackClick
}) => {
  console.log('DogProfileHeader render - dogName:', dogName);
  
  return (
    <div className="dog-profile-header">
      {/* Header avec titre complet visible */}
      <div className="header-main">
        <button 
          className="back-button" 
          onClick={onBackClick}
          type="button"
        >
          <ArrowLeftIcon size={20} />
        </button>
        
        <div className="header-title">
          <span className="app-name">CaniCoach IA</span>
        </div>
        
        <div className="header-spacer"></div>
      </div>

      {/* Profil du chien */}
      <div className="dog-profile-section">
        <div className="dog-avatar">
          {photoUrl ? (
            <img src={photoUrl} alt={dogName} className="dog-photo" />
          ) : (
            <DogProfileIcon className="dog-icon-placeholder" />
          )}
        </div>
        
        <div className="dog-info">
          <h1 className="dog-name">{dogName}</h1>
          <p className="dog-details">{breed} • {age}</p>
        </div>
      </div>
    </div>
  );
});