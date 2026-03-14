const nodemailer = require('nodemailer');

let transporter;

const getTransporter = () => {
  if (transporter) {
    return transporter;
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
  const adminEmail = process.env.CONTACT_RECEIVER_EMAIL;

  if (!adminEmail) {
    return;
  }

  const mailer = getTransporter();

  await mailer.sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to: adminEmail,
    replyTo: contact.email,
    subject: `[Portfolio] ${contact.subject}`,
    text: `New contact form submission\n\nName: ${contact.name}\nEmail: ${contact.email}\n\nMessage:\n${contact.message}`,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Subject:</strong> ${contact.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contact.message.replace(/\n/g, '<br/>')}</p>
    `,
  });
};

module.exports = {
  sendContactNotification,
};
