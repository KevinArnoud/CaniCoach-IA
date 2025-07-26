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
        setLoading(false);
        return;
      }

      try {
        const profile = await userService.getProfile();
        setStatus(profile.subscription?.status || 'free_trial');
        setTrialTopicState(profile.trial_topic || null);
      } catch (error) {
        console.error('Error loading user profile:', error);
        // Fallback vers localStorage en cas d'erreur
        const savedStatus = localStorage.getItem(`subscription_${user.id}`);
        const savedTopic = localStorage.getItem(`trial_topic_${user.id}`);
        
        if (savedStatus) {
          setStatus(savedStatus as SubscriptionStatus);
        }
        if (savedTopic) {
          setTrialTopicState(savedTopic);
        }
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
      
      // Sauvegarder via API
      userService.updateTrialTopic(topic).catch(error => {
        console.error('Error updating trial topic:', error);
        // Fallback vers localStorage
        localStorage.setItem(`trial_topic_${user.id}`, topic);
      });
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
    
    // Réinitialiser via API
    userService.updateProfile({
      subscription: {
        status: 'free_trial',
        trial_end_date: null,
        stripe_customer_id: null
      },
      trial_topic: null
    }).catch(error => {
      console.error('Error resetting trial:', error);
      // Fallback vers localStorage
      localStorage.removeItem(`subscription_${user.id}`);
      localStorage.removeItem(`trial_topic_${user.id}`);
    });
  };

  const value = {
    status,
    trialTopic,
    canUseChat,
    upgradeToSubscription,
    setTrialTopic,
    isTopicAllowed,
    resetTrial,
    loading,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};