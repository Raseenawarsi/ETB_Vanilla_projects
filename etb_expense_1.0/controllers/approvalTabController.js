// approvalTabController.js

// Import the Expense model if not already imported
const Expense = require('../models/Expense');

// Function to get both approved and rejected expenses from MongoDB
async function getExpenses() {
  try {
    // Replace this with your actual data retrieval logic
    const approvedExpenses = await Expense.find({ status: 'Approved' });
    const rejectedExpenses = await Expense.find({ status: 'Rejected' });
    const overallExpenses = await Expense.find();

    return { overallExpenses, approvedExpenses, rejectedExpenses };
  } catch (error) {
    console.error('Error retrieving expenses:', error);
    throw error; // Handle the error as needed
  }
}

// Controller method to render the approvalTabs template
async function renderApprovalTabs(req, res) {
  try {
    // Fetch or generate your expenses data using the defined function
    const { overallExpenses, approvedExpenses, rejectedExpenses } = await getExpenses();

    console.log('Approved Expenses:', approvedExpenses);
    console.log('Rejected Expenses:', rejectedExpenses);
    console.log('Overall Expenses:', overallExpenses)
    // Render the template and pass the data
    res.render('approvalTabs', { overallExpenses, approvedExpenses, rejectedExpenses });
  } catch (error) {
    console.error('Error rendering approvalTabs:', error);
    res.status(500).render('error', { error: 'Internal Server Error' });
  }
}

module.exports = {
  renderApprovalTabs,
};
