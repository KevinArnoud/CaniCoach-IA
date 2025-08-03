// src/Journal.tsx - Version Transform��e
import { useState, useEffect, useCallback } from 'react';
import { supabase } from './utils/supabaseClient';
import type { AuthSession } from './App';

interface Dog {
  dog_id: string;
  name: string;
  breed?: string;
  date_of_birth?: string;
}

interface JournalEntry {
  entry_id: number;
  content: string;
  created_at: string;
  mood: 'frustrated' | 'neutral' | 'happy' | 'proud' | 'excited';
  entry_type: 'note' | 'milestone' | 'photo' | 'achievement';
  dogs: { name: string };
}

interface JournalEntryFromDB {
  entry_id: number;
  content: string;
  created_at: string;
  dog_id: string;
  mood?: string;
  entry_type?: string;
}

export default function Journal({ session }: { session: AuthSession }) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [selectedDogId, setSelectedDogId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // États pour la nouvelle entrée
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    content: '',
    mood: 'neutral' as const,
    entry_type: 'note' as const
  });

  const loadJournalData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!session?.user) throw new Error("Session utilisateur non trouvée.");

      // Charger les chiens avec plus d'infos
      const { data: dogsData, error: dogsError } = await supabase
        .from('dogs')
        .select('dog_id, name, breed, date_of_birth')
        .eq('owner_id', session.user.id);
      if (dogsError) throw dogsError;

      const userDogs = dogsData || [];
      setDogs(userDogs);
      if (userDogs.length > 0 && !selectedDogId) {
        setSelectedDogId(userDogs[0].dog_id);
      }

      // Charger les entrées existantes
      const { data: entriesData, error: entriesError } = await supabase
        .from('journal_entries')
        .select('entry_id, content, created_at, dog_id, mood, entry_type')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      if (entriesError) throw entriesError;

      const dogsMap = new Map(userDogs.map(dog => [dog.dog_id, dog.name]));
      const hydratedEntries = (entriesData as JournalEntryFromDB[] || []).map(entry => ({
        ...entry,
        mood: (entry.mood as any) || 'neutral',
        entry_type: (entry.entry_type as any) || 'note',
        dogs: { name: dogsMap.get(entry.dog_id) || 'Chien supprimé' }
      }));
      setEntries(hydratedEntries);

      // Ajouter des milestones automatiques si c'est le premier chargement
      await checkAndAddMilestones(userDogs);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [session, selectedDogId]);

  // Fonction pour ajouter des milestones automatiques
  const checkAndAddMilestones = async (userDogs: Dog[]) => {
    for (const dog of userDogs) {
      if (dog.date_of_birth) {
        const ageInMonths = calculateAgeInMonths(dog.date_of_birth);
        const milestones = getMilestonesForAge(ageInMonths, dog.name);
        
        for (const milestone of milestones) {
          // Vérifier si ce milestone existe déjà
          const existing = entries.find(e => 
            e.content.includes(milestone.content.substring(0, 20)) && 
            e.entry_type === 'milestone'
          );
          
          if (!existing) {
            // Ajouter le milestone silencieusement
            await supabase
              .from('journal_entries')
              .insert({
                user_id: session?.user.id,
                dog_id: dog.dog_id,
                content: milestone.content,
                entry_type: 'milestone',
                mood: 'proud'
              });
          }
        }
      }
    }
  };

  const calculateAgeInMonths = (dateOfBirth: string): number => {
    const birth = new Date(dateOfBirth);
    const now = new Date();
    return Math.ceil(Math.abs(now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
  };

  const getMilestonesForAge = (ageInMonths: number, dogName: string) => {
    const milestones = [];
    
    if (ageInMonths >= 2 && ageInMonths <= 4) {
      milestones.push({
        content: `🎯 ${dogName} est dans sa période critique de socialisation ! C'est le moment parfait pour créer un "dépôt de confiance" solide.`
      });
    }
    
    if (ageInMonths >= 6 && ageInMonths <= 8) {
      milestones.push({
        content: `🧑‍🎓 ${dogName} entre dans l'adolescence canine. C'est normal s'il y a quelques régressions !`
      });
    }
    
    if (ageInMonths >= 12) {
      milestones.push({
        content: `🎉 ${dogName} a maintenant 1 an ! Félicitations pour cette première année ensemble !`
      });
    }
    
    return milestones;
  };

  useEffect(() => {
    loadJournalData();
  }, [loadJournalData]);

  const addEntry = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newEntry.content.trim() || !selectedDogId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          user_id: session?.user.id,
          dog_id: selectedDogId,
          content: newEntry.content.trim(),
          mood: newEntry.mood,
          entry_type: newEntry.entry_type
        })
        .select('entry_id, content, created_at, dog_id, mood, entry_type')
        .single();
      if (error) throw error;

      const dogName = dogs.find(d => d.dog_id === selectedDogId)?.name || 'Chien';
      const newHydratedEntry: JournalEntry = {
        ...(data as any),
        dogs: { name: dogName }
      };
      
      setEntries([newHydratedEntry, ...entries]);
      setNewEntry({ content: '', mood: 'neutral', entry_type: 'note' });
      setShowAddForm(false);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonctions d'affichage
  const getMoodEmoji = (mood: string): string => {
    switch (mood) {
      case 'frustrated': return '😤';
      case 'happy': return '😊';
      case 'proud': return '🥳';
      case 'excited': return '🤩';
      default: return '😐';
    }
  };

  const getEntryIcon = (entry_type: string): string => {
    switch (entry_type) {
      case 'milestone': return '🎯';
      case 'achievement': return '🏆';
      case 'photo': return '📸';
      default: return '📝';
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Aujourd\'hui';
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  if (loading && entries.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📖</div>
        <p>Chargement de votre journal...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      {/* En-tête */}
      <div style={{
        backgroundColor: 'var(--color-card-background-light)',
        borderRadius: 'var(--border-radius-medium)',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid var(--color-border-light)'
      }}>
        <h2 style={{ margin: '0 0 8px 0', color: 'var(--color-text-dark)' }}>
          📖 Journal de Progrès
        </h2>
        <p style={{ margin: '0 0 16px 0', color: 'var(--color-text-medium)' }}>
          Notez vos victoires, défis et moments importants avec votre compagnon
        </p>

        {/* Stats rapides */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '16px',
          marginTop: '16px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-primary)' }}>
              {entries.length}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-medium)' }}>
              Entrées
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-success)' }}>
              {entries.filter(e => e.entry_type === 'milestone').length}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-medium)' }}>
              Étapes
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-warning)' }}>
              {entries.filter(e => e.mood === 'proud' || e.mood === 'happy').length}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-medium)' }}>
              Victoires
            </div>
          </div>
        </div>
      </div>

      {/* Bouton ajouter entrée */}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        disabled={dogs.length === 0}
        style={{
          width: '100%',
          padding: '16px',
          backgroundColor: showAddForm ? 'var(--color-text-medium)' : 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--border-radius-medium)',
          fontSize: '1rem',
          fontWeight: '600',
          marginBottom: '20px',
          cursor: dogs.length === 0 ? 'not-allowed' : 'pointer',
          opacity: dogs.length === 0 ? 0.5 : 1
        }}
      >
        {showAddForm ? '❌ Annuler' : '✏️ Nouvelle entrée'}
      </button>

      {dogs.length === 0 && (
        <div style={{
          padding: '20px',
          backgroundColor: 'var(--color-warning-light)',
          border: '1px solid var(--color-warning)',
          borderRadius: 'var(--border-radius-medium)',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, color: 'var(--color-warning)' }}>
            Ajoutez d'abord un chien dans votre profil pour commencer votre journal !
          </p>
        </div>
      )}

      {/* Formulaire d'ajout */}
      {showAddForm && dogs.length > 0 && (
        <div style={{
          backgroundColor: 'var(--color-card-background-light)',
          border: '1px solid var(--color-border-light)',
          borderRadius: 'var(--border-radius-medium)',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <form onSubmit={addEntry}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '4px', 
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                Pour quel chien ?
              </label>
              <select
                value={selectedDogId}
                onChange={(e) => setSelectedDogId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 'var(--border-radius-small)',
                  border: '1px solid var(--color-border-light)',
                  backgroundColor: 'white'
                }}
              >
                {dogs.map(dog => (
                  <option key={dog.dog_id} value={dog.dog_id}>
                    {dog.name} {dog.breed && `(${dog.breed})`}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '4px', 
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                Votre humeur aujourd'hui
              </label>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(5, 1fr)', 
                gap: '8px' 
              }}>
                {[
                  { value: 'frustrated', emoji: '😤', label: 'Frustré' },
                  { value: 'neutral', emoji: '😐', label: 'Neutre' },
                  { value: 'happy', emoji: '😊', label: 'Content' },
                  { value: 'proud', emoji: '🥳', label: 'Fier' },
                  { value: 'excited', emoji: '🤩', label: 'Excité' }
                ].map(mood => (
                  <button
                    key={mood.value}
                    type="button"
                    onClick={() => setNewEntry(prev => ({ ...prev, mood: mood.value as any }))}
                    style={{
                      padding: '12px 4px',
                      backgroundColor: newEntry.mood === mood.value ? 'var(--color-primary)' : 'white',
                      color: newEntry.mood === mood.value ? 'white' : 'var(--color-text-dark)',
                      border: '1px solid var(--color-border-light)',
                      borderRadius: 'var(--border-radius-small)',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '1.5rem' }}>{mood.emoji}</div>
                    <div>{mood.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '4px', 
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                Votre note
              </label>
              <textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                placeholder={`Aujourd'hui avec ${dogs.find(d => d.dog_id === selectedDogId)?.name || 'mon chien'}...`}
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 'var(--border-radius-small)',
                  border: '1px solid var(--color-border-light)',
                  resize: 'vertical',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!newEntry.content.trim() || loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: loading ? 'var(--color-border-light)' : 'var(--color-success)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--border-radius-small)',
                fontWeight: '600',
                cursor: loading || !newEntry.content.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !newEntry.content.trim() ? 0.6 : 1
              }}
            >
              {loading ? '⏳ Ajout...' : '✅ Ajouter au journal'}
            </button>
          </form>
        </div>
      )}

      {error && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: 'var(--color-error-light)',
          border: '1px solid var(--color-error)',
          borderRadius: 'var(--border-radius-medium)',
          marginBottom: '20px',
          color: 'var(--color-error)'
        }}>
          ❌ {error}
        </div>
      )}

      {/* Timeline des entrées */}
      <div style={{ position: 'relative' }}>
        {entries.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            backgroundColor: 'var(--color-card-background-light)',
            borderRadius: 'var(--border-radius-medium)',
            border: '1px solid var(--color-border-light)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📖</div>
            <p style={{ color: 'var(--color-text-medium)' }}>
              Votre journal est vide. Commencez à écrire !
            </p>
          </div>
        ) : (
          <>
            {/* Ligne de timeline */}
            <div style={{
              position: 'absolute',
              left: '24px',
              top: '0',
              bottom: '0',
              width: '2px',
              backgroundColor: 'var(--color-border-light)'
            }} />

            {entries.map((entry, index) => (
              <div
                key={entry.entry_id}
                style={{
                  position: 'relative',
                  marginBottom: '24px',
                  marginLeft: '56px'
                }}
              >
                {/* Icône de timeline */}
                <div style={{
                  position: 'absolute',
                  left: '-48px',
                  top: '12px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: entry.entry_type === 'milestone' ? 'var(--color-success)' : 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  border: '3px solid white',
                  boxShadow: '0 0 0 1px var(--color-border-light)'
                }}>
                  {getEntryIcon(entry.entry_type)}
                </div>

                {/* Contenu de l'entrée */}
                <div style={{
                  backgroundColor: entry.entry_type === 'milestone' ? 'var(--color-success-light)' : 'var(--color-card-background-light)',
                  border: `1px solid ${entry.entry_type === 'milestone' ? 'var(--color-success)' : 'var(--color-border-light)'}`,
                  borderRadius: 'var(--border-radius-medium)',
                  padding: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      fontSize: '0.85rem',
                      color: 'var(--color-text-medium)'
                    }}>
                      {formatDate(entry.created_at)}
                      <span style={{ marginLeft: '8px', fontSize: '1.2rem' }}>
                        {getMoodEmoji(entry.mood)}
                      </span>
                    </div>
                    {entry.entry_type === 'milestone' && (
                      <div style={{
                        backgroundColor: 'var(--color-success)',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: '600'
                      }}>
                        ÉTAPE IMPORTANTE
                      </div>
                    )}
                  </div>
                  <p style={{
                    margin: '0',
                    color: 'var(--color-text-dark)',
                    lineHeight: 1.5
                  }}>
                    {entry.content}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}