import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User, AuthError } from '@supabase/supabase-js';

// Mock user for development mode
const mockUser: User = {
  id: 'dev-user-123',
  email: 'test@canicoach.dev',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  aud: 'authenticated',
  role: 'authenticated',
  app_metadata: {},
  user_metadata: {},
  identities: [],
  email_confirmed_at: new Date().toISOString(),
  phone_confirmed_at: null,
  confirmed_at: new Date().toISOString(),
  last_sign_in_at: new Date().toISOString(),
  recovery_sent_at: null,
  new_email: null,
  new_phone: null,
  invited_at: null,
  action_link: null,
  email_change_sent_at: null,
  phone_change_sent_at: null,
  phone: null,
  email_change_token_new: null,
  email_change_token_current: null,
  phone_change_token: null,
  is_anonymous: false
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // En mode développement, on démarre sans utilisateur connecté
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      // Mock successful sign in for development
      console.log('Mode développement: connexion simulée');
      setUser(mockUser);
      return { error: null };
    }
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      // Mock successful sign up for development
      console.log('Mode développement: inscription simulée');
      setUser(mockUser);
      return { error: null };
    }
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    if (!supabase) {
      // Mock sign out for development
      console.log('Mode développement: déconnexion simulée');
      setUser(null);
      return { error: null };
    }
    
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const resetPassword = async (email: string) => {
    if (!supabase) {
      // Mock password reset for development
      console.log('Mode développement: reset mot de passe simulé');
      return { error: null };
    }
    
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    return { error };
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