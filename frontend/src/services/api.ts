import { supabase } from '../lib/supabase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Fonction utilitaire pour obtenir le token d'authentification
const getAuthToken = async (): Promise<string | null> => {
  if (!supabase) return 'mock-token'; // Token mock pour le développement
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Fonction utilitaire pour faire des requêtes API
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = await getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Services API
export const userService = {
  getProfile: async () => {
    return apiRequest('/users/profile');
  },

  updateProfile: async (data: { subscription?: any; trial_topic?: string }) => {
    return apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  updateTrialTopic: async (topic: string) => {
    return apiRequest('/users/trial-topic', {
      method: 'PUT',
      body: JSON.stringify({ topic }),
    });
  },
};

export const dogService = {
  getUserDogs: async () => {
    return apiRequest('/dogs');
  },

  createDog: async (dogData: {
    name: string;
    breed: string;
    date_of_birth?: string;
    background?: string;
    health_issues?: string;
    photo_url?: string;
  }) => {
    return apiRequest('/dogs', {
      method: 'POST',
      body: JSON.stringify(dogData),
    });
  },

  updateDog: async (dogId: string, dogData: Partial<{
    name: string;
    breed: string;
    date_of_birth: string;
    background: string;
    health_issues: string;
    photo_url: string;
  }>) => {
    return apiRequest(`/dogs/${dogId}`, {
      method: 'PUT',
      body: JSON.stringify(dogData),
    });
  },

  deleteDog: async (dogId: string) => {
    return apiRequest(`/dogs/${dogId}`, {
      method: 'DELETE',
    });
  },
};

export const knowledgeService = {
  getKnowledgeBase: async () => {
    return apiRequest('/knowledge');
  },

  findTopicByKeywords: async (message: string) => {
    return apiRequest('/knowledge/find-topic', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },
};

// Service de santé pour vérifier la connexion API
export const healthService = {
  checkHealth: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },
};