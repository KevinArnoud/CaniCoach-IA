import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { userService } from '../services/api';

export type SubscriptionStatus = 'free_trial' | 'active_monthly' | 'active_annual' | 'cancelled';

interface SubscriptionContextType {
  status: SubscriptionStatus;
  trialTopic: string | null;
  canUseChat: boolean;
  upgradeToSubscription: (plan: 'monthly' | 'annual') => Promise<void>;
  setTrialTopic: (topic: string) => void;
  isTopicAllowed: (topic: string) => boolean;
  resetTrial: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [status, setStatus] = useState<SubscriptionStatus>('free_trial');
  const [trialTopic, setTrialTopicState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) {
        setStatus('free_trial');
        setTrialTopicState(null);
        setLoading(false);
        return;
      }

      try {
        // En mode développement, utiliser localStorage comme fallback
        if (!supabase) {
          const savedStatus = localStorage.getItem(`subscription_${user.id}`) as SubscriptionStatus;
          const savedTopic = localStorage.getItem(`trial_topic_${user.id}`);
          
          setStatus(savedStatus || 'free_trial');
          setTrialTopicState(savedTopic || null);
        } else {
          const profile = await userService.getProfile();
          setStatus(profile.subscription?.status || 'free_trial');
          setTrialTopicState(profile.trial_topic || null);
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
        setStatus('free_trial');
        setTrialTopicState(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [user]);

  const canUseChat = status !== 'free_trial' || true; // Toujours autorisé pour l'essai, la logique est dans le chat

  const upgradeToSubscription = async (plan: 'monthly' | 'annual') => {
    try {
      const newStatus = plan === 'monthly' ? 'active_monthly' : 'active_annual';
      
      try {
        await userService.updateProfile({
          subscription: {
            status: newStatus,
            trial_end_date: null,
            stripe_customer_id: null
          }
        });
        setStatus(newStatus);
      } catch (error) {
        console.error('Error updating subscription:', error);
        // Fallback vers localStorage
        setStatus(newStatus);
        localStorage.setItem(`subscription_${user.id}`, newStatus);
      }
    } catch (error) {
      console.error('Erreur lors de l\'upgrade:', error);
    }
  };

  const setTrialTopic = (topic: string) => {
    if (status === 'free_trial' && !trialTopic) {
      setTrialTopicState(topic);
      
      // Sauvegarder via API ou localStorage
      if (user) {
        localStorage.setItem(`trial_topic_${user.id}`, topic);
        
        if (supabase) {
          userService.updateTrialTopic(topic).catch(error => {
            console.error('Error updating trial topic:', error);
          });
        }
      }
    }
  };

  const isTopicAllowed = (topic: string): boolean => {
    if (status !== 'free_trial') return true; // Abonnés peuvent tout faire
    if (!trialTopic) return true; // Premier sujet toujours autorisé
    return topic === trialTopic; // Seul le sujet d'essai est autorisé
  };

  const resetTrial = () => {
    setTrialTopicState(null);
    setStatus('free_trial');
    
    // Réinitialiser localStorage
    if (user) {
      localStorage.removeItem(`subscription_${user.id}`);
      localStorage.removeItem(`trial_topic_${user.id}`);
      
      // Réinitialiser via API si disponible
      if (supabase) {
        userService.updateProfile({
          subscription: {
            status: 'free_trial',
            trial_end_date: null,
            stripe_customer_id: null
          },
          trial_topic: null
        }).catch(error => {
          console.error('Error resetting trial:', error);
        });
      }
    }
  };

  const value = {
    status,
    trialTopic,
    canUseChat,
    upgradeToSubscription,
    setTrialTopic,
    isTopicAllowed,
    resetTrial,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};