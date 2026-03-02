"use client"

import { PlaceCard } from "@/components/ui/card-22"

// Sample data to be passed as props
const demoPlaceData = {
    images: [
        "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596622247990-84877175438a?q=80&w=2864&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=2940&auto=format&fit=crop",
    ],
    tags: ["Adventure", "Ancient Monuments"],
    rating: 4.8,
    title: "Petra, Jordan",
    dateRange: "May 1 - 6",
    hostType: "Business host",
    isTopRated: true,
    description: "A lost city carved in rose-colored stone, hidden in majestic desert canyons.",
    pricePerNight: 139,
}

export default function PlaceCardDemo() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
                <PlaceCard {...demoPlaceData} />
                <PlaceCard
                    {...demoPlaceData}
                    title="Bali Paradise"
                    images={["https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2838&auto=format&fit=crop"]}
                    tags={["Beach", "Relaxation"]}
                    pricePerNight={250}
                />
                <PlaceCard
                    {...demoPlaceData}
                    title="Swiss Alps"
                    images={["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop"]}
                    tags={["Snow", "Luxury"]}
                    pricePerNight={420}
                />
            </div>
        </div>
    )
}
