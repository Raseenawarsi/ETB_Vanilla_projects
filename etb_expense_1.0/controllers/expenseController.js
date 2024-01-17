// controllers/expenseController.js
 
const Report = require('../models/reportModel');
const Expense = require('../models/Expense');
const User = require('../models/userModel');
 
// Controller method to render the expense form
exports.getExpense = async (req, res) => {
  try {
    // Fetch expense details if an expenseId is provided
    const expenseId = req.query.expenseId;
    const expense = expenseId ? await Expense.findById(expenseId).populate('user') : null;
 
    // Fetch report names for the select list
    const reportNames = await Report.find().distinct('report_name');
 
    // Fetch all expenses from the database for the logged-in user
    // const loggedInUser = req.session.email;
    // const allExpenses = await Expense.find({ user: loggedInUser }).populate('user');
 
    const loggedInUser = req.session.userId; // Use the userId instead of email
    const allExpenses = await Expense.find({ user: loggedInUser }).populate('user');
 
 
    res.render('expenses', { expense, reportNames, allExpenses, loggedInUser });
  } catch (error) {
    console.error('Error retrieving expense:', error);
    res.status(500).render('error', { error: 'Internal Server Error' });
  }
};
 
// Controller method to submit a new expense
exports.submitExpense = async (req, res) => {
  try {
    // Extract expense data from the request body
    const { report, date, category, amount, description, Reference } = req.body;
 
    // Assuming user information is available in the session
    const createdBy = req.session.email || 'UnknownUser';
 
    // Create a new expense instance with additional columns
    const newExpense = new Expense({
      report,
      date,
      category,
      amount,
      description,
      Reference,
      created_by: createdBy,
      last_updated_by: createdBy,
      last_update_login: createdBy,
      user: req.session.userId, // Associate the expense with the logged-in user
    });
 
    // Save the new expense to the database
    const savedExpense = await newExpense.save();
 
    // Redirect to the expenses page with the newly created expenseId
    res.redirect(`/expenses?expenseId=${savedExpense._id}`);
  } catch (error) {
    console.error('Error submitting expense:', error);
    res.status(500).render('error', { error: 'Internal Server Error' });
  }
};