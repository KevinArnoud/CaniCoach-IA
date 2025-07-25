import React, { useState } from 'react';
import { DogIcon, UserIcon } from '../Icons/IconSet';
import './DogProfileForm.css';

interface DogProfile {
  name: string;
  breed: string;
  dateOfBirth: string;
  background: string;
  healthIssues: string;
  photoUrl?: string;
}

interface DogProfileFormProps {
  onSubmit: (profile: DogProfile) => void;
  onSkip?: () => void;
  initialData?: Partial<DogProfile>;
}

export const DogProfileForm: React.FC<DogProfileFormProps> = ({ 
  onSubmit, 
  onSkip,
  initialData 
}) => {
  const [profile, setProfile] = useState<DogProfile>({
    name: initialData?.name || '',
    breed: initialData?.breed || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    background: initialData?.background || '',
    healthIssues: initialData?.healthIssues || '',
    photoUrl: initialData?.photoUrl || ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleInputChange = (field: keyof DogProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      onSubmit(profile);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return profile.name.trim().length > 0;
      case 2: return profile.breed.trim().length > 0;
      case 3: return profile.dateOfBirth.length > 0;
      case 4: return true; // Optionnel
      default: return false;
    }
  };

  const calculateAge = (birthDate: string): string => {
    if (!birthDate) return '';
    
    const birth = new Date(birthDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birth.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} mois`;
    } else {
      const years = Math.floor(diffDays / 365);
      const remainingMonths = Math.floor((diffDays % 365) / 30);
      return `${years} an${years > 1 ? 's' : ''}${remainingMonths > 0 ? ` et ${remainingMonths} mois` : ''}`;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <div className="step-header">
              <DogIcon size={48} className="step-icon" />
              <h2 className="step-title">Comment s'appelle votre compagnon ?</h2>
              <p className="step-description">
                Donnez-nous le nom de votre chien pour personnaliser nos conseils
              </p>
            </div>
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <UserIcon className="label-icon" />
                Nom du chien
              </label>
              <input
                id="name"
                type="text"
                value={profile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ex: Rocky, Luna, Max..."
                className="form-input"
                autoFocus
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <div className="step-header">
              <DogIcon size={48} className="step-icon" />
              <h2 className="step-title">Quelle est sa race ?</h2>
              <p className="step-description">
                Connaître la race nous aide à adapter nos conseils aux spécificités de {profile.name}
              </p>
            </div>
            
            <div className="form-group">
              <label htmlFor="breed" className="form-label">
                Race ou croisement
              </label>
              <input
                id="breed"
                type="text"
                value={profile.breed}
                onChange={(e) => handleInputChange('breed', e.target.value)}
                placeholder="Ex: Berger Australien, Croisé Labrador, Bâtard..."
                className="form-input"
                autoFocus
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <div className="step-header">
              <DogIcon size={48} className="step-icon" />
              <h2 className="step-title">Quel âge a {profile.name} ?</h2>
              <p className="step-description">
                L'âge est crucial pour adapter nos méthodes d'éducation
              </p>
            </div>
            
            <div className="form-group">
              <label htmlFor="dateOfBirth" className="form-label">
                Date de naissance
              </label>
              <input
                id="dateOfBirth"
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="form-input"
                autoFocus
              />
              {profile.dateOfBirth && (
                <div className="age-display">
                  {profile.name} a {calculateAge(profile.dateOfBirth)}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-step">
            <div className="step-header">
              <DogIcon size={48} className="step-icon" />
              <h2 className="step-title">Parlez-nous de {profile.name}</h2>
              <p className="step-description">
                Ces informations nous aident à mieux comprendre votre situation (optionnel)
              </p>
            </div>
            
            <div className="form-group">
              <label htmlFor="background" className="form-label">
                Son histoire (élevage, refuge, adoption...)
              </label>
              <textarea
                id="background"
                value={profile.background}
                onChange={(e) => handleInputChange('background', e.target.value)}
                placeholder="Ex: Adopté au refuge à 6 mois, très timide au début..."
                className="form-textarea"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="healthIssues" className="form-label">
                Problèmes de santé connus
              </label>
              <textarea
                id="healthIssues"
                value={profile.healthIssues}
                onChange={(e) => handleInputChange('healthIssues', e.target.value)}
                placeholder="Ex: Dysplasie de la hanche, allergies alimentaires..."
                className="form-textarea"
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dog-profile-form">
      <div className="form-container">
        {/* Progress bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <div className="progress-text">
            Étape {currentStep} sur {totalSteps}
          </div>
        </div>

        {/* Form content */}
        <div className="form-content">
          {renderStep()}
        </div>

        {/* Navigation buttons */}
        <div className="form-navigation">
          <div className="nav-left">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="btn btn-secondary"
              >
                Précédent
              </button>
            )}
          </div>

          <div className="nav-right">
            {currentStep === totalSteps && onSkip && (
              <button
                type="button"
                onClick={onSkip}
                className="btn btn-ghost"
              >
                Passer
              </button>
            )}
            
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn btn-primary"
            >
              {currentStep === totalSteps ? 'Commencer le chat' : 'Suivant'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};