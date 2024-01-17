// routes/expAppRoutes.js

const express = require('express');
const router = express.Router();
const expAppController = require('../controllers/expAppController');

router.get('/expApprovals', expAppController.getExpenses);
router.post('/approve', expAppController.postApprove);
router.post('/reject', expAppController.postReject);

module.exports = router;
