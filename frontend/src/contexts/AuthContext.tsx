import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mode développement simple
    if (!supabase) {
      console.log('Mode développement - Supabase non configuré');
      const savedUser = localStorage.getItem('canicoach_user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser as User);
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem('canicoach_user');
        }
      }
      setLoading(false);
      return;
    }

    // Mode production avec Supabase
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      // Mode développement
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockUser = { 
          id: 'dev-user-123', 
          email, 
          created_at: new Date().toISOString() 
        };
        localStorage.setItem('canicoach_user', JSON.stringify(mockUser));
        setUser(mockUser as User);
        
        return { error: null };
      } catch (error) {
        return { error };
      } finally {
        setLoading(false);
      }
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      // Mode développement
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockUser = { 
          id: 'dev-user-123', 
          email, 
          created_at: new Date().toISOString() 
        };
        localStorage.setItem('canicoach_user', JSON.stringify(mockUser));
        setUser(mockUser as User);
        
        return { error: null };
      } catch (error) {
        return { error };
      } finally {
        setLoading(false);
      }
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    if (!supabase) {
      try {
        setLoading(true);
        localStorage.removeItem('canicoach_user');
        setUser(null);
        return { error: null };
      } catch (error) {
        return { error };
      } finally {
        setLoading(false);
      }
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    if (!supabase) {
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return { error };
    } catch (error) {
      return { error };
    }
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