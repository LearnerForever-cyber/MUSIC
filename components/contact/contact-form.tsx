"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

export function ContactForm({
  preselectedTour,
}: {
  preselectedTour?: string
}) {
  const [loading, setLoading] = useState(false)
  const [tourInterest, setTourInterest] = useState(preselectedTour || "")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      tour_id: null,
    }

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed to submit")

      toast.success(
        "Message sent successfully! We'll get back to you within 24 hours."
      )
      e.currentTarget.reset()
      setTourInterest("")
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
      <h3 className="font-heading text-xl font-semibold text-foreground">
        Send Us a Message
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Fill in the form below and we will get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="contact-name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact-name"
              name="name"
              required
              placeholder="John Doe"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="contact-email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="contact-phone">Phone Number</Label>
            <Input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="+1 234 567 890"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="contact-tour">Interested In</Label>
            <Select value={tourInterest} onValueChange={setTourInterest}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a tour (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bali-paradise-retreat">
                  Bali Paradise Retreat
                </SelectItem>
                <SelectItem value="serengeti-safari-adventure">
                  Serengeti Safari Adventure
                </SelectItem>
                <SelectItem value="paris-city-of-lights">
                  Paris City of Lights
                </SelectItem>
                <SelectItem value="maldives-luxury-escape">
                  Maldives Luxury Escape
                </SelectItem>
                <SelectItem value="dubai-glamour-experience">
                  Dubai Glamour Experience
                </SelectItem>
                <SelectItem value="swiss-alps-adventure">
                  Swiss Alps Adventure
                </SelectItem>
                <SelectItem value="custom">Custom / Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="contact-message">
            Message <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            required
            placeholder="Tell us about your dream holiday - preferred dates, number of travelers, budget range, special requirements..."
            rows={5}
            className="mt-1"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          size="lg"
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto"
        >
          {loading ? (
            "Sending..."
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
