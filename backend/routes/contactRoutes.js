const express = require('express');
const { submitContact } = require('../controllers/contactController');
const {
	contactValidationRules,
	handleValidationErrors,
} = require('../middleware/validators/contactValidation');

const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).json({
		success: true,
		message: 'Contact route is active. Send a POST request to submit the form.',
	});
});

router.post('/', contactValidationRules, handleValidationErrors, submitContact);

module.exports = router;
