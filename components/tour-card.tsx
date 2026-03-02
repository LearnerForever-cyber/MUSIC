import Link from "next/link"
import { PlaceCard } from "@/components/ui/card-22"
import type { Tour } from "@/lib/types"

const tourImages: Record<string, string> = {
  "bali-paradise-retreat": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2838&auto=format&fit=crop",
  "serengeti-safari-adventure": "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2936&auto=format&fit=crop",
  "paris-city-of-lights": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2946&auto=format&fit=crop",
  "maldives-luxury-escape": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2865&auto=format&fit=crop",
  "dubai-glamour-experience": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2940&auto=format&fit=crop",
  "swiss-alps-adventure": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop",
}


export function TourCard({ tour }: { tour: Tour }) {
  // Sanitize image list: filter out empty strings and nulls
  const validImages = [
    tour.cover_image,
    ...(tour.images || [])
  ].filter((img): img is string =>
    typeof img === 'string' &&
    img.trim() !== "" &&
    (img.startsWith('http') || img.startsWith('/'))
  )

  const images = validImages.length > 0
    ? validImages
    : [tourImages[tour.slug] || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2838&auto=format&fit=crop"]

  return (
    <Link href={`/tours/${tour.slug}`} className="flex h-full">
      <PlaceCard
        images={images}
        tags={[tour.destination, tour.category]}
        rating={4.8}
        title={tour.title}
        dateRange={tour.duration}
        hostType={tour.category}
        isTopRated={tour.is_featured}
        description={tour.short_description}
        pricePerNight={tour.price}
        className="max-w-none"
      />
    </Link>
  )
}

