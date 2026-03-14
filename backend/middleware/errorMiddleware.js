const { ApiError } = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
	const isOperational = err instanceof ApiError;
	const statusCode = err.statusCode || 500;

	const payload = {
		success: false,
		message: err.message || 'Internal server error',
	};

	if (process.env.NODE_ENV !== 'production') {
		payload.stack = err.stack;
	}

	if (!isOperational && process.env.NODE_ENV === 'production') {
		payload.message = 'Something went wrong.';
	}

	res.status(statusCode).json(payload);
};

module.exports = { errorHandler };
