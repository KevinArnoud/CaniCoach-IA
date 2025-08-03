// src/Journal.tsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from './utils/supabaseClient';
import type { AuthSession } from './App';
import Challenge from './Challenge'; // <-- 1. On importe le nouveau composant

interface Dog {
  dog_id: string;
  name: string;
}

interface JournalEntry {
  entry_id: number;
  content: string;
  created_at: string;
  dogs: { name: string };
}

interface JournalEntryFromDB {
  entry_id: number;
  content: string;
  created_at: string;
  dog_id: string;
}

export default function Journal({ session }: { session: AuthSession }) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [selectedDogId, setSelectedDogId] = useState<string>('');
  const [newEntryContent, setNewEntryContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingEntryId, setEditingEntryId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  const getJournalData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!session?.user) throw new Error("Session utilisateur non trouvée.");
      const { user } = session;

      const { data: dogsData, error: dogsError } = await supabase
        .from('dogs')
        .select('dog_id, name')
        .eq('owner_id', user.id);
      if (dogsError) throw dogsError;
      
      const userDogs = dogsData || [];
      setDogs(userDogs);
      if (userDogs.length > 0 && !selectedDogId) {
        setSelectedDogId(userDogs[0].dog_id);
      }

      const { data: entriesData, error: entriesError } = await supabase
        .from('journal_entries')
        .select('entry_id, content, created_at, dog_id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (entriesError) throw entriesError;

      const dogsMap = new Map(userDogs.map(dog => [dog.dog_id, dog.name]));
      const hydratedEntries = (entriesData as JournalEntryFromDB[] || []).map(entry => ({
        ...entry,
        dogs: { name: dogsMap.get(entry.dog_id) || 'Chien supprimé' }
      }));
      setEntries(hydratedEntries);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [session, selectedDogId]);

  useEffect(() => {
    getJournalData();
  }, [getJournalData]);

  const addEntry = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newEntryContent.trim() || !selectedDogId) return;
    setLoading(true);
    setError(null);
    try {
      const { user } = session;
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({ user_id: user.id, dog_id: selectedDogId, content: newEntryContent.trim() })
        .select('entry_id, content, created_at, dog_id')
        .single();
      if (error) throw error;

      const dogName = dogs.find(d => d.dog_id === selectedDogId)?.name || 'Chien';
      const newHydratedEntry: JournalEntry = {
        ...(data as JournalEntryFromDB),
        dogs: { name: dogName }
      };
      setEntries([newHydratedEntry, ...entries]);
      setNewEntryContent('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (entry: JournalEntry) => {
    setEditingEntryId(entry.entry_id);
    setEditContent(entry.content);
  };

  const cancelEditing = () => {
    setEditingEntryId(null);
    setEditContent('');
  };

  const updateEntry = async (entryId: number) => {
    if (!editContent.trim()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .update({ content: editContent.trim() })
        .eq('entry_id', entryId)
        .select('*, dogs(name)')
        .single();
      if (error) throw error;
      setEntries(entries.map(e => e.entry_id === entryId ? (data as JournalEntry) : e));
      cancelEditing();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (entryId: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette entrée ?")) {
      setLoading(true);
      try {
        const { error } = await supabase
          .from('journal_entries')
          .delete()
          .eq('entry_id', entryId);
        if (error) throw error;
        setEntries(entries.filter(e => e.entry_id !== entryId));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {/* <-- 2. On affiche le composant Challenge ici --> */}
      <Challenge />

      <div className="form-widget">
        <h2>📓 Mon Journal de Progrès</h2>
        <p className="description">
          Notez ici vos victoires, vos défis et les moments importants de votre parcours avec votre compagnon.
        </p>
        
        <form onSubmit={addEntry}>
          {dogs.length > 0 && (
            <div className="form-group">
              <label htmlFor="dog-select">Pour quel chien ?</label>
              <select 
                id="dog-select" 
                className="inputField" 
                value={selectedDogId}
                onChange={(e) => setSelectedDogId(e.target.value)}
              >
                {dogs.map(dog => (
                  <option key={dog.dog_id} value={dog.dog_id}>{dog.name}</option>
                ))}
              </select>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="journal-content">Nouvelle entrée</label>
            <textarea
              id="journal-content"
              className="inputField"
              rows={4}
              placeholder="Aujourd'hui, Saiko a réussi à..."
              value={newEntryContent}
              onChange={(e) => setNewEntryContent(e.target.value)}
              disabled={loading || dogs.length === 0}
            />
          </div>
          <button 
            className="button" 
            type="submit" 
            disabled={loading || !newEntryContent.trim()}
          >
            {loading ? '⏳ Ajout...' : '✍️ Ajouter au journal'}
          </button>
          {dogs.length === 0 && !loading && (
             <p style={{color: 'var(--color-text-medium)'}}>Vous devez d'abord ajouter un chien dans votre profil.</p>
          )}
          {error && <p style={{color: 'var(--color-error)'}}>Erreur: {error}</p>}
        </form>
      </div>

      <div className="journal-entries-list">
        {entries.map(entry => (
          <div key={entry.entry_id} className="journal-entry-card">
            {editingEntryId === entry.entry_id ? (
              <div className="entry-edit-form">
                <textarea
                  className="inputField"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={4}
                  autoFocus
                />
                <div className="entry-actions">
                  <button className="button button-small" onClick={() => updateEntry(entry.entry_id)} disabled={loading}>✅ Enregistrer</button>
                  <button className="button secondary button-small" onClick={cancelEditing} disabled={loading}>❌ Annuler</button>
                </div>
              </div>
            ) : (
              <>
                <div className="entry-header">
                  <span className="entry-dog-name">{entry.dogs.name}</span>
                  <div className="entry-actions">
                    <button className="button-icon" onClick={() => startEditing(entry)} disabled={loading}>✏️</button>
                    <button className="button-icon" onClick={() => deleteEntry(entry.entry_id)} disabled={loading}>🗑️</button>
                  </div>
                </div>
                <p className="entry-content">{entry.content}</p>
                <div className="entry-footer">
                  <span>{new Date(entry.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                </div>
              </>
            )}
          </div>
        ))}
        {loading && entries.length === 0 && <p style={{textAlign: 'center'}}>Chargement du journal...</p>}
        {!loading && entries.length === 0 && <p style={{textAlign: 'center', color: 'var(--color-text-medium)'}}>Votre journal est vide. Commencez à écrire !</p>}
      </div>
    </>
  );
}