const express = require('express');

const contactRoutes = require('./contactRoutes');
const projectRoutes = require('./projectRoutes');

const router = express.Router();

router.use('/contacts', contactRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
