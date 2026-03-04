import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TourCard } from "@/components/tour-card"
import { createClient } from "@/lib/supabase/server"
import type { Tour } from "@/lib/types"

export async function FeaturedTours() {
  const supabase = await createClient()
  const { data: tours } = await supabase
    .from("tours")
    .select("id, title, slug, cover_image, images, destination, category, is_featured, short_description, price, duration")
    .eq("is_featured", true)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(3)

  if (!tours || tours.length === 0) return null

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Handpicked for You
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Featured Tour Packages
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Explore our most popular destinations, carefully curated to offer
            unforgettable experiences at exceptional value.
          </p>
        </div>

        {/* Tour Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(tours as Tour[]).map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/tours">
              View All Tours
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
