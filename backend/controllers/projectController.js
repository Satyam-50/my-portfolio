const Project = require('../models/Project');
const mongoose = require('mongoose');
const asyncHandler = require('../middleware/asyncHandler');
const { ApiError } = require('../utils/ApiError');

const getProjects = asyncHandler(async (req, res) => {
	if (mongoose.connection.readyState !== 1) {
		throw new ApiError('Database unavailable. Check MongoDB connection and Atlas network access.', 503);
	}

	const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });

	res.status(200).json({
		success: true,
		count: projects.length,
		data: projects,
	});
});

module.exports = {
	getProjects,
};
