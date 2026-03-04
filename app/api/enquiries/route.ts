import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendEnquiryNotification, sendEnquiryAutoReply } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { name, email, phone, message, tour_id, tourInterest } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { error } = await supabase.from("enquiries").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      message: message.trim(),
      tour_id: tour_id || null,
      status: "new",
    })

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json(
        { error: "Failed to submit enquiry." },
        { status: 500 }
      )
    }

    // Send emails via Gmail SMTP (non-blocking — don't fail the request if email fails)
    const emailData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      message: message.trim(),
      tourInterest: tourInterest || null,
    }

    try {
      await Promise.all([
        sendEnquiryNotification(emailData),
        sendEnquiryAutoReply(emailData),
      ])
    } catch (emailError) {
      // Log the email error but don't fail the whole request —
      // the enquiry was already saved to the database.
      console.error("Email sending failed:", emailError)
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    )
  }
}
