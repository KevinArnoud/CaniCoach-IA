/*
  # Create users table

  1. New Tables
    - `users`
      - `user_id` (uuid, primary key)
      - `email` (text, unique)
      - `password_hash` (text)
      - `subscription` (jsonb with status, trial_end_date, stripe_customer_id)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `users` table
    - Add policies for authenticated users to manage their own data
*/

CREATE TABLE IF NOT EXISTS users (
  user_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  subscription jsonb DEFAULT '{"status": "free_trial", "trial_end_date": null, "stripe_customer_id": null}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);