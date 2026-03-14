const express = require('express');
const { submitContact } = require('../controllers/contactController');
const {
	contactValidationRules,
	handleValidationErrors,
} = require('../middleware/validators/contactValidation');

const router = express.Router();

router.post('/', contactValidationRules, handleValidationErrors, submitContact);

module.exports = router;
