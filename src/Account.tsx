// src/Account.tsx
import { useState, useEffect } from 'react';
import { supabase } from './utils/supabaseClient';
type AuthSession = Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session'];
import DogManager from './DogManager';

export default function Account({ session }: { session: AuthSession }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }

      setLoading(false);
    }

    getProfile();
  }, [session]);

  async function updateProfile(event: React.FormEvent) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      alert('Profil mis à jour !');
    }
    setLoading(false);
  }

  return (
    <div>
      {loading ? (
        <div className="form-widget">
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
            <p>Chargement du profil...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Section Profil Utilisateur */}
          <div className="form-widget">
            <h2>👤 Mon Profil</h2>
            
            <div className="user-info-section">
              <div className="user-email">📧 {session.user.email}</div>
            </div>

            <form onSubmit={updateProfile}>
              <div className="form-group">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                  id="username"
                  type="text"
                  className="inputField"
                  value={username || ''}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Votre nom d'utilisateur"
                />
              </div>

              <div className="form-group">
                <label htmlFor="website">Site web</label>
                <input
                  id="website"
                  type="url"
                  className="inputField"
                  value={website || ''}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://votre-site.com"
                />
              </div>

              <div className="form-group">
                <button
                  className="button"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? '⏳ Mise à jour...' : '✅ Mettre à jour le profil'}
                </button>
              </div>
            </form>
          </div>

          {/* Section Gestion des Chiens */}
          <DogManager session={session} />

          {/* Section Déconnexion */}
          <div className="form-widget">
            <h3>⚙️ Paramètres</h3>
            <button
              className="button secondary"
              onClick={() => supabase.auth.signOut()}
            >
              🚪 Se déconnecter
            </button>
          </div>
        </>
      )}
    </div>
  );
}