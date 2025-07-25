import React, { useState, useEffect } from 'react';
import { DogIcon, PawIcon } from '../Icons/IconSet';
import './WeeklyChallenges.css';

interface Challenge {
  id: string;
  week: number;
  title: string;
  description: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  category: 'obéissance' | 'socialisation' | 'jeu' | 'bien-être';
  steps: string[];
  tips: string[];
  completed: boolean;
  completedDate?: Date;
}

interface WeeklyChallengesProps {
  onClose: () => void;
  dogName: string;
}

const challengesData: Omit<Challenge, 'completed' | 'completedDate'>[] = [
  {
    id: '1',
    week: 1,
    title: 'Le toucher (ciblage de la main)',
    description: 'Apprenez à votre chien à toucher votre main avec son museau sur commande.',
    difficulty: 'facile',
    category: 'obéissance',
    steps: [
      'Présentez votre main ouverte à 10cm du museau de votre chien',
      'Dès qu\'il s\'approche et touche votre main, dites "Touche" et récompensez',
      'Répétez 5-10 fois par séance, 2-3 séances par jour',
      'Augmentez progressivement la distance'
    ],
    tips: [
      'Utilisez des friandises de haute valeur',
      'Gardez les séances courtes (5 minutes max)',
      'Terminez toujours sur une réussite'
    ]
  },
  {
    id: '2',
    week: 2,
    title: 'Socialisation contrôlée',
    description: 'Organisez une rencontre positive avec un chien calme et bien éduqué.',
    difficulty: 'moyen',
    category: 'socialisation',
    steps: [
      'Choisissez un chien calme et sociable comme partenaire',
      'Commencez par une promenade parallèle à distance',
      'Rapprochez-vous progressivement si les deux chiens sont détendus',
      'Permettez une interaction brève et positive',
      'Terminez avant que l\'excitation ne monte'
    ],
    tips: [
      'Restez détendu, votre énergie influence votre chien',
      'Ayez des friandises pour récompenser le calme',
      'N\'hésitez pas à interrompre si nécessaire'
    ]
  },
  {
    id: '3',
    week: 3,
    title: 'Jeu de recherche olfactive',
    description: 'Stimulez l\'intelligence de votre chien avec des jeux de flair.',
    difficulty: 'facile',
    category: 'jeu',
    steps: [
      'Cachez des friandises dans votre salon pendant que votre chien attend',
      'Dites "Cherche" et laissez-le explorer',
      'Félicitez-le quand il trouve une friandise',
      'Augmentez progressivement la difficulté des cachettes'
    ],
    tips: [
      'Commencez par des cachettes faciles',
      'Utilisez des friandises très odorantes',
      'Laissez-le réussir pour maintenir sa motivation'
    ]
  },
  {
    id: '4',
    week: 4,
    title: 'Relaxation sur commande',
    description: 'Apprenez à votre chien à se détendre sur demande.',
    difficulty: 'difficile',
    category: 'bien-être',
    steps: [
      'Attendez que votre chien soit naturellement détendu',
      'Dites "Relax" d\'une voix douce et caressez-le calmement',
      'Récompensez le calme avec des caresses et une voix apaisante',
      'Répétez dans différents contextes',
      'Utilisez la commande dans des situations légèrement stressantes'
    ],
    tips: [
      'Votre propre calme est essentiel',
      'Pratiquez d\'abord dans un environnement calme',
      'Soyez patient, cela peut prendre plusieurs semaines'
    ]
  }
];

