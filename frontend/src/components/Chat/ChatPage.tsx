import React from 'react';
import { DogProfileHeader } from './DogProfileHeader';
import { ChatInterface } from './ChatInterface';

interface ChatPageProps {
  onBackClick?: () => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({ onBackClick }) => {
  // Données de test - à remplacer par les vraies données plus tard
  const mockDogData = {
    name: "Rocky",
    breed: "Berger Australien", 
    age: "3 mois",
    photoUrl: undefined // Pour l'instant on utilise l'emoji
  };

  return (
    <div className="container">
      <DogProfileHeader
        dogName={mockDogData.name}
        breed={mockDogData.breed}
        age={mockDogData.age}
        photoUrl={mockDogData.photoUrl}
        onBackClick={onBackClick}
      />
      
      <ChatInterface dogName={mockDogData.name} />
    </div>
  );
};