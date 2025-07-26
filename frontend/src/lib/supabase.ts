import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Mode développement - pas de warning si Supabase n'est pas configuré
const isDevelopment = import.meta.env.DEV;

export const supabase = null; // Désactiver Supabase en mode développement

export type { User } from '@supabase/supabase-js';