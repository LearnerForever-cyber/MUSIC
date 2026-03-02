-- Create tours table for MUS!C Travels and Holidays
CREATE TABLE IF NOT EXISTS tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  destination TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'holiday',
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  duration TEXT NOT NULL,
  group_size TEXT,
  start_date DATE,
  end_date DATE,
  cover_image TEXT,
  images TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  itinerary JSONB DEFAULT '[]',
  inclusions TEXT[] DEFAULT '{}',
  exclusions TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Public read access (no auth needed for browsing)
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tours_public_read" ON tours
  FOR SELECT USING (is_active = true);

-- Admin full access (for later admin dashboard)
CREATE POLICY "tours_admin_all" ON tours
  FOR ALL USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );
