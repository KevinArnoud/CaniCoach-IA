import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { PawIcon, DogIcon } from '../Icons/IconSet';
import './ProgressJournal.css';

interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  photoUrl?: string;
  dogName: string;
  mood: 'excellent' | 'good' | 'neutral' | 'challenging';
}

interface ProgressJournalProps {
  onClose: () => void;
  dogName: string;
}

export const ProgressJournal: React.FC<ProgressJournalProps> = ({ onClose, dogName }) => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 'good' as JournalEntry['mood']
  });

  useEffect(() => {
    // Charger les entrées depuis le localStorage en mode développement
    if (user) {
      const savedEntries = localStorage.getItem(`journal_${user.id}_${dogName}`);
      if (savedEntries) {
        const parsed = JSON.parse(savedEntries);
        setEntries(parsed.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        })));
      } else {
        // Ajouter quelques entrées d'exemple
        const exampleEntries: JournalEntry[] = [
          {
            id: '1',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            title: 'Première séance de rappel',
            content: `${dogName} a réussi à revenir au rappel 3 fois sur 5 ! Très fier de ses progrès. On continue avec des friandises de haute valeur.`,
            dogName,
            mood: 'good'
          },
          {
            id: '2',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            title: 'Rencontre avec un autre chien',
            content: `Belle socialisation au parc aujourd'hui. ${dogName} était calme et curieux, pas de réactivité. Les conseils de CaniCoach IA fonctionnent !`,
            dogName,
            mood: 'excellent'
          }
        ];
        setEntries(exampleEntries);
      }
    }
  }, [user, dogName]);

  const saveEntries = (newEntries: JournalEntry[]) => {
    if (user) {
      localStorage.setItem(`journal_${user.id}_${dogName}`, JSON.stringify(newEntries));
    }
  };

  const handleAddEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood,
      dogName
    };

    const updatedEntries = [entry, ...entries];
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
    
    setNewEntry({ title: '', content: '', mood: 'good' });
    setShowAddForm(false);
  };

  const getMoodEmoji = (mood: JournalEntry['mood']) => {
    switch (mood) {
      case 'excellent': return '🎉';
      case 'good': return '😊';
      case 'neutral': return '😐';
      case 'challenging': return '😅';
    }
  };

  const getMoodColor = (mood: JournalEntry['mood']) => {
    switch (mood) {
      case 'excellent': return 'mood-excellent';
      case 'good': return 'mood-good';
      case 'neutral': return 'mood-neutral';
      case 'challenging': return 'mood-challenging';
    }
  };

  return (
    <div className="journal-overlay">
      <div className="journal-modal">
        {/* Header */}
        <div className="journal-header">
          <button className="close-button" onClick={onClose}>
            ×
          </button>
          <div className="header-content">
            <PawIcon size={32} />
            <div>
              <h2 className="journal-title">Journal de Progrès</h2>
              <p className="journal-subtitle">Suivez l'évolution de {dogName}</p>
            </div>
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setShowAddForm(true)}
          >
            + Nouvelle entrée
          </button>
        </div>

        {/* Add Entry Form */}
        {showAddForm && (
          <div className="add-entry-form">
            <h3>Nouvelle entrée</h3>
            
            <div className="form-group">
              <label>Titre de l'entrée</label>
              <input
                type="text"
                value={newEntry.title}
                onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Ex: Première promenade sans laisse"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Humeur de la séance</label>
              <div className="mood-selector">
                {(['excellent', 'good', 'neutral', 'challenging'] as const).map(mood => (
                  <button
                    key={mood}
                    type="button"
                    className={`mood-option ${newEntry.mood === mood ? 'selected' : ''} ${getMoodColor(mood)}`}
                    onClick={() => setNewEntry(prev => ({ ...prev, mood }))}
                  >
                    <span className="mood-emoji">{getMoodEmoji(mood)}</span>
                    <span className="mood-label">
                      {mood === 'excellent' && 'Excellent'}
                      {mood === 'good' && 'Bien'}
                      {mood === 'neutral' && 'Neutre'}
                      {mood === 'challenging' && 'Difficile'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                placeholder={`Décrivez les progrès de ${dogName} aujourd'hui...`}
                className="form-textarea"
                rows={4}
              />
            </div>

            <div className="form-actions">
              <button 
                className="btn btn-ghost"
                onClick={() => setShowAddForm(false)}
              >
                Annuler
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleAddEntry}
                disabled={!newEntry.title.trim() || !newEntry.content.trim()}
              >
                Ajouter l'entrée
              </button>
            </div>
          </div>
        )}

        {/* Entries List */}
        <div className="journal-content">
          {entries.length === 0 ? (
            <div className="empty-state">
              <DogIcon size={64} />
              <h3>Aucune entrée pour le moment</h3>
              <p>Commencez à documenter les progrès de {dogName} !</p>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddForm(true)}
              >
                Créer la première entrée
              </button>
            </div>
          ) : (
            <div className="entries-list">
              {entries.map(entry => (
                <div key={entry.id} className="journal-entry">
                  <div className="entry-header">
                    <div className="entry-date">
                      {entry.date.toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className={`entry-mood ${getMoodColor(entry.mood)}`}>
                      {getMoodEmoji(entry.mood)}
                    </div>
                  </div>
                  
                  <h4 className="entry-title">{entry.title}</h4>
                  <p className="entry-content">{entry.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};