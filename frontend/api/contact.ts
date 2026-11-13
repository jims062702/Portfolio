// Vercel Serverless Function: Contact Form Handler
// Receives contact form submissions and emails them to the portfolio owner via Resend.

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: any, res: any) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { senderName, senderEmail, subject, serviceInterest, message, timestamp } = req.body

  // Validate required fields
  if (!senderName || !senderEmail || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, and message are required.' })
  }

  const recipientEmail = process.env.RECIPIENT_EMAIL || 'gasang143x@gmail.com'

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: recipientEmail,
      replyTo: senderEmail,
      subject: `[Portfolio Contact] ${subject || serviceInterest || 'New Inquiry'}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1e3a5f, #0f172a); padding: 28px 32px;">
            <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700;">📬 New Portfolio Inquiry</h1>
            <p style="margin: 6px 0 0; color: #94a3b8; font-size: 13px;">Someone reached out through your portfolio contact form.</p>
          </div>
          <div style="padding: 28px 32px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-weight: 600; width: 140px; vertical-align: top;">From:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${senderName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-weight: 600; vertical-align: top;">Email:</td>
                <td style="padding: 10px 0;"><a href="mailto:${senderEmail}" style="color: #2563eb; text-decoration: none;">${senderEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-weight: 600; vertical-align: top;">Subject:</td>
                <td style="padding: 10px 0; color: #0f172a;">${subject || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-weight: 600; vertical-align: top;">Topic:</td>
                <td style="padding: 10px 0; color: #0f172a;">${serviceInterest || 'N/A'}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 20px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px;">
              <p style="margin: 0 0 8px; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
              <p style="margin: 0; color: #1e293b; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 20px; color: #94a3b8; font-size: 11px;">Sent at ${timestamp || new Date().toISOString()} via jamesgdev.vercel.app</p>
          </div>
        </div>
      `,
    })

    return res.status(200).json({
      success: true,
      message: 'Message delivered successfully.',
    })
  } catch (error: any) {
    console.error('Resend email error:', error)
    return res.status(500).json({
      error: 'Failed to deliver message. Please try again or reach out via LinkedIn.',
    })
  }
}
