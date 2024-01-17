// controllers/expAppController.js

const Expense = require('../models/Expense'); // Adjust the path as needed

exports.getExpenses = async (req, res) => {
  try {
    const allExpenses = await Expense.find();
    res.render('expApprovals', { allExpenses }); // Pass the data to the template
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.postApprove = async (req, res) => {
  const { expenseId } = req.body;
  try {
    // Find the expense in the database
    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Update the status to 'Approved'
    expense.status = 'Approved';

    // Save the updated expense
    await expense.save();

    // Redirect to the expenses page with the updated status as a query parameter
    res.redirect(`/expenses?status=Approved`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.postReject = async (req, res) => {
  const { expenseId } = req.body;
  try {
    // Find the expense in the database
    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Update the status to 'Rejected'
    expense.status = 'Rejected';

    // Save the updated expense
    await expense.save();

    // Redirect to the expenses page with the updated status as a query parameter
    res.redirect(`/expenses?status=Rejected`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};