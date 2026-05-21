import { Router } from 'express';
import { Resend } from 'resend';

const router = Router();

function validate(body) {
  const { name, email, message } = body ?? {};
  if (!name?.trim()) return 'Name is required';
  if (!email?.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email';
  if (!message?.trim()) return 'Message is required';
  if (message.trim().length < 10) return 'Message too short';
  return null;
}

router.post('/', async (req, res) => {
  const err = validate(req.body);
  if (err) return res.status(400).json({ ok: false, error: err });

  const { name, email, message } = req.body;
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      replyTo: email,
      to: process.env.CONTACT_TO,
      subject: `Portfolio contact from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr />
        <p style="white-space:pre-wrap">${message}</p>
      `,
    });
    return res.json({ ok: true });
  } catch (e) {
    console.error('Mail error:', e.message);
    return res.status(500).json({ ok: false, error: 'Failed to send message' });
  }
});

export default router;
