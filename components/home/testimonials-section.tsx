import { Star, Quote } from "lucide-react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import type { Testimonial } from "@/lib/types"

export async function TestimonialsSection() {
  const supabase = await createClient()
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(3)

  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Testimonials
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl text-balance">
            What Our Travelers Say
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Real stories from real travelers who experienced the MUS!C Travels
            difference.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(testimonials as Testimonial[]).map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative flex flex-col rounded-xl border border-border bg-card p-8 shadow-sm"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/10" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating
                      ? "fill-gold text-gold"
                      : "fill-muted text-muted"
                      }`}
                  />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground italic">
                &ldquo;{testimonial.comment}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                {(testimonial.avatar && (testimonial.avatar.startsWith('http') || testimonial.avatar.startsWith('/'))) ? (
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-heading font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
