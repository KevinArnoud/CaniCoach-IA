import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export type SubscriptionStatus = 'free_trial' | 'active_monthly' | 'active_annual' | 'cancelled';

interface SubscriptionContextType {
  status: SubscriptionStatus;
  trialProblemsResolved: number;
  maxTrialProblems: number;
  canUseChat: boolean;
  upgradeToSubscription: (plan: 'monthly' | 'annual') => Promise<void>;
  markProblemResolved: () => void;
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
  const [trialProblemsResolved, setTrialProblemsResolved] = useState(0);
  const maxTrialProblems = 1;

  useEffect(() => {
    // En mode développement, simuler un essai gratuit
    if (user) {
      const savedStatus = localStorage.getItem(`subscription_${user.id}`);
      const savedProblems = localStorage.getItem(`trial_problems_${user.id}`);
      
      if (savedStatus) {
        setStatus(savedStatus as SubscriptionStatus);
      }
      if (savedProblems) {
        setTrialProblemsResolved(parseInt(savedProblems, 10));
      }
    }
  }, [user]);

  const canUseChat = status !== 'free_trial' || trialProblemsResolved < maxTrialProblems;

  const upgradeToSubscription = async (plan: 'monthly' | 'annual') => {
    // Simulation de l'upgrade en mode développement
    const newStatus = plan === 'monthly' ? 'active_monthly' : 'active_annual';
    setStatus(newStatus);
    
    if (user) {
      localStorage.setItem(`subscription_${user.id}`, newStatus);
    }
  };

  const markProblemResolved = () => {
    if (status === 'free_trial') {
      const newCount = trialProblemsResolved + 1;
      setTrialProblemsResolved(newCount);
      
      if (user) {
        localStorage.setItem(`trial_problems_${user.id}`, newCount.toString());
      }
    }
  };

  const resetTrial = () => {
    setTrialProblemsResolved(0);
    setStatus('free_trial');
    if (user) {
      localStorage.removeItem(`subscription_${user.id}`);
      localStorage.removeItem(`trial_problems_${user.id}`);
    }
  };

  const value = {
    status,
    trialProblemsResolved,
    maxTrialProblems,
    canUseChat,
    upgradeToSubscription,
    markProblemResolved,
    resetTrial,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};