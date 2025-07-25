import React from 'react';
import { DogProfileHeader } from './DogProfileHeader';
import { ChatInterface } from './ChatInterface';

interface ChatPageProps {
  onBackClick?: () => void;
  dogName?: string;
  breed?: string;
  age?: string;
}

export const ChatPage: React.FC<ChatPageProps> = ({ 
  onBackClick, 
  dogName = "votre chien", 
  breed = "Chien", 
  age = "Âge non spécifié" 
}) => {
  console.log('ChatPage render - props:', { dogName, breed, age });

  const handleBackClick = () => {
    console.log('ChatPage: Back button clicked');
    if (onBackClick) {
      onBackClick();
    }
  };

  return (
    <div className="container">
      <DogProfileHeader
        dogName={dogName}
        breed={breed}
        age={age}
        photoUrl={undefined}
        onBackClick={handleBackClick}
      />
      
      <ChatInterface 
        dogName={dogName} 
        dogBreed={breed}
        dogAge={age}
      />
    </div>
  );
};