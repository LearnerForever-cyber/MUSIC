"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  MapPin,
  Clock,
  Users,
  Star,
  Check,
  Calendar,
  ArrowLeft,
  Phone,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Tour, ItineraryDay } from "@/lib/types"
import { EnquiryForm } from "@/components/tours/enquiry-form"

const tourImages: Record<string, string> = {
  "bali-paradise-retreat": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2838&auto=format&fit=crop",
  "serengeti-safari-adventure": "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2936&auto=format&fit=crop",
  "paris-city-of-lights": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2946&auto=format&fit=crop",
  "maldives-luxury-escape": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2865&auto=format&fit=crop",
  "dubai-glamour-experience": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2940&auto=format&fit=crop",
  "swiss-alps-adventure": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop",
}

export function TourDetailContent({ tour }: { tour: Tour }) {
  const [openDay, setOpenDay] = useState<number | null>(0)
  const validImages = [
    tour.cover_image,
    ...(tour.images || [])
  ].filter((img): img is string =>
    typeof img === 'string' &&
    img.trim() !== "" &&
    (img.startsWith('http') || img.startsWith('/'))
  )

  const imageSrc = validImages.length > 0
    ? validImages[0]
    : (tourImages[tour.slug] || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2838&auto=format&fit=crop")
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi! I'm interested in the ${tour.title} tour package.`)}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": tour.title,
    "description": tour.short_description,
    "image": imageSrc,
    "offers": {
      "@type": "Offer",
      "price": tour.price,
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": tour.rating || 4.8,
      "reviewCount": tour.review_count || 12
    }
  }

  const itinerary: ItineraryDay[] =
    Array.isArray(tour.itinerary)
      ? tour.itinerary
      : typeof tour.itinerary === "string"
        ? JSON.parse(tour.itinerary)
        : []

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src={imageSrc}
          alt={tour.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10 mx-auto max-w-7xl px-4 pb-10 lg:px-8">
          <Link
            href="/tours"
            className="mb-4 inline-flex items-center gap-1 text-sm text-sand/80 hover:text-sand transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tours
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className="bg-accent text-accent-foreground border-none">
              {tour.category}
            </Badge>
            {tour.is_featured && (
              <Badge className="bg-gold text-navy border-none">Featured</Badge>
            )}
          </div>
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance">
            {tour.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sand/80">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-sunset" />
              {tour.destination}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {tour.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              {tour.group_size}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-gold text-gold" />
              4.8 Rating
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  About This Tour
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {tour.description}
                </p>
              </div>

              {/* Highlights */}
              {tour.highlights && tour.highlights.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Tour Highlights
                  </h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {tour.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm text-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {itinerary.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Day-by-Day Itinerary
                  </h2>
                  <div className="mt-4 space-y-3">
                    {itinerary.map((day, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-border bg-card overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenDay(openDay === i ? null : i)}
                          className="flex w-full items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                              {day.day}
                            </span>
                            <span className="font-medium text-foreground">
                              {day.title}
                            </span>
                          </div>
                          {openDay === i ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                        {openDay === i && (
                          <div className="border-t border-border px-4 pb-4 pt-3">
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {day.description}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What's Included */}
              {tour.inclusions && tour.inclusions.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    {"What's Included"}
                  </h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {tour.inclusions.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                          <Check className="h-3 w-3 text-accent" />
                        </div>
                        <span className="text-sm text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4">
                  {tour.original_price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${tour.original_price.toLocaleString()}
                    </span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-primary">
                      ${tour.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">/ person</span>
                  </div>
                  {tour.original_price && (
                    <Badge className="mt-2 bg-destructive/10 text-destructive border-none">
                      Save $
                      {(tour.original_price - tour.price).toLocaleString()}
                    </Badge>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" /> Duration
                    </span>
                    <span className="font-medium text-foreground">
                      {tour.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" /> Group Size
                    </span>
                    <span className="font-medium text-foreground">
                      {tour.group_size}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" /> Destination
                    </span>
                    <span className="font-medium text-foreground">
                      {tour.destination}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <Button
                    asChild
                    variant="primary"
                    fullWidth
                    size="lg"
                  >
                    <Link href={`/contact?tour=${tour.slug}`}>
                      Book This Tour
                    </Link>
                  </Button>
                  {whatsappNumber && (
                    <Button
                      asChild
                      variant="outline"
                      fullWidth
                      size="lg"
                    >
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Enquire via WhatsApp
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Quick Enquiry Form */}
              <EnquiryForm tourId={tour.id} tourTitle={tour.title} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
