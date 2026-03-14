const mongoose = require('mongoose');

const connectDB = async () => {
	const mongoUri = process.env.MONGO_URI;

	if (!mongoUri) {
		throw new Error('MONGO_URI is not set in environment variables.');
	}

	const conn = await mongoose.connect(mongoUri, {
		dbName: process.env.MONGO_DB_NAME,
	});

	console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
