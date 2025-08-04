// src/DogManager.tsx - Version Complète et Corrigée
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { supabase } from './utils/supabaseClient';

type AuthSession = Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session'];

interface Dog {
  dog_id: string;
  owner_id: string;
  name: string;
  breed: string | null;
  date_of_birth: string | null;
  // NOUVEAUX CHAMPS
  photo_url?: string | null;
  origin?: 'breeder' | 'shelter' | 'individual' | 'street' | 'other' | null;
  health_issues?: string | null;
  background_story?: string | null;
  personality_traits?: string | null;
  training_level?: 'beginner' | 'intermediate' | 'advanced' | null;
  created_at?: string;
  updated_at?: string;
}

interface DogFormData {
  name: string;
  breed: string;
  date_of_birth: string;
  origin: string;
  health_issues: string;
  background_story: string;
  personality_traits: string;
  training_level: string;
}

interface LoadingState {
  fetching: boolean;
  adding: boolean;
  updating: boolean;
  deleting: string | null;
  uploading: boolean;
}

interface ErrorState {
  message: string;
  type: 'fetch' | 'add' | 'update' | 'delete' | 'upload';
}

export default function DogManager({ session }: { session: AuthSession }) {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    fetching: true,
    adding: false,
    updating: false,
    deleting: null,
    uploading: false
  });
  const [error, setError] = useState<ErrorState | null>(null);
  
  const [newDog, setNewDog] = useState<DogFormData>({ 
    name: '', 
    breed: '', 
    date_of_birth: '', 
    origin: '',
    health_issues: '',
    background_story: '',
    personality_traits: '',
    training_level: ''
  });
  
  const [editingDogId, setEditingDogId] = useState<string | null>(null);
  const [editDog, setEditDog] = useState<DogFormData>({ 
    name: '', 
    breed: '', 
    date_of_birth: '',
    origin: '',
    health_issues: '',
    background_story: '',
    personality_traits: '',
    training_level: ''
  });

  // États pour l'upload de photos
  const [newDogPhoto, setNewDogPhoto] = useState<File | null>(null);
  const [newDogPhotoPreview, setNewDogPhotoPreview] = useState<string | null>(null);
  const [editDogPhoto, setEditDogPhoto] = useState<File | null>(null);
  const [editDogPhotoPreview, setEditDogPhotoPreview] = useState<string | null>(null);

  const editFormRef = useRef<HTMLDivElement>(null);
  const newDogPhotoInputRef = useRef<HTMLInputElement>(null);
  const editDogPhotoInputRef = useRef<HTMLInputElement>(null);

  const resetError = () => setError(null);
  const resetNewDogForm = () => {
    setNewDog({ 
      name: '', 
      breed: '', 
      date_of_birth: '', 
      origin: '',
      health_issues: '',
      background_story: '',
      personality_traits: '',
      training_level: ''
    });
    setNewDogPhoto(null);
    setNewDogPhotoPreview(null);
    if (newDogPhotoInputRef.current) newDogPhotoInputRef.current.value = '';
  };

  const resetEditForm = () => {
    setEditingDogId(null);
    setEditDog({ 
      name: '', 
      breed: '', 
      date_of_birth: '',
      origin: '',
      health_issues: '',
      background_story: '',
      personality_traits: '',
      training_level: ''
    });
    setEditDogPhoto(null);
    setEditDogPhotoPreview(null);
    if (editDogPhotoInputRef.current) editDogPhotoInputRef.current.value = '';
  };

  // Fonction d'upload de photo vers Supabase Storage
  const uploadPhoto = async (file: File, dogId: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${dogId}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('dog-photos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('dog-photos')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Erreur upload photo:', error);
      return null;
    }
  };

  // Gestion des previews de photos
  const handlePhotoChange = (file: File | null, isEdit: boolean = false) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('L\'image ne doit pas dépasser 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        if (isEdit) {
          setEditDogPhoto(file);
          setEditDogPhotoPreview(result);
        } else {
          setNewDogPhoto(file);
          setNewDogPhotoPreview(result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      if (isEdit) {
        setEditDogPhoto(null);
        setEditDogPhotoPreview(null);
      } else {
        setNewDogPhoto(null);
        setNewDogPhotoPreview(null);
      }
    }
  };

  const getDogs = useCallback(async () => {
    if (!session?.user?.id) return;
    setLoading(prev => ({ ...prev, fetching: true }));
    setError(null);
    try {
      const { data, error } = await supabase
        .from('dogs')
        .select('*')
        .eq('owner_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (error && error.code !== 'PGRST116') throw new Error(`Erreur base de données: ${error.message}`);
      setDogs(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement';
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
    if (!session?.user?.id) return;
    setLoading(prev => ({ ...prev, adding: true }));
    setError(null);
    
    try {
      // Créer d'abord le chien pour avoir un ID
      const { data: dogData, error: dogError } = await supabase
        .from('dogs')
        .insert({
          owner_id: session.user.id,
          name: newDog.name.trim(),
          breed: newDog.breed.trim() || null,
          date_of_birth: newDog.date_of_birth || null,
          origin: newDog.origin || null,
          health_issues: newDog.health_issues.trim() || null,
          background_story: newDog.background_story.trim() || null,
          personality_traits: newDog.personality_traits.trim() || null,
          training_level: newDog.training_level || null
        })
        .select()
        .single();

      if (dogError) throw dogError;

      let photoUrl = null;
      
      // Upload de la photo si présente
      if (newDogPhoto) {
        setLoading(prev => ({ ...prev, uploading: true }));
        photoUrl = await uploadPhoto(newDogPhoto, dogData.dog_id);
        
        if (photoUrl) {
          const { error: updateError } = await supabase
            .from('dogs')
            .update({ photo_url: photoUrl })
            .eq('dog_id', dogData.dog_id);
          
          if (updateError) console.warn('Erreur mise à jour photo URL:', updateError);
        }
      }

      setDogs(prev => [{ ...dogData, photo_url: photoUrl }, ...prev]);
      resetNewDogForm();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'ajout';
      setError({ message: errorMessage, type: 'add' });
    } finally {
      setLoading(prev => ({ ...prev, adding: false, uploading: false }));
    }
  }, [session?.user?.id, newDog, newDogPhoto]);

  const startEditing = useCallback((dog: Dog) => {
    setEditingDogId(dog.dog_id);
    setEditDog({
      name: dog.name,
      breed: dog.breed || '',
      date_of_birth: dog.date_of_birth || '',
      origin: dog.origin || '',
      health_issues: dog.health_issues || '',
      background_story: dog.background_story || '',
      personality_traits: dog.personality_traits || '',
      training_level: dog.training_level || ''
    });
    setEditDogPhotoPreview(dog.photo_url);
    setEditDogPhoto(null);
  }, []);

  const updateDog = useCallback(async () => {
    if (!editingDogId || !session?.user?.id) return;
    setLoading(prev => ({ ...prev, updating: true }));
    setError(null);
    
    try {
      let photoUrl = editDogPhotoPreview;
      
      // Upload nouvelle photo si présente
      if (editDogPhoto) {
        setLoading(prev => ({ ...prev, uploading: true }));
        const newPhotoUrl = await uploadPhoto(editDogPhoto, editingDogId);
        if (newPhotoUrl) photoUrl = newPhotoUrl;
      }

      const { data, error } = await supabase
        .from('dogs')
        .update({
          name: editDog.name.trim(),
          breed: editDog.breed.trim() || null,
          date_of_birth: editDog.date_of_birth || null,
          origin: editDog.origin || null,
          health_issues: editDog.health_issues.trim() || null,
          background_story: editDog.background_story.trim() || null,
          personality_traits: editDog.personality_traits.trim() || null,
          training_level: editDog.training_level || null,
          photo_url: photoUrl,
          updated_at: new Date().toISOString()
        })
        .eq('dog_id', editingDogId)
        .eq('owner_id', session.user.id)
        .select()
        .single();

      if (error) throw error;
      
      setDogs(prev => prev.map(dog => dog.dog_id === editingDogId ? data : dog));
      resetEditForm();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la mise à jour';
      setError({ message: errorMessage, type: 'update' });
    } finally {
      setLoading(prev => ({ ...prev, updating: false, uploading: false }));
    }
  }, [editingDogId, session?.user?.id, editDog, editDogPhoto, editDogPhotoPreview]);

  const deleteDog = useCallback(async (dogId: string, dogName: string) => {
    if (!window.confirm(`🗑️ Êtes-vous sûr de vouloir supprimer le profil de ${dogName} ?`)) return;
    if (!session?.user?.id) return;
    setLoading(prev => ({ ...prev, deleting: dogId }));
    setError(null);
    
    try {
      const { error } = await supabase
        .from('dogs')
        .delete()
        .eq('dog_id', dogId)
        .eq('owner_id', session.user.id);
      
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

  useEffect(() => {
    if (editingDogId && editFormRef.current) {
      editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [editingDogId]);

  const isNewDogValid = useMemo(() => newDog.name.trim().length > 0, [newDog.name]);
  const isEditDogValid = useMemo(() => editDog.name.trim().length > 0, [editDog.name]);

  const originOptions = [
    { value: '', label: 'Non spécifiée' },
    { value: 'breeder', label: 'Élevage' },
    { value: 'shelter', label: 'Refuge/SPA' },
    { value: 'individual', label: 'Particulier' },
    { value: 'street', label: 'Trouvé errant' },
    { value: 'other', label: 'Autre' }
  ];

  const trainingLevelOptions = [
    { value: '', label: 'Non évalué' },
    { value: 'beginner', label: 'Débutant' },
    { value: 'intermediate', label: 'Intermédiaire' },
    { value: 'advanced', label: 'Avancé' }
  ];

  // Component pour l'upload de photo
  const PhotoUpload = ({ 
    preview, 
    onFileChange, 
    inputRef, 
    disabled = false 
  }: {
    preview: string | null;
    onFileChange: (file: File | null) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    disabled?: boolean;
  }) => (
    <div className="photo-upload-container">
      <label>Photo de votre chien</label>
      
      <div 
        className="photo-preview-area" 
        onClick={() => !disabled && inputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="Aperçu" className="photo-preview" />
        ) : (
          <div className="photo-placeholder">
            <span>📷</span>
            <p>Cliquez pour ajouter une photo</p>
          </div>
        )}
      </div>
      
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => onFileChange(e.target.files?.[0] || null)}
        disabled={disabled}
        style={{ display: 'none' }}
      />
      
      {preview && (
        <button 
          type="button" 
          onClick={() => {
            onFileChange(null);
            if (inputRef.current) inputRef.current.value = '';
          }}
          className="button secondary"
          disabled={disabled}
          style={{ marginTop: 'var(--spacing-sm)', padding: '6px 12px', fontSize: '0.8rem' }}
        >
          🗑️ Supprimer la photo
        </button>
      )}
    </div>
  );

  return (
    <>
      {error && (
        <div className="error-message">
          <span>❌ {error.message}</span>
          <button onClick={resetError}>×</button>
        </div>
      )}
      
      <div className="form-widget">
        <h2>🐕 Mes Chiens ({dogs.length})</h2>
        
        {dogs.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🐕</div>
            <p>Aucun chien enregistré. Ajoutez le profil de votre compagnon ci-dessous !</p>
          </div>
        ) : (
          <div className="dogs-list">
            {dogs.map(dog => (
              <div key={dog.dog_id} className="dog-card">
                <div className="dog-info">
                  {dog.photo_url && (
                    <img src={dog.photo_url} alt={dog.name} className="dog-avatar" />
                  )}
                  <div className="dog-details">
                    <h4>{dog.name}</h4>
                    <div className="dog-metadata">
                      {dog.breed && <span>🏷️ {dog.breed}</span>}
                      {dog.date_of_birth && (
                        <span>🎂 {new Date().getFullYear() - new Date(dog.date_of_birth).getFullYear()} ans</span>
                      )}
                      {dog.origin && (
                        <span>📍 {originOptions.find(o => o.value === dog.origin)?.label}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="dog-actions">
                  <button 
                    className="dog-action-btn edit" 
                    onClick={() => startEditing(dog)}
                    disabled={loading.updating || loading.deleting === dog.dog_id}
                  >
                    ✏️ Modifier
                  </button>
                  <button 
                    className="dog-action-btn delete" 
                    onClick={() => deleteDog(dog.dog_id, dog.name)}
                    disabled={loading.deleting === dog.dog_id || loading.updating}
                  >
                    {loading.deleting === dog.dog_id ? '⏳' : '🗑️'} Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Formulaire d'ajout */}
        <div className="add-dog-section">
          <h3>➕ Ajouter un nouveau chien</h3>
          <form onSubmit={addDog}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="new-dog-name">Nom *</label>
                <input
                  id="new-dog-name"
                  type="text"
                  className="inputField"
                  value={newDog.name}
                  onChange={(e) => setNewDog(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Rex, Luna, Max..."
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="new-dog-breed">Race</label>
                <input
                  id="new-dog-breed"
                  type="text"
                  className="inputField"
                  value={newDog.breed}
                  onChange={(e) => setNewDog(prev => ({ ...prev, breed: e.target.value }))}
                  placeholder="Labrador, Croisé..."
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="new-dog-birth">Date de naissance</label>
                <input
                  id="new-dog-birth"
                  type="date"
                  className="inputField"
                  value={newDog.date_of_birth}
                  onChange={(e) => setNewDog(prev => ({ ...prev, date_of_birth: e.target.value }))}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="new-dog-origin">Provenance</label>
                <select
                  id="new-dog-origin"
                  className="inputField"
                  value={newDog.origin}
                  onChange={(e) => setNewDog(prev => ({ ...prev, origin: e.target.value }))}
                >
                  {originOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <PhotoUpload
              preview={newDogPhotoPreview}
              onFileChange={(file) => handlePhotoChange(file, false)}
              inputRef={newDogPhotoInputRef}
              disabled={loading.adding || loading.uploading}
            />

            <div className="form-group">
              <label htmlFor="new-dog-health">Problèmes de santé connus</label>
              <textarea
                id="new-dog-health"
                className="inputField"
                rows={2}
                value={newDog.health_issues}
                onChange={(e) => setNewDog(prev => ({ ...prev, health_issues: e.target.value }))}
                placeholder="Allergies, problèmes articulaires, médicaments..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="new-dog-background">Historique important</label>
              <textarea
                id="new-dog-background"
                className="inputField"
                rows={2}
                value={newDog.background_story}
                onChange={(e) => setNewDog(prev => ({ ...prev, background_story: e.target.value }))}
                placeholder="Traumatismes, abandon, particularités de son passé..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="new-dog-personality">Traits de personnalité</label>
                <input
                  id="new-dog-personality"
                  type="text"
                  className="inputField"
                  value={newDog.personality_traits}
                  onChange={(e) => setNewDog(prev => ({ ...prev, personality_traits: e.target.value }))}
                  placeholder="Timide, joueur, dominant, anxieux..."
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="new-dog-training">Niveau de dressage</label>
                <select
                  id="new-dog-training"
                  className="inputField"
                  value={newDog.training_level}
                  onChange={(e) => setNewDog(prev => ({ ...prev, training_level: e.target.value }))}
                >
                  {trainingLevelOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              className="button" 
              type="submit" 
              disabled={!isNewDogValid || loading.adding || loading.uploading}
            >
              {loading.uploading ? '📤 Upload en cours...' : loading.adding ? '⏳ Ajout...' : '✅ Ajouter ce chien'}
            </button>
          </form>
        </div>
      </div>

      {/* Formulaire d'édition */}
      {editingDogId && (
        <div ref={editFormRef} className="form-widget edit-form">
          <h3>✏️ Modifier le profil</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Nom *</label>
              <input
                type="text"
                className="inputField"
                value={editDog.name}
                onChange={(e) => setEditDog(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Race</label>
              <input
                type="text"
                className="inputField"
                value={editDog.breed}
                onChange={(e) => setEditDog(prev => ({ ...prev, breed: e.target.value }))}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date de naissance</label>
              <input
                type="date"
                className="inputField"
                value={editDog.date_of_birth}
                onChange={(e) => setEditDog(prev => ({ ...prev, date_of_birth: e.target.value }))}
              />
            </div>
            
            <div className="form-group">
              <label>Provenance</label>
              <select
                className="inputField"
                value={editDog.origin}
                onChange={(e) => setEditDog(prev => ({ ...prev, origin: e.target.value }))}
              >
                {originOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <PhotoUpload
            preview={editDogPhotoPreview}
            onFileChange={(file) => handlePhotoChange(file, true)}
            inputRef={editDogPhotoInputRef}
            disabled={loading.updating || loading.uploading}
          />

          <div className="form-group">
            <label>Problèmes de santé connus</label>
            <textarea
              className="inputField"
              rows={2}
              value={editDog.health_issues}
              onChange={(e) => setEditDog(prev => ({ ...prev, health_issues: e.target.value }))}
              placeholder="Allergies, problèmes articulaires, médicaments..."
            />
          </div>

          <div className="form-group">
            <label>Historique important</label>
            <textarea
              className="inputField"
              rows={2}
              value={editDog.background_story}
              onChange={(e) => setEditDog(prev => ({ ...prev, background_story: e.target.value }))}
              placeholder="Traumatismes, abandon, particularités de son passé..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Traits de personnalité</label>
              <input
                type="text"
                className="inputField"
                value={editDog.personality_traits}
                onChange={(e) => setEditDog(prev => ({ ...prev, personality_traits: e.target.value }))}
                placeholder="Timide, joueur, dominant, anxieux..."
              />
            </div>
            
            <div className="form-group">
              <label>Niveau de dressage</label>
              <select
                className="inputField"
                value={editDog.training_level}
                onChange={(e) => setEditDog(prev => ({ ...prev, training_level: e.target.value }))}
              >
                {trainingLevelOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button 
              className="button" 
              onClick={updateDog}
              disabled={!isEditDogValid || loading.updating || loading.uploading}
            >
              {loading.uploading ? '📤 Upload...' : loading.updating ? '⏳ Mise à jour...' : '✅ Sauvegarder'}
            </button>
            <button 
              className="button secondary" 
              onClick={resetEditForm}
              disabled={loading.updating || loading.uploading}
            >
              ❌ Annuler
            </button>
          </div>
        </div>
      )}
    </>
  );
}