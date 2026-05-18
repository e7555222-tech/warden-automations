/*
  # Create Portfolio Database Schema

  1. New Tables
    - `projects` - Showcase portfolio projects
      - `id` (uuid, primary key)
      - `title` (text, unique)
      - `description` (text)
      - `long_description` (text)
      - `image_url` (text)
      - `category` (text)
      - `features` (text[])
      - `technologies` (text[])
      - `link` (text)
      - `demo_link` (text)
      - `order` (integer)
      - `created_at` (timestamp)

    - `contact_submissions` - Store contact form submissions
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `company` (text)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Projects are publicly readable
    - Contact submissions can only be inserted
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text UNIQUE NOT NULL,
  description text NOT NULL,
  long_description text NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  features text[] DEFAULT '{}',
  technologies text[] DEFAULT '{}',
  link text,
  demo_link text,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are publicly readable"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Contact submissions are not readable"
  ON contact_submissions FOR SELECT
  TO anon, authenticated
  USING (false);
