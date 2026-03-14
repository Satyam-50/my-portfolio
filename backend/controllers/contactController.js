const Contact = require('../models/Contact');
const mongoose = require('mongoose');
const asyncHandler = require('../middleware/asyncHandler');
const { sendContactNotification } = require('../services/emailService');
const { ApiError } = require('../utils/ApiError');

const submitContact = asyncHandler(async (req, res) => {
	if (mongoose.connection.readyState !== 1) {
		throw new ApiError('Database unavailable. Check MongoDB connection and Atlas network access.', 503);
	}

	const { name, email, subject, message } = req.body;
	const resolvedSubject = subject?.trim() || 'Portfolio Contact Message';

	const contact = await Contact.create({
		name,
		email,
		subject: resolvedSubject,
		message,
	});

	let emailSent = true;

	try {
		await sendContactNotification(contact);
	} catch (error) {
		emailSent = false;
		console.error('Contact email delivery failed:', error.message);
	}

	res.status(201).json({
		success: true,
		message: emailSent
			? 'Your message has been sent successfully.'
			: 'Your message was saved, but the email notification could not be sent.',
		data: {
			id: contact._id,
			createdAt: contact.createdAt,
			emailSent,
		},
	});
});

module.exports = {
	submitContact,
};
