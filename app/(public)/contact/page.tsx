import type { Metadata } from "next"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "Contact Us | MUS!C Travels and Holidays",
  description:
    "Get in touch with MUS!C Travels and Holidays. We're here to help you plan your perfect holiday.",
}

const contactDetails = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["Travel House, Music Lane", "Adventure City"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["Mon-Fri: 9AM - 6PM", "WhatsApp available 24/7"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["info@musictravels.com", "bookings@musictravels.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM"],
  },
]

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ tour?: string }>
}) {
  const params = await searchParams

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-primary-foreground sm:text-5xl text-balance">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            {"We'd love to hear from you. Let us help plan your next adventure."}
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-accent">
                  Contact Information
                </p>
                <h2 className="mt-2 font-heading text-2xl font-bold text-foreground text-balance">
                  {"Let's Start Planning Your Dream Holiday"}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Whether you have a question about our tours, need a custom
                  itinerary, or just want to talk travel, our team is here for you.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                {contactDetails.map((detail) => (
                  <div key={detail.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <detail.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {detail.title}
                      </h3>
                      {detail.lines.map((line, i) => (
                        <p key={i} className="text-sm text-muted-foreground">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ContactForm preselectedTour={params.tour} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
