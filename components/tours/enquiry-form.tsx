"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function EnquiryForm({
  tourId,
  tourTitle,
}: {
  tourId: string
  tourTitle: string
}) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      tour_id: tourId,
    }

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed to submit enquiry")

      toast.success("Enquiry submitted! We'll get back to you soon.")
      e.currentTarget.reset()
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="font-heading text-lg font-semibold text-foreground">
        Quick Enquiry
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Interested in {tourTitle}? Drop us a message.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <Label htmlFor="eq-name">Name</Label>
          <Input
            id="eq-name"
            name="name"
            required
            placeholder="Your name"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="eq-email">Email</Label>
          <Input
            id="eq-email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="eq-phone">Phone (optional)</Label>
          <Input
            id="eq-phone"
            name="phone"
            type="tel"
            placeholder="+1 234 567 890"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="eq-message">Message</Label>
          <Textarea
            id="eq-message"
            name="message"
            required
            placeholder="Tell us about your travel plans..."
            rows={3}
            className="mt-1"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {loading ? (
            "Sending..."
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Enquiry
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
