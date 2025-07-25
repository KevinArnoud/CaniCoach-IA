/*
  # Ajouter le champ trial_topic pour l'essai gratuit

  1. Modifications
    - Ajouter le champ `trial_topic` à la table `users`
    - Ce champ stocke le sujet de l'essai gratuit (null par défaut)
    - Permet de suivre sur quel sujet l'utilisateur peut continuer gratuitement

  2. Sécurité
    - Pas de changement aux politiques RLS existantes
    - Le champ est accessible aux utilisateurs authentifiés
*/

-- Ajouter le champ trial_topic à la table users
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'trial_topic'
  ) THEN
    ALTER TABLE users ADD COLUMN trial_topic text DEFAULT null;
  END IF;
END $$;

-- Créer un index pour optimiser les requêtes sur trial_topic
CREATE INDEX IF NOT EXISTS idx_users_trial_topic ON users(trial_topic);