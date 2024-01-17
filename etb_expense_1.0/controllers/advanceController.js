// controllers/advanceController.js

const Advance = require('../models/advanceModel');

const recordAdvance = async (req, res) => {
  try {
    // Assuming user information is available in the session
    // const createdBy = req.session.user ? req.session.user.email : 'UnknownUser';

    const createdBy = req.session.email || 'UnknownUser';

    const newAdvance = new Advance({
      amount: req.body.amount,
      date: req.body.date,
      paidThrough: req.body.paidThrough,
      reference: req.body.reference,
      noted: req.body.noted,
      applyToTrip: req.body.applyToTrip,
      created_by: createdBy,
      last_updated_by: createdBy,
      last_update_login: createdBy,
      user: req.session.userId,
    });

    const savedAdvance = await newAdvance.save();

    // Redirect to the Advance page or any other page as needed
    res.redirect('/advance');
  } catch (error) {
    console.error('Error recording advance:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { recordAdvance };