export const WeeklyChallenges: React.FC<WeeklyChallengesProps> = ({ onClose, dogName }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    // Charger les défis depuis le localStorage
    const savedChallenges = localStorage.getItem('weekly_challenges');
    if (savedChallenges) {
      const parsed = JSON.parse(savedChallenges);
      setChallenges(parsed.map((challenge: any) => ({
        ...challenge,
        completedDate: challenge.completedDate ? new Date(challenge.completedDate) : undefined
      })));
    } else {
      // Initialiser avec les données par défaut
      const initialChallenges = challengesData.map(challenge => ({
        ...challenge,
        completed: false
      }));
      setChallenges(initialChallenges);
    }

    // Calculer la semaine courante (simulation)
    const startDate = new Date('2024-01-01');
    const now = new Date();
    const weekNumber = Math.floor((now.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)) % 4 + 1;
    setCurrentWeek(weekNumber);
  }, []);

  const saveChallenges = (updatedChallenges: Challenge[]) => {
    localStorage.setItem('weekly_challenges', JSON.stringify(updatedChallenges));
    setChallenges(updatedChallenges);
  };

  const toggleChallengeCompletion = (challengeId: string) => {
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.id === challengeId) {
        return {
          ...challenge,
          completed: !challenge.completed,
          completedDate: !challenge.completed ? new Date() : undefined
        };
      }
      return challenge;
    });
    saveChallenges(updatedChallenges);
  };

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'facile': return 'difficulty-easy';
      case 'moyen': return 'difficulty-medium';
      case 'difficile': return 'difficulty-hard';
    }
  };

  const getCategoryIcon = (category: Challenge['category']) => {
    switch (category) {
      case 'obéissance': return '🎯';
      case 'socialisation': return '🤝';
      case 'jeu': return '🎮';
      case 'bien-être': return '🧘';
    }
  };

  const getCategoryColor = (category: Challenge['category']) => {
    switch (category) {
      case 'obéissance': return 'category-obedience';
      case 'socialisation': return 'category-social';
      case 'jeu': return 'category-play';
      case 'bien-être': return 'category-wellness';
    }
  };

  const completedChallenges = challenges.filter(c => c.completed).length;
  const totalChallenges = challenges.length;

  return (
    <div className="challenges-overlay">
      <div className="challenges-modal">
        {/* Header */}
        <div className="challenges-header">
          <button className="close-button" onClick={onClose}>
            ×
          </button>
          <div className="header-content">
            <div className="header-icon">
              🏆
            </div>
            <div>
              <h2 className="challenges-title">Défis Hebdomadaires</h2>
              <p className="challenges-subtitle">Semaine {currentWeek} • Progressez avec {dogName}</p>
            </div>
          </div>
          
          <div className="progress-summary">
            <div className="progress-circle">
              <div className="progress-text">
                {completedChallenges}/{totalChallenges}
              </div>
            </div>
            <span className="progress-label">Défis réalisés</span>
          </div>
        </div>

        {/* Challenge Detail Modal */}
        {selectedChallenge && (
          <div className="challenge-detail-overlay">
            <div className="challenge-detail-modal">
              <div className="detail-header">
                <button 
                  className="back-button"
                  onClick={() => setSelectedChallenge(null)}
                >
                  ← Retour
                </button>
                <div className={`challenge-category ${getCategoryColor(selectedChallenge.category)}`}>
                  {getCategoryIcon(selectedChallenge.category)} {selectedChallenge.category}
                </div>
              </div>

              <div className="detail-content">
                <h3 className="detail-title">{selectedChallenge.title}</h3>
                <p className="detail-description">{selectedChallenge.description}</p>

                <div className="detail-section">
                  <h4>Étapes à suivre :</h4>
                  <ol className="steps-list">
                    {selectedChallenge.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="detail-section">
                  <h4>Conseils d'Esprit Dog :</h4>
                  <ul className="tips-list">
                    {selectedChallenge.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-actions">
                  <button
                    className={`btn ${selectedChallenge.completed ? 'btn-secondary' : 'btn-primary'} btn-full`}
                    onClick={() => {
                      toggleChallengeCompletion(selectedChallenge.id);
                      setSelectedChallenge(prev => prev ? { ...prev, completed: !prev.completed } : null);
                    }}
                  >
                    {selectedChallenge.completed ? '✅ Défi réalisé' : 'Marquer comme réalisé'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Challenges List */}
        <div className="challenges-content">
          <div className="challenges-grid">
            {challenges.map(challenge => (
              <div 
                key={challenge.id}
                className={`challenge-card ${challenge.completed ? 'completed' : ''} ${challenge.week === currentWeek ? 'current-week' : ''}`}
                onClick={() => setSelectedChallenge(challenge)}
              >
                {challenge.week === currentWeek && (
                  <div className="current-badge">Cette semaine</div>
                )}
                
                <div className="challenge-header-card">
                  <div className={`challenge-category ${getCategoryColor(challenge.category)}`}>
                    {getCategoryIcon(challenge.category)}
                  </div>
                  <div className={`difficulty-badge ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </div>
                </div>

                <h3 className="challenge-title">{challenge.title}</h3>
                <p className="challenge-description">{challenge.description}</p>

                <div className="challenge-footer">
                  <span className="challenge-week">Semaine {challenge.week}</span>
                  {challenge.completed && (
                    <div className="completed-indicator">
                      ✅ Réalisé
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};