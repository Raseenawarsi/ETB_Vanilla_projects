
// models/Expense.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  report: String,
  date: Date,
  category: String,
  amount: Number,
  description: String,
  Reference: String,
  last_updated_by: String,
  last_updated_date: { type: Date, default: Date.now },
  created_by: String,
  creation_date: { type: Date, default: Date.now },
  last_update_login: String,
  status: { type: String, default: 'Pending' },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;

