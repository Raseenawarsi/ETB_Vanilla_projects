// approvalTabRoutes.js

const express = require('express');
const router = express.Router();
const approvalTabController = require('../controllers/approvalTabController');

// Sample route calling the controller method directly
router.get('/approvalTabs', approvalTabController.renderApprovalTabs);

// ... other routes

module.exports = router;
