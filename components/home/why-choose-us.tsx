import { Shield, Heart, Globe, Headphones } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Handpicked Destinations",
    description:
      "Every destination is personally vetted by our travel experts to ensure authentic and extraordinary experiences.",
  },
  {
    icon: Shield,
    title: "Best Price Guarantee",
    description:
      "We offer the most competitive prices with transparent pricing. No hidden fees, ever.",
  },
  {
    icon: Heart,
    title: "Tailored Experiences",
    description:
      "Each itinerary is customizable to match your preferences, pace, and travel style.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our dedicated team is available around the clock to assist you before, during, and after your trip.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Why MUS!C Travels
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Travel with Confidence
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            We go above and beyond to make sure your holiday is nothing short of
            perfect.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center rounded-xl bg-card p-8 text-center shadow-sm border border-border transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
