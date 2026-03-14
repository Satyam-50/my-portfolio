require('dotenv').config();

const { startServer } = require('./app');

startServer().catch((error) => {
	console.error('Failed to start server:', error);
});
