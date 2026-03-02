import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&auto=format&fit=crop&w=2000"
        alt="Tropical beach paradise at sunset"
        fill
        className="object-cover"
        priority
        sizes="100vw"
        quality={85}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-gold backdrop-blur-sm border border-gold/20">
            <Play className="h-3.5 w-3.5 fill-gold" />
            Where Music Meets Travel
          </p>

          <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl text-balance">
            Discover Journeys That
            <span className="block text-gold"> Move Your Soul</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-sand/90 max-w-lg">
            From sun-kissed beaches to majestic mountains, we craft
            extraordinary travel experiences that create memories to last a
            lifetime.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              asChild
              variant="primary"
              size="lg"
              className="text-base px-8"
            >
              <Link href="/tours">
                Explore Tours
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
