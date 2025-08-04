// src/Journal.tsx - Version Corrigée pour les Doublons
import { useState, useEffect, useCallback } from 'react';
import { supabase } from './utils/supabaseClient';
import type { AuthSession } from './App';
import Challenge from './Challenge';

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

export default function Journal({ session }: { session: AuthSession }) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [selectedDogId, setSelectedDogId] = useState<string>('');
  const [newEntryContent, setNewEntryContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingEntryId, setEditingEntryId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  // ✅ CORRECTION 1: Fonction optimisée pour éviter les doublons
  const getJournalData = useCallback(async () => {
    if (!session?.user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // 🔹 Récupération des chiens (simple, sans jointure)
      const { data: dogsData, error: dogsError } = await supabase
        .from('dogs')
        .select('dog_id, name')
        .eq('owner_id', session.user.id)
        .order('created_at', { ascending: false });

      if (dogsError) throw dogsError;
      
      // 🔹 Récupération des entrées avec jointure propre
      const { data: entriesData, error: entriesError } = await supabase
        .from('journal_entries')
        .select(`
          entry_id,
          content,
          created_at,
          dog_id,
          dogs:dog_id (name)
        `)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (entriesError) throw entriesError;

      // ✅ CORRECTION 2: Nettoyage et déduplication des données
      const cleanDogs = dogsData || [];
      const cleanEntries = (entriesData || []).map(entry => ({
        entry_id: entry.entry_id,
        content: entry.content,
        created_at: entry.created_at,
        dogs: { name: entry.dogs?.name || 'Chien inconnu' }
      }));

      // ✅ CORRECTION 3: Déduplication basée sur entry_id
      const uniqueEntries = cleanEntries.filter((entry, index, self) => 
        index === self.findIndex(e => e.entry_id === entry.entry_id)
      );

      console.log('📊 Données chargées:', { dogsCount: cleanDogs.length, entriesCount: uniqueEntries.length });

      setDogs(cleanDogs);
      setEntries(uniqueEntries);

      // Sélectionner le premier chien par défaut si aucun n'est sélectionné
      if (cleanDogs.length > 0 && !selectedDogId) {
        setSelectedDogId(cleanDogs[0].dog_id);
      }

    } catch (err: any) {
      console.error('❌ Erreur chargement journal:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id, selectedDogId]); // ✅ Dépendances optimisées

  // ✅ CORRECTION 4: useEffect avec nettoyage
  useEffect(() => {
    let mounted = true;
    
    const loadData = async () => {
      if (mounted) {
        await getJournalData();
      }
    };
    
    loadData();
    
    return () => {
      mounted = false; // Évite les mises à jour si le composant est démonté
    };
  }, [getJournalData]);

  // ✅ Fonction d'ajout d'entrée (inchangée mais optimisée)
  const addEntry = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newEntryContent.trim() || !selectedDogId) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          content: newEntryContent.trim(),
          dog_id: selectedDogId,
          user_id: session?.user?.id
        })
        .select(`
          entry_id,
          content,
          created_at,
          dogs:dog_id (name)
        `)
        .single();

      if (error) throw error;

      // ✅ Mise à jour optimisée de l'état local
      const newEntry = {
        entry_id: data.entry_id,
        content: data.content,
        created_at: data.created_at,
        dogs: { name: data.dogs?.name || 'Chien inconnu' }
      };

      setEntries(prevEntries => [newEntry, ...prevEntries]);
      setNewEntryContent('');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fonction de modification (optimisée)
  const updateEntry = async () => {
    if (!editContent.trim() || editingEntryId === null) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('journal_entries')
        .update({ content: editContent.trim() })
        .eq('entry_id', editingEntryId);

      if (error) throw error;

      // Mise à jour locale optimisée
      setEntries(prevEntries => 
        prevEntries.map(entry => 
          entry.entry_id === editingEntryId 
            ? { ...entry, content: editContent.trim() }
            : entry
        )
      );

      // Reset du mode édition
      setEditingEntryId(null);
      setEditContent('');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fonction de suppression (optimisée)
  const deleteEntry = async (entryId: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette entrée ?")) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('entry_id', entryId);

      if (error) throw error;

      // Mise à jour locale optimisée
      setEntries(prevEntries => prevEntries.filter(e => e.entry_id !== entryId));

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fonctions utilitaires
  const startEditing = (entry: JournalEntry) => {
    setEditingEntryId(entry.entry_id);
    setEditContent(entry.content);
  };

  const cancelEditing = () => {
    setEditingEntryId(null);
    setEditContent('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // ✅ RENDU (interface inchangée)
  return (
    <>
      <Challenge />

      <div className="form-widget">
        <h2>📓 Mon Journal de Progrès</h2>
        <p className="description">
          Notez ici vos victoires, vos défis et les moments importants de votre parcours avec votre compagnon.
        </p>
        
        {error && (
          <div className="error-message" style={{ marginBottom: 'var(--spacing-md)' }}>
            ❌ {error}
          </div>
        )}
        
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
              placeholder="Aujourd'hui, [nom du chien] a réussi à..."
              value={newEntryContent}
              onChange={(e) => setNewEntryContent(e.target.value)}
              disabled={loading || dogs.length === 0}
            />
          </div>
          
          <button 
            className="button" 
            type="submit" 
            disabled={loading || !newEntryContent.trim() || !selectedDogId}
          >
            {loading ? '⏳ Ajout...' : '✍️ Ajouter au journal'}
          </button>
          
          {dogs.length === 0 && !loading && (
            <p style={{color: 'var(--color-text-medium)', marginTop: 'var(--spacing-md)'}}>
              Vous devez d'abord ajouter un chien dans votre profil.
            </p>
          )}
        </form>
      </div>

      {/* Liste des entrées */}
      <div className="journal-entries-list">
        {loading && entries.length === 0 ? (
          <div className="loading-state">
            <div className="icon">⏳</div>
            <p>Chargement de votre journal...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="empty-state">
            <div className="icon">📔</div>
            <p>Votre journal est vide. Ajoutez votre première entrée ci-dessus !</p>
          </div>
        ) : (
          entries.map(entry => (
            <div key={entry.entry_id} className="journal-entry-card">
              {editingEntryId === entry.entry_id ? (
                <div className="entry-edit-form">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="inputField"
                    rows={3}
                  />
                  <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-md)' }}>
                    <button onClick={updateEntry} className="button" disabled={loading}>
                      ✅ Sauvegarder
                    </button>
                    <button onClick={cancelEditing} className="button secondary" disabled={loading}>
                      ❌ Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="entry-header">
                    <div>
                      <h4>🐕 {entry.dogs.name}</h4>
                      <span className="entry-date">{formatDate(entry.created_at)}</span>
                    </div>
                    <div className="entry-actions">
                      <button 
                        className="button-icon" 
                        onClick={() => startEditing(entry)}
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button 
                        className="button-icon" 
                        onClick={() => deleteEntry(entry.entry_id)}
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div className="entry-content">
                    <p>{entry.content}</p>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}