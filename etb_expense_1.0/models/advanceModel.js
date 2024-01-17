// models/advanceModel.js

const mongoose = require('mongoose');

const advanceSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  paidThrough: String,
  reference: String,
  noted: String,
  applyToTrip: String,
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

const Advance = mongoose.model('Advance', advanceSchema);

module.exports = Advance;
