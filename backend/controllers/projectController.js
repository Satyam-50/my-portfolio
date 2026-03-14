const Project = require('../models/Project');
const asyncHandler = require('../middleware/asyncHandler');

const getProjects = asyncHandler(async (req, res) => {
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
