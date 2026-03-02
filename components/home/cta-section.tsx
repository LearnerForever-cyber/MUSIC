import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export function CtaSection() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`

  return (
    <section className="relative overflow-hidden bg-primary py-20">
      {/* Decorative circles */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
      <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-white/5" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
          Ready to Start Your Next Adventure?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
          Let us help you plan the perfect getaway. Whether it&apos;s a romantic
          escape, a family vacation, or a solo adventure, we&apos;ve got you
          covered.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8"
          >
            <Link href="/contact">
              Plan My Trip
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          {whatsappNumber && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground text-base"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
