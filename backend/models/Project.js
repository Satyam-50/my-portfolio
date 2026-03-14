const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Project title is required'],
			trim: true,
			maxlength: 120,
		},
		description: {
			type: String,
			required: [true, 'Project description is required'],
			trim: true,
		},
		tags: {
			type: [String],
			default: [],
		},
		imageUrl: {
			type: String,
			trim: true,
			default: '',
		},
		liveUrl: {
			type: String,
			trim: true,
			default: '',
		},
		githubUrl: {
			type: String,
			trim: true,
			default: '',
		},
		featured: {
			type: Boolean,
			default: false,
		},
		order: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Project', projectSchema);
