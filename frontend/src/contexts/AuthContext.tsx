import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
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
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si Supabase est configuré
    if (!supabase) {
      console.warn('Supabase not configured, using mock auth');
      // Fallback vers le mock pour le développement
      const mockUser = {
        id: 'dev-user-123',
        email: 'test@canicoach.dev',
        created_at: new Date().toISOString(),
      };
      
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

    // Obtenir la session initiale
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN' && session?.user) {
          // Créer ou mettre à jour le profil utilisateur
          await createOrUpdateUserProfile(session.user);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const createOrUpdateUserProfile = async (user: User) => {
    if (!supabase) return;

    try {
      const { error } = await supabase
        .from('users')
        .upsert({
          user_id: user.id,
          email: user.email,
          created_at: user.created_at,
          subscription: {
            status: 'free_trial',
            trial_end_date: null,
            stripe_customer_id: null
          }
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error creating/updating user profile:', error);
      }
    } catch (error) {
      console.error('Error in createOrUpdateUserProfile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      // Fallback mock pour le développement
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockUser = { id: 'dev-user-123', email, created_at: new Date().toISOString() };
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error('Sign in catch error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      // Fallback mock pour le développement
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockUser = { id: 'dev-user-123', email, created_at: new Date().toISOString() };
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        return { error };
      }

      // Si l'email confirmation est désactivée, l'utilisateur sera connecté immédiatement
      if (data.user && !data.user.email_confirmed_at) {
        console.log('User created, waiting for email confirmation');
      }

      return { error: null };
    } catch (error) {
      console.error('Sign up catch error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    if (!supabase) {
      // Fallback mock pour le développement
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
      
      if (error) {
        console.error('Sign out error:', error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error('Sign out catch error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    if (!supabase) {
      // Mock pour le développement
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });

      if (error) {
        console.error('Reset password error:', error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error('Reset password catch error:', error);
      return { error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};