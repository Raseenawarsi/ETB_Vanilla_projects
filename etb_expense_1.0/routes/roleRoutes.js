const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController');

// Route to render the reports page
router.get('/userRole', rolesController.renderRoles);

// Route to submit a new report
router.post('/userRole', rolesController.submitRoles);

module.exports = router;