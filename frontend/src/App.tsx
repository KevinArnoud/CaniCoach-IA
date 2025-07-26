import React from 'react';

function App() {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333' }}>CaniCoach IA - Test</h1>
      <p>L'application fonctionne !</p>
      <button 
        onClick={() => alert('Bouton cliqué !')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007AFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Test Button
      </button>
    </div>
  );
}

export default App;