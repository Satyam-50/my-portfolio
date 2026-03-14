const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
			trim: true,
			maxlength: 80,
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			lowercase: true,
			trim: true,
			match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
		},
		subject: {
			type: String,
			trim: true,
			maxlength: 150,
			default: 'Portfolio Contact Message',
		},
		message: {
			type: String,
			required: [true, 'Message is required'],
			trim: true,
			maxlength: 5000,
		},
		status: {
			type: String,
			enum: ['new', 'read', 'replied'],
			default: 'new',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Contact', contactSchema);
