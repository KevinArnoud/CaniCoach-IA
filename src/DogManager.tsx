// src/DogManager.tsx (Version Pro Refactorisée + Corrigée)
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { supabase } from './utils/supabaseClient';

type AuthSession = Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session'];

interface Dog {
  dog_id: string;
  owner_id: string;
  name: string;
  breed: string | null;
  date_of_birth: string | null;
  photo_url?: string | null;
  background?: string | null;
  health_issues?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface DogFormData {
  name: string;
  breed: string;
  date_of_birth: string;
}

interface LoadingState {
  fetching: boolean;
  adding: boolean;
  updating: boolean;
  deleting: string | null;
}

interface ErrorState {
  message: string;
  type: 'fetch' | 'add' | 'update' | 'delete';
}

export default function DogManager({ session }: { session: AuthSession }) {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    fetching: true,
    adding: false,
    updating: false,
    deleting: null
  });
  const [error, setError] = useState<ErrorState | null>(null);
  
  const [newDog, setNewDog] = useState<DogFormData>({ name: '', breed: '', date_of_birth: '' });
  
  const [editingDogId, setEditingDogId] = useState<string | null>(null);
  const [editDog, setEditDog] = useState<DogFormData>({ name: '', breed: '', date_of_birth: '' });

  // CORRECTION UX : Référence pour le scroll
  const editFormRef = useRef<HTMLDivElement>(null);

  const resetError = () => setError(null);
  const resetNewDogForm = () => setNewDog({ name: '', breed: '', date_of_birth: '' });
  const resetEditForm = () => {
    setEditingDogId(null);
    setEditDog({ name: '', breed: '', date_of_birth: '' });
  };

  const getDogs = useCallback(async () => {
    if (!session?.user?.id) return;
    setLoading(prev => ({ ...prev, fetching: true }));
    setError(null);
    try {
      const { data, error } = await supabase.from('dogs').select('*').eq('owner_id', session.user.id).order('created_at', { ascending: false });
      if (error && error.code !== 'PGRST116') throw new Error(`Erreur base de données: ${error.message}`);
      setDogs(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError({ message: errorMessage, type: 'fetch' });
    } finally {
      setLoading(prev => ({ ...prev, fetching: false }));
    }
  }, [session?.user?.id]);

  useEffect(() => {
    getDogs();
  }, [getDogs]);

  const addDog = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!session?.user?.id || !newDog.name.trim()) return;
    setLoading(prev => ({ ...prev, adding: true }));
    setError(null);
    try {
      const dogData = {
        owner_id: session.user.id,
        name: newDog.name.trim(),
        breed: newDog.breed.trim() || null,
        date_of_birth: newDog.date_of_birth || null,
      };
      const { data, error } = await supabase.from('dogs').insert([dogData]).select().single();
      if (error) throw new Error(error.message);
      setDogs(prev => [data, ...prev]);
      resetNewDogForm();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'ajout';
      setError({ message: errorMessage, type: 'add' });
    } finally {
      setLoading(prev => ({ ...prev, adding: false }));
    }
  }, [session?.user?.id, newDog]);

  const startEditing = useCallback((dog: Dog) => {
    setEditingDogId(dog.dog_id);
    setEditDog({
      name: dog.name,
      breed: dog.breed || '',
      date_of_birth: dog.date_of_birth || ''
    });
    resetError();
  }, []);

  const updateDog = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingDogId || !session?.user?.id || !editDog.name.trim()) return;
    setLoading(prev => ({ ...prev, updating: true }));
    setError(null);
    try {
      // CORRECTION DB : On retire 'updated_at', Supabase s'en charge grâce au trigger
      const updatedData = {
        name: editDog.name.trim(),
        breed: editDog.breed.trim() || null,
        date_of_birth: editDog.date_of_birth || null,
      };
      const { data, error } = await supabase.from('dogs').update(updatedData).eq('dog_id', editingDogId).eq('owner_id', session.user.id).select().single();
      if (error) throw new Error(error.message);
      setDogs(prev => prev.map(dog => dog.dog_id === editingDogId ? data : dog));
      resetEditForm();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la mise à jour';
      setError({ message: errorMessage, type: 'update' });
    } finally {
      setLoading(prev => ({ ...prev, updating: false }));
    }
  }, [editingDogId, session?.user?.id, editDog]);

  const deleteDog = useCallback(async (dogId: string, dogName: string) => {
    if (!window.confirm(`🗑️ Êtes-vous sûr de vouloir supprimer le profil de ${dogName} ?`)) return;
    if (!session?.user?.id) return;
    setLoading(prev => ({ ...prev, deleting: dogId }));
    setError(null);
    try {
      const { error } = await supabase.from('dogs').delete().eq('dog_id', dogId).eq('owner_id', session.user.id);
      if (error) throw new Error(error.message);
      setDogs(prev => prev.filter(dog => dog.dog_id !== dogId));
      if (editingDogId === dogId) resetEditForm();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression';
      setError({ message: errorMessage, type: 'delete' });
    } finally {
      setLoading(prev => ({ ...prev, deleting: null }));
    }
  }, [session?.user?.id, editingDogId]);

  // CORRECTION UX : Effet pour le scroll automatique
  useEffect(() => {
    if (editingDogId && editFormRef.current) {
      editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [editingDogId]);

  const isNewDogValid = useMemo(() => newDog.name.trim().length > 0, [newDog.name]);
  const isEditDogValid = useMemo(() => editDog.name.trim().length > 0, [editDog.name]);
  
  // (Le reste de ton code JSX est excellent, je le conserve tel quel)
  return (
     <>
       {error && ( /* Ton composant d'erreur est bien pensé, on le garde */
         <div className="error-message">
           <span>❌ {error.message}</span>
           <button onClick={resetError}>×</button>
         </div>
       )}
       
       <div className="form-widget">
         <h2>🐕 Mes Chiens ({dogs.length})</h2>
         {dogs.length === 0 ? (
           <div style={{ textAlign: 'center', padding: '20px 0' }}>
             <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🐶</div>
             <p style={{ color: 'var(--color-text-medium)' }}>Aucun chien enregistré.</p>
           </div>
         ) : (
           <div className="dogs-list">
             {dogs.map((dog) => (
               <div key={dog.dog_id} className="dog-card">
                 <div className="dog-info">
                   <div className="dog-name"><span>🐾</span><span>{dog.name}</span></div>
                   <div className="dog-details">
                     {dog.breed && <span><span>🦴</span><span>{dog.breed}</span></span>}
                     {dog.date_of_birth && <span><span>🎂</span><span>Né le {new Date(dog.date_of_birth).toLocaleDateString('fr-FR')}</span></span>}
                   </div>
                 </div>
                 <div className="dog-actions">
                   <button className="button dog-action-btn edit" onClick={() => startEditing(dog)} disabled={loading.updating || !!loading.deleting}>
                     ✏️ Modifier
                   </button>
                   <button className="button dog-action-btn delete" onClick={() => deleteDog(dog.dog_id, dog.name)} disabled={loading.deleting === dog.dog_id || loading.updating}>
                     {loading.deleting === dog.dog_id ? '⏳' : '🗑️'} Supprimer
                   </button>
                 </div>
               </div>
             ))}
           </div>
         )}
       </div>
 
       <div className="form-widget">
         <h3>➕ Ajouter un nouveau chien</h3>
         <form onSubmit={addDog}>
           <div className="form-group">
             <label htmlFor="newDogName">Nom du chien *</label>
             <input id="newDogName" type="text" className="inputField" value={newDog.name} onChange={(e) => setNewDog(prev => ({ ...prev, name: e.target.value }))} placeholder="Rex, Bella, Max..." required disabled={loading.adding}/>
           </div>
           <div className="form-group">
             <label htmlFor="newDogBreed">Race</label>
             <input id="newDogBreed" type="text" className="inputField" value={newDog.breed} onChange={(e) => setNewDog(prev => ({ ...prev, breed: e.target.value }))} placeholder="Golden Retriever, Croisé..." disabled={loading.adding}/>
           </div>
           <div className="form-group">
             <label htmlFor="newDogDob">Date de naissance</label>
             <input id="newDogDob" type="date" className="inputField" value={newDog.date_of_birth} onChange={(e) => setNewDog(prev => ({ ...prev, date_of_birth: e.target.value }))} max={new Date().toISOString().split('T')[0]} disabled={loading.adding}/>
           </div>
           <button className="button" type="submit" disabled={loading.adding || !isNewDogValid}>
             {loading.adding ? '⏳ Ajout en cours...' : '🐕 Ajouter le chien'}
           </button>
         </form>
       </div>
 
       {editingDogId && (
         <div ref={editFormRef} className="form-widget" style={{ border: '2px solid var(--color-primary)' }}>
           <h3>✏️ Modifier le chien</h3>
           <form onSubmit={updateDog}>
             <div className="form-group">
               <label htmlFor="editDogName">Nom du chien *</label>
               <input id="editDogName" type="text" className="inputField" value={editDog.name} onChange={(e) => setEditDog(prev => ({ ...prev, name: e.target.value }))} required disabled={loading.updating}/>
             </div>
             <div className="form-group">
               <label htmlFor="editDogBreed">Race</label>
               <input id="editDogBreed" type="text" className="inputField" value={editDog.breed} onChange={(e) => setEditDog(prev => ({ ...prev, breed: e.target.value }))} disabled={loading.updating}/>
             </div>
             <div className="form-group">
               <label htmlFor="editDogDob">Date de naissance</label>
               <input id="editDogDob" type="date" className="inputField" value={editDog.date_of_birth} onChange={(e) => setEditDog(prev => ({ ...prev, date_of_birth: e.target.value }))} max={new Date().toISOString().split('T')[0]} disabled={loading.updating}/>
             </div>
             <div style={{ display: 'flex', gap: '12px' }}>
               <button className="button" type="submit" disabled={loading.updating || !isEditDogValid}>
                 {loading.updating ? '⏳ Mise à jour...' : '✅ Mettre à jour'}
               </button>
               <button className="button secondary" type="button" onClick={resetEditForm} disabled={loading.updating}>
                 ❌ Annuler
               </button>
             </div>
           </form>
         </div>
       )}
     </>
   );
 }