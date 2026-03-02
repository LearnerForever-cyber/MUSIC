import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Heart, Shield, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | MUS!C Travels and Holidays",
  description:
    "Learn about MUS!C Travels and Holidays - our story, our values, and our passion for creating extraordinary travel experiences.",
}

const values = [
  {
    icon: Heart,
    title: "Passion for Travel",
    description:
      "Every trip we plan is infused with our deep love for exploration and cultural discovery.",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description:
      "Honest pricing, clear communication, and reliable service are the cornerstones of our business.",
  },
  {
    icon: Globe,
    title: "Global Expertise",
    description:
      "Our team has first-hand experience across 50+ destinations, ensuring authentic recommendations.",
  },
  {
    icon: Users,
    title: "People First",
    description:
      "We treat every traveler like family, crafting personalized journeys that exceed expectations.",
  },
]

const stats = [
  { value: "500+", label: "Happy Travelers" },
  { value: "50+", label: "Destinations" },
  { value: "10+", label: "Years Experience" },
  { value: "4.9", label: "Average Rating" },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-primary-foreground sm:text-5xl text-balance">
            About MUS!C Travels
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Where music meets wanderlust, and every journey tells a story
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&auto=format&fit=crop&w=800"
                  alt="Bali temple travel destination"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mt-6">
                <Image
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&auto=format&fit=crop&w=800"
                  alt="Paris Eiffel Tower travel"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl -mt-6">
                <Image
                  src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&auto=format&fit=crop&w=800"
                  alt="Maldives overwater bungalow"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&auto=format&fit=crop&w=800"
                  alt="African safari adventure"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                Our Story
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground text-balance">
                Born from a Love of Music and Adventure
              </h2>
              <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  MUS!C Travels and Holidays was founded with a simple yet powerful
                  belief: travel should move your soul the way great music does. Just
                  as a beautiful melody can transport you to another world, we believe
                  the right journey can transform your perspective on life.
                </p>
                <p>
                  Our name reflects our philosophy: every destination has its own
                  rhythm, every culture has its own song, and every traveler deserves
                  an experience that resonates deeply. We combine the art of travel
                  planning with the science of exceptional service to create holidays
                  that hit all the right notes.
                </p>
                <p>
                  From sun-kissed beaches in Bali to the romantic streets of Paris,
                  from safari adventures in the Serengeti to luxury escapes in the
                  Maldives, we curate experiences that create lifelong memories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Our Values
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl text-balance">
              What Drives Us Forward
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground text-balance">
            Ready to Plan Your Dream Trip?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Get in touch with our travel experts and let us create something
            extraordinary together.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8"
            >
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground text-base"
            >
              <Link href="/tours">Browse Tours</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
