import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { Tour } from "@/lib/types"
import { TourDetailContent } from "@/components/tours/tour-detail-content"

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600 // Edge cached for 1 hour

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: tour } = await supabase
    .from("tours")
    .select("title, short_description")
    .eq("slug", slug)
    .single()

  if (!tour) return { title: "Tour Not Found" }

  return {
    title: `${tour.title} | MUS!C Travels and Holidays`,
    description: tour.short_description,
  }
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: tour } = await supabase
    .from("tours")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (!tour) notFound()

  return <TourDetailContent tour={tour as Tour} />
}
