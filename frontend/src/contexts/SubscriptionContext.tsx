import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

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

  useEffect(() => {
    // En mode développement, simuler un essai gratuit
    if (user) {
      const savedStatus = localStorage.getItem(`subscription_${user.id}`);
      const savedTopic = localStorage.getItem(`trial_topic_${user.id}`);
      
      if (savedStatus) {
        setStatus(savedStatus as SubscriptionStatus);
      }
      if (savedTopic) {
        setTrialTopicState(savedTopic);
      }
    }
  }, [user]);

  const canUseChat = status !== 'free_trial' || true; // Toujours autorisé pour l'essai, la logique est dans le chat

  const upgradeToSubscription = async (plan: 'monthly' | 'annual') => {
    try {
      // Simulation de l'upgrade en mode développement
      const newStatus = plan === 'monthly' ? 'active_monthly' : 'active_annual';
      setStatus(newStatus);
      
      if (user) {
        localStorage.setItem(`subscription_${user.id}`, newStatus);
      }
    } catch (error) {
      console.error('Erreur lors de l\'upgrade:', error);
    }
  };

  const setTrialTopic = (topic: string) => {
    if (status === 'free_trial' && !trialTopic) {
      setTrialTopicState(topic);
      if (user) {
        localStorage.setItem(`trial_topic_${user.id}`, topic);
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
    if (user) {
      localStorage.removeItem(`subscription_${user.id}`);
      localStorage.removeItem(`trial_topic_${user.id}`);
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