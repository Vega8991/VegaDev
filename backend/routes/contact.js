import { Router } from 'express';
import nodemailer from 'nodemailer';

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

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_TO,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
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
