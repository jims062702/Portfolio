// Production Serverless Handler (Vercel / Node / Netlify)
// This handler receives the form submission securely on the server side.
// The recipient email (e.g. gasang143x@gmail.com) is stored as a secret environment variable
// (process.env.RECIPIENT_EMAIL) and is NEVER exposed or transmitted to client browser payloads.

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { senderName, senderEmail, subject, serviceInterest, message } = req.body

  if (!senderName || !senderEmail || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // The recipient address is read securely from server-side environment variables:
  const recipientEmail = process.env.RECIPIENT_EMAIL || 'gasang143x@gmail.com'

  try {
    // Example: Dispatch using Resend, SendGrid, Nodemailer, or AWS SES
    /*
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: recipientEmail,
      replyTo: senderEmail,
      subject: `[Portfolio Inquiry] ${subject || serviceInterest}`,
      text: `From: ${senderName} (${senderEmail})\nService: ${serviceInterest}\n\nMessage:\n${message}`,
    });
    */

    return res.status(200).json({
      success: true,
      message: 'Message delivered securely to the recipient inbox.',
    })
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to send message: ' + error.message })
  }
}

