// src/utils/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// Récupère les variables d'environnement pour l'URL et la clé d'API Supabase.
// Ces variables devront être définies dans un fichier .env à la racine de ton projet.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Vérifie si les variables d'environnement sont bien définies.
// C'est une bonne pratique pour éviter des erreurs si elles manquent.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.');
}

// Crée et exporte l'instance du client Supabase.
// Cette instance sera utilisée partout dans ton application pour interagir avec Supabase.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);