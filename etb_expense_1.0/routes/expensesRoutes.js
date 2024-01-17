// routes/expenseRoutes.js

const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Correct route definition for rendering the expenses page
router.get('/expenses', expenseController.getExpense);

// Route to submit a new expense
router.post('/expenses/submit', expenseController.submitExpense);

module.exports = router;

