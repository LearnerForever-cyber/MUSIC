import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import type { Tour } from "@/lib/types"
import { ToursContent } from "@/components/tours/tours-content"

export const metadata: Metadata = {
  title: "Our Tours | MUS!C Travels and Holidays",
  description:
    "Browse our curated collection of tour packages across the world. From beach escapes to cultural adventures, find your perfect holiday.",
}

export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string; category?: string; search?: string; page?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  const page = Number(params.page) || 1
  const pageSize = 9
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from("tours")
    .select("id, title, slug, cover_image, images, destination, category, is_featured, short_description, price, duration", { count: 'exact' })
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, to)

  if (params.destination) {
    query = query.ilike("destination", `%${params.destination}%`)
  }
  if (params.category) {
    query = query.eq("category", params.category)
  }
  if (params.search) {
    query = query.or(
      `title.ilike.%${params.search}%,destination.ilike.%${params.search}%`
    )
  }

  // Parallelize requests to eliminate waterfall
  const [
    { data: tours, count },
    { data: allActiveTours }
  ] = await Promise.all([
    query,
    supabase
      .from("tours")
      .select("category, destination")
      .eq("is_active", true)
  ]);

  const allTours = (tours || []) as Tour[]
  const activeToursList = allActiveTours || []

  const categories = Array.from(new Set(activeToursList.map(t => t.category).filter(Boolean))).sort()
  const destinations = Array.from(new Set(activeToursList.map(t => t.destination).filter(Boolean))).sort()

  return (
    <>
      {/* Header */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-primary-foreground sm:text-5xl text-balance">
              Our Tour Packages
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Discover extraordinary destinations crafted just for you
            </p>
          </div>
        </div>
      </section>

      <ToursContent
        tours={allTours}
        categories={categories}
        destinations={destinations}
        initialSearch={params.search}
        initialCategory={params.category}
        initialDestination={params.destination}
      />
    </>
  )
}
