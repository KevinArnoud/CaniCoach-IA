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
  return (
    <div className="container">
      <DogProfileHeader
        dogName={dogName}
        breed={breed}
        age={age}
        photoUrl={undefined}
        onBackClick={onBackClick}
      />
      
      <ChatInterface 
        dogName={dogName} 
        dogBreed={breed}
        dogAge={age}
      />
    </div>
  );
};