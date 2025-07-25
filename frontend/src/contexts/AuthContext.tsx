import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock user for development mode
const mockUser = {
  id: 'dev-user-123',
  email: 'test@canicoach.dev',
  created_at: new Date().toISOString(),
};

interface AuthContextType {
  user: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<{ error: any | null }>;
  resetPassword: (email: string) => Promise<{ error: any | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialisation simple au montage
  useEffect(() => {
    console.log('AuthProvider: Initialisation');
    // Vérifier s'il y a un utilisateur sauvegardé
    const savedUser = localStorage.getItem('canicoach_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log('AuthProvider: Utilisateur trouvé dans localStorage', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('AuthProvider: Erreur parsing user', error);
        localStorage.removeItem('canicoach_user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('AuthProvider: signIn appelé', { email });
    try {
      setLoading(true);
      
      // Simulation d'une connexion réussie en mode dev
      const userToSet = { ...mockUser, email };
      
      // Sauvegarder dans localStorage
      localStorage.setItem('canicoach_user', JSON.stringify(userToSet));
      
      // Mettre à jour l'état
      setUser(userToSet);
      
      console.log('AuthProvider: Connexion réussie', userToSet);
      return { error: null };
    } catch (error) {
      console.error('AuthProvider: Erreur signIn', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    console.log('AuthProvider: signUp appelé', { email });
    try {
      setLoading(true);
      
      // Simulation d'une inscription réussie en mode dev
      const userToSet = { ...mockUser, email };
      
      // Sauvegarder dans localStorage
      localStorage.setItem('canicoach_user', JSON.stringify(userToSet));
      
      // Mettre à jour l'état
      setUser(userToSet);
      
      console.log('AuthProvider: Inscription réussie', userToSet);
      return { error: null };
    } catch (error) {
      console.error('AuthProvider: Erreur signUp', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    console.log('AuthProvider: signOut appelé');
    try {
      setLoading(true);
      
      // Supprimer de localStorage
      localStorage.removeItem('canicoach_user');
      
      // Mettre à jour l'état
      setUser(null);
      
      console.log('AuthProvider: Déconnexion réussie');
      return { error: null };
    } catch (error) {
      console.error('AuthProvider: Erreur signOut', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    console.log('AuthProvider: resetPassword appelé', { email });
    return { error: null };
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  console.log('AuthProvider render - user:', user, 'loading:', loading);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};