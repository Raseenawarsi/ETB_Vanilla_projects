// approvalsRoutes.js
 
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // Import your Expense model or data access module
const Report = require('../models/reportModel');
 
router.get('/approvals', async (req, res) => {
  try {
    // Fetch expense data from the database (replace with your actual logic)
    // const allExpenses = await Expense.find();
 
    const expenseId = req.query.expenseId;
    const expense = expenseId ? await Expense.findById(expenseId).populate('user') : null;
 
    const loggedInUser = req.session.userId; // Use the userId instead of email
    const allExpenses = await Expense.find({ user: loggedInUser }).populate('user');
 
 
 
     
    const reportId = req.query.reportId;
    const reportdata = reportId ? await Report.findById(reportId).populate('user') : null;
 
    // Fetch reports from the database for the logged-in user
    // const loggedInUser = req.session.userId; // Use the userId instead of email
    const allReports = await Report.find({ user: loggedInUser }).populate('user');
 
 
    // Render the "approvals.ejs" template and pass the expense data to it
    res.render('approvals', { allExpenses, allReports });
  } catch (error) {
    // Handle errors, e.g., log the error and render an error page
    console.error('Error fetching expense data:', error);
    res.render('error', { error: 'Failed to fetch expense data.' });
  }
});
 
module.exports = router;