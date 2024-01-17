// routes/reportRoutes.js

const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Route to render the reports page
router.get('/reports', reportController.renderReports);

// Route to submit a new report
router.post('/report/submit-report', reportController.submitReport);

module.exports = router;
