import React from 'react';
import { DogProfileHeader } from './DogProfileHeader';
import { ChatInterface } from './ChatInterface';

interface ChatPageProps {
  onBackClick?: () => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({ onBackClick }) => {
  const mockDogData = {
    name: "Rocky",
    breed: "Berger Australien", 
    age: "3 mois",
    photoUrl: undefined
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