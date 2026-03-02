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
    .select("*", { count: 'exact' })
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

  const { data: tours, count } = await query
  const allTours = (tours || []) as Tour[]

  // Optimize: Fetch facets efficiently (ideally these should be cached)
  const categories = ["Adventure", "Beach", "Cultural", "Luxury", "Nature", "City Break"]
  const destinations = ["Bali", "Paris", "Maldives", "Dubai", "Swiss Alps", "Jordan"]

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
