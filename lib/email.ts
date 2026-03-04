import nodemailer from "nodemailer"

// Create a reusable Gmail SMTP transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password (not your regular Gmail password)
    },
})

export interface EnquiryEmailData {
    name: string
    email: string
    phone?: string | null
    message: string
    tourInterest?: string | null
}

/**
 * Sends a notification email to the site owner when a new enquiry is submitted.
 */
export async function sendEnquiryNotification(data: EnquiryEmailData) {
    const { name, email, phone, message, tourInterest } = data
    const adminEmail = process.env.GMAIL_USER!

    const mailOptions = {
        from: `"MUS!C Travels" <${adminEmail}>`,
        to: adminEmail,
        replyTo: email,
        subject: `New Enquiry from ${name}${tourInterest ? ` – ${tourInterest}` : ""}`,
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 10px; overflow: hidden; border: 1px solid #e0e0e0;">
        <div style="background: #0f172a; padding: 24px 32px;">
          <h1 style="color: #f8c100; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">✈️ MUS!C Travels</h1>
          <p style="color: #94a3b8; margin: 6px 0 0; font-size: 14px;">New Contact Form Submission</p>
        </div>

        <div style="padding: 32px;">
          <h2 style="color: #0f172a; font-size: 18px; margin: 0 0 20px;">Enquiry Details</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; width: 130px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
            </tr>
            ${phone
                ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px;"><a href="tel:${phone}" style="color: #2563eb;">${phone}</a></td>
            </tr>`
                : ""
            }
            ${tourInterest
                ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Tour Interest</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px;">${tourInterest}</td>
            </tr>`
                : ""
            }
          </table>

          <div style="margin-top: 24px;">
            <p style="color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px;">Message</p>
            <div style="background: #f1f5f9; border-left: 4px solid #f8c100; border-radius: 4px; padding: 16px; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>

          <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
            <a href="mailto:${email}" style="display: inline-block; background: #f8c100; color: #0f172a; font-weight: 700; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-size: 14px;">
              Reply to ${name}
            </a>
          </div>
        </div>

        <div style="background: #f1f5f9; padding: 16px 32px; text-align: center;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">This email was sent from the MUS!C Travels contact form.</p>
        </div>
      </div>
    `,
    }

    await transporter.sendMail(mailOptions)
}

/**
 * Sends an auto-reply confirmation email to the customer.
 */
export async function sendEnquiryAutoReply(data: EnquiryEmailData) {
    const { name, email, tourInterest } = data
    const adminEmail = process.env.GMAIL_USER!

    const mailOptions = {
        from: `"MUS!C Travels" <${adminEmail}>`,
        to: email,
        subject: `We received your enquiry${tourInterest ? ` about ${tourInterest}` : ""}! ✈️`,
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 10px; overflow: hidden; border: 1px solid #e0e0e0;">
        <div style="background: #0f172a; padding: 24px 32px;">
          <h1 style="color: #f8c100; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">✈️ MUS!C Travels</h1>
          <p style="color: #94a3b8; margin: 6px 0 0; font-size: 14px;">Your dream holiday awaits!</p>
        </div>

        <div style="padding: 32px;">
          <h2 style="color: #0f172a; font-size: 20px; margin: 0 0 16px;">Hi ${name}, we've got your message! 🎉</h2>
          <p style="color: #475569; font-size: 14px; line-height: 1.7; margin: 0 0 16px;">
            Thank you for reaching out to <strong>MUS!C Travels</strong>. We have received your enquiry${tourInterest ? ` about <strong>${tourInterest}</strong>` : ""
            } and our travel experts are already on it!
          </p>
          <p style="color: #475569; font-size: 14px; line-height: 1.7; margin: 0 0 24px;">
            We typically respond within <strong>24 hours</strong>. In the meantime, feel free to browse our other exciting tour packages.
          </p>

          <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="color: #92400e; font-size: 13px; margin: 0; line-height: 1.6;">
              💡 <strong>Tip:</strong> You can reach us directly via WhatsApp for faster assistance!
            </p>
          </div>
        </div>

        <div style="background: #f1f5f9; padding: 16px 32px; text-align: center;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">© 2024 MUS!C Travels. All rights reserved.</p>
        </div>
      </div>
    `,
    }

    await transporter.sendMail(mailOptions)
}
