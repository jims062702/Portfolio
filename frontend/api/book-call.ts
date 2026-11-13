// Vercel Serverless Function: Book a Call Handler
// Receives booking form submissions and emails them to the portfolio owner via Resend.

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: any, res: any) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { name, email, notes, meetingType, meetingDuration, date, timeSlot, timezone } = req.body

  // Validate required fields
  if (!name || !email || !meetingType || !date || !timeSlot) {
    return res.status(400).json({ error: 'Missing required fields: name, email, meeting type, date, and time slot are required.' })
  }

  const recipientEmail = process.env.RECIPIENT_EMAIL || 'gasang143x@gmail.com'

  try {
    await resend.emails.send({
      from: 'Portfolio Booking <onboarding@resend.dev>',
      to: recipientEmail,
      replyTo: email,
      subject: `[Book a Call] ${meetingType} — ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1e40af, #0f172a); padding: 28px 32px;">
            <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700;">📅 New Call Booking Request</h1>
            <p style="margin: 6px 0 0; color: #93c5fd; font-size: 13px;">Someone wants to schedule a 1-on-1 consultation with you.</p>
          </div>
          <div style="padding: 28px 32px;">
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 10px 0; color: #64748b; font-weight: 600; width: 140px; vertical-align: top;">👤 Name:</td>
                  <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #64748b; font-weight: 600; vertical-align: top;">📧 Email:</td>
                  <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                </tr>
              </table>
            </div>

            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
              <p style="margin: 0 0 12px; color: #1e40af; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Meeting Details</p>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; color: #475569; font-weight: 600; width: 140px;">Type:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${meetingType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #475569; font-weight: 600;">Duration:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${meetingDuration}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #475569; font-weight: 600;">Date:</td>
                  <td style="padding: 8px 0; color: #2563eb; font-weight: 700; font-family: monospace;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #475569; font-weight: 600;">Time Slot:</td>
                  <td style="padding: 8px 0; color: #2563eb; font-weight: 700; font-family: monospace;">${timeSlot}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #475569; font-weight: 600;">Timezone:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${timezone || 'Asia/Manila (GMT+8)'}</td>
                </tr>
              </table>
            </div>

            ${notes ? `
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px;">
              <p style="margin: 0 0 8px; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Project Agenda / Notes</p>
              <p style="margin: 0; color: #1e293b; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${notes}</p>
            </div>
            ` : ''}

            <p style="margin-top: 20px; color: #94a3b8; font-size: 11px;">Booking submitted at ${new Date().toISOString()} via jamesgdev.vercel.app</p>
          </div>
        </div>
      `,
    })

    return res.status(200).json({
      success: true,
      message: 'Booking request sent successfully.',
    })
  } catch (error: any) {
    console.error('Resend email error:', error)
    return res.status(500).json({
      error: 'Failed to send booking request. Please try again or reach out via LinkedIn.',
    })
  }
}
