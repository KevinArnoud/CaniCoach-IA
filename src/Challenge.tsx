// src/Challenge.tsx
import { useState, useEffect } from 'react';
import { supabase } from './utils/supabaseClient';

interface ChallengeInstruction {
  step: number;
  text: string;
}

interface ChallengeData {
  title: string;
  description: string;
  instructions: ChallengeInstruction[];
}

export default function Challenge() {
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('challenges')
          .select('title, description, instructions')
          .eq('is_active', true)
          .limit(1)
          .single();
        
        if (error && error.code !== 'PGRST116') { // PGRST116 = 0 rows, ce n'est pas une erreur
          throw error;
        }
        if (data) {
          setChallenge(data);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération du défi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, []);

  if (loading) {
    return <div className="challenge-widget-loading">Chargement du défi...</div>;
  }

  if (!challenge) {
    return null; // N'affiche rien si aucun défi n'est actif
  }

  return (
    <div className="challenge-widget">
      <h4>🏆 Défi de la semaine</h4>
      <h3>{challenge.title}</h3>
      <p className="description">{challenge.description}</p>
      <div className="instructions">
        {challenge.instructions.map((item) => (
          <div key={item.step} className="instruction-step">
            <div className="step-number">{item.step}</div>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}