export interface Tour {
  id: string
  title: string
  slug: string
  description: string
  short_description: string
  destination: string
  category: string
  price: number | null
  original_price: number | null
  duration: string
  group_size: string
  highlights: string[]
  inclusions: string[]
  images: string[]
  cover_image: string | null
  itinerary: ItineraryDay[]
  is_featured: boolean
  is_active: boolean
  rating: number
  review_count: number
  created_at: string
  updated_at: string
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  comment: string
  tour_id: string | null
  avatar: string | null
  is_featured: boolean
  created_at: string
}

export interface Enquiry {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  tour_id: string | null
  status: 'new' | 'contacted' | 'resolved'
  created_at: string
}
