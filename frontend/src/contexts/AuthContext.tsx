import React, { createContext, useContext, useState } from 'react';

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
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    console.log('Mode développement: connexion simulée');
    setUser(mockUser);
    return { error: null };
  };

  const signUp = async (email: string, password: string) => {
    console.log('Mode développement: inscription simulée');
    setUser(mockUser);
    return { error: null };
  };

  const signOut = async () => {
    console.log('Mode développement: déconnexion simulée');
    setUser(null);
    return { error: null };
  };

  const resetPassword = async (email: string) => {
    console.log('Mode développement: reset mot de passe simulé');
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