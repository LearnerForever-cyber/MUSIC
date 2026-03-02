-- Production Scale Database Optimization Script
-- Focus: Proper Indexing & Query Performance

-- 1. Create B-Tree indexes for frequently filtered columns
-- These improve lookups for search, categories, and active status
CREATE INDEX IF NOT EXISTS idx_tours_is_active ON tours(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_tours_is_featured ON tours(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_tours_slug ON tours(slug);
CREATE INDEX IF NOT EXISTS idx_tours_category ON tours(category);
CREATE INDEX IF NOT EXISTS idx_tours_destination ON tours(destination);
CREATE INDEX IF NOT EXISTS idx_tours_created_at ON tours(created_at DESC);

-- 2. Create index for testimonials
CREATE INDEX IF NOT EXISTS idx_testimonials_is_featured ON testimonials(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_testimonials_tour_id ON testimonials(tour_id);

-- 3. GIN index for full-text search optimization on title and description
-- This significantly speeds up the "search" functionality in the tours listing
CREATE INDEX IF NOT EXISTS idx_tours_search ON tours USING gin(to_tsvector('english', title || ' ' || short_description));

-- 4. Optimize Enquiries index
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
