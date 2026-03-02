-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  tour_id UUID REFERENCES tours(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an enquiry (public insert)
CREATE POLICY "enquiries_insert_public" ON enquiries
  FOR INSERT WITH CHECK (true);

-- Admin can read and manage enquiries
CREATE POLICY "enquiries_admin_all" ON enquiries
  FOR ALL USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );
