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

  // Initialisation UNIQUE au montage - PAS DE BOUCLE
  useEffect(() => {
    const initAuth = () => {
      try {
        const savedUser = localStorage.getItem('canicoach_user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('AuthProvider: Erreur parsing user', error);
        localStorage.removeItem('canicoach_user');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []); // TABLEAU VIDE = une seule fois au montage

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simulation d'un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userToSet = { ...mockUser, email };
      localStorage.setItem('canicoach_user', JSON.stringify(userToSet));
      setUser(userToSet);
      
      return { error: null };
    } catch (error) {
      console.error('AuthProvider: Erreur signIn', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simulation d'un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userToSet = { ...mockUser, email };
      localStorage.setItem('canicoach_user', JSON.stringify(userToSet));
      setUser(userToSet);
      
      return { error: null };
    } catch (error) {
      console.error('AuthProvider: Erreur signUp', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      localStorage.removeItem('canicoach_user');
      setUser(null);
      
      return { error: null };
    } catch (error) {
      console.error('AuthProvider: Erreur signOut', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    // Simulation pour le mode développement
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};