const Contact = require('../models/Contact');
const asyncHandler = require('../middleware/asyncHandler');
const { sendContactNotification } = require('../services/emailService');

const submitContact = asyncHandler(async (req, res) => {
	const { name, email, subject, message } = req.body;

	const contact = await Contact.create({
		name,
		email,
		subject,
		message,
	});

	await sendContactNotification(contact);

	res.status(201).json({
		success: true,
		message: 'Your message has been sent successfully.',
		data: {
			id: contact._id,
			createdAt: contact.createdAt,
		},
	});
});

module.exports = {
	submitContact,
};
