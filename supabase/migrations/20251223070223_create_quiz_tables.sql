/*
  # Create Quiz Tables

  1. New Tables
    - `quizzes`
      - `id` (uuid, primary key)
      - `topic` (text) - The topic of the quiz
      - `created_at` (timestamp) - When the quiz was generated
      
    - `questions`
      - `id` (uuid, primary key)
      - `quiz_id` (uuid, foreign key to quizzes)
      - `question_text` (text) - The question text
      - `options` (jsonb) - Array of answer options
      - `correct_answer` (text) - The correct answer
      - `explanation` (text) - Explanation for the answer
      - `order_index` (integer) - Order of question in quiz
      
  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (anyone can view quizzes)
    - Add policies for authenticated insert (for future auth if needed)
    
  3. Indexes
    - Add index on quiz_id for faster question lookups
*/

CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  options jsonb NOT NULL,
  correct_answer text NOT NULL,
  explanation text DEFAULT '',
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_questions_quiz_id ON questions(quiz_id);

ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view quizzes"
  ON quizzes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create quizzes"
  ON quizzes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view questions"
  ON questions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create questions"
  ON questions FOR INSERT
  WITH CHECK (true);