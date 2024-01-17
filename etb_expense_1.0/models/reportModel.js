

// models/reportModel.js

const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  report_name: String,
  business_purpose: String,
  trip: String,
  created_by: String,
  creation_date: { type: Date, default: Date.now },
  last_updated_by: String,
  last_updated_date: { type: Date, default: Date.now },
  last_update_login: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;

