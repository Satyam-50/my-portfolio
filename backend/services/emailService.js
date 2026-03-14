const nodemailer = require('nodemailer');
const { ApiError } = require('../utils/ApiError');

let transporter;

const escapeHtml = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const getTransporter = () => {
  if (transporter) {
    return transporter;
  }

  const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'EMAIL_FROM', 'CONTACT_RECEIVER_EMAIL'];
  const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

  if (missingEnvVars.length > 0) {
    throw new ApiError(`Missing email configuration: ${missingEnvVars.join(', ')}`, 500);
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
};

const sendContactNotification = async (contact) => {
  const mailer = getTransporter();
  const safeName = escapeHtml(contact.name);
  const safeEmail = escapeHtml(contact.email);
  const safeSubject = escapeHtml(contact.subject);
  const safeMessage = escapeHtml(contact.message).replace(/\n/g, '<br/>');

  await mailer.sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    replyTo: contact.email,
    subject: `[Portfolio] ${contact.subject}`,
    text: `New contact form submission\n\nName: ${contact.name}\nEmail: ${contact.email}\n\nMessage:\n${contact.message}`,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `,
  });
};

module.exports = {
  sendContactNotification,
};
