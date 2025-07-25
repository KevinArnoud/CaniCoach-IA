/*
  # Create knowledge base table

  1. New Tables
    - `knowledge_base`
      - `topic_id` (text, primary key)
      - `topic_name` (text)
      - `target_audience` (text array for 'puppy', 'adult')
      - `trigger_keywords` (text array)
      - `validation_response` (text)
      - `explanation` (text)
      - `action_plan` (jsonb array of steps)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `knowledge_base` table
    - Add policy for authenticated users to read knowledge base
    - Add indexes on arrays for performance
*/

CREATE TABLE IF NOT EXISTS knowledge_base (
  topic_id text PRIMARY KEY,
  topic_name text NOT NULL,
  target_audience text[] DEFAULT '{}',
  trigger_keywords text[] DEFAULT '{}',
  validation_response text NOT NULL,
  explanation text NOT NULL,
  action_plan jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Add indexes for array searches
CREATE INDEX IF NOT EXISTS idx_knowledge_keywords ON knowledge_base USING gin(trigger_keywords);
CREATE INDEX IF NOT EXISTS idx_knowledge_audience ON knowledge_base USING gin(target_audience);

ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Knowledge base is readable by authenticated users"
  ON knowledge_base
  FOR SELECT
  TO authenticated
  USING (true);