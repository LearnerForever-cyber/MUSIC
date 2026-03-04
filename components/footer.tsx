import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""

  return (
    <footer className="bg-navy text-sand">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.jpeg"
                alt="MUS!C Travels and Holidays"
                width={64}
                height={64}
                className="object-contain"
              />
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold text-sand">
                  MUS!C
                </span>
                <span className="text-sm text-sand/70">Travels & Holidays</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-sand/70">
              Crafting unforgettable travel experiences that move your soul.
              From tropical paradises to cultural adventures, we make every
              journey extraordinary.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold text-sand">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/tours", label: "Our Tours" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-sand/70 transition-colors hover:text-sand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold text-sand">
              Popular Destinations
            </h3>
            <ul className="flex flex-col gap-3">
              {["Goa", "Bali", "Maldives", "Dubai", "Thailand"].map(
                (dest) => (
                  <li key={dest}>
                    <Link
                      href="/tours"
                      className="text-sm text-sand/70 transition-colors hover:text-sand"
                    >
                      {dest}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold text-sand">
              Get in Touch
            </h3>
            <ul className="flex flex-col gap-4">
              {whatsappNumber && (
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-sunset" />
                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sand/70 transition-colors hover:text-sand"
                  >
                    {whatsappNumber}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-sunset" />
                <a
                  href="mailto:musictravelsholidays1029@gmail.com"
                  className="text-sm text-sand/70 transition-colors hover:text-sand"
                >
                  musictravelsholidays1029@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-sand/20 pt-8 text-center">
          <p className="text-sm text-sand/50">
            &copy; {new Date().getFullYear()} MUS!C Travels and Holidays. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
