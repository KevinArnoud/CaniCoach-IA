/*
  # Create dogs table

  1. New Tables
    - `dogs`
      - `dog_id` (text, primary key)
      - `owner_id` (uuid, foreign key to auth.users)
      - `name` (text)
      - `photo_url` (text, optional)
      - `breed` (text, optional)
      - `date_of_birth` (date, optional)
      - `background` (text, optional)
      - `health_issues` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `dogs` table
    - Add policy for users to manage their own dogs
    - Add index on owner_id for performance
*/

CREATE TABLE IF NOT EXISTS dogs (
  dog_id text PRIMARY KEY DEFAULT (gen_random_uuid())::text,
  owner_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  photo_url text,
  breed text,
  date_of_birth date,
  background text,
  health_issues text,
  created_at timestamptz DEFAULT now()
);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_dogs_owner_id ON dogs(owner_id);

ALTER TABLE dogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own dogs"
  ON dogs
  FOR ALL
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);