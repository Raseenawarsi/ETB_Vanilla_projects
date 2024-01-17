// routes/advanceRoutes.js
 
const express = require('express');
const router = express.Router();
const advanceController = require('../controllers/advanceController');
const Advance = require('../models/advanceModel');
 
// Render Advance page with advances data
router.get('/advance', async (req, res) => {
  try {
    // Fetch all advances from the database
    // const allAdvances = await Advance.find();
 
    const advanceId = req.query.advanceId;
    const advancedata = advanceId ? await Advance.findById(advanceId).populate('user') : null;
 
    // Fetch reports from the database for the logged-in user
    const loggedInUser = req.session.userId; // Use the userId instead of email
    const allAdvances = await Advance.find({ user: loggedInUser }).populate('user');
 
   
 
 
    // Render the 'advance.ejs' template with the advances data
    res.render('advance', { allAdvances, loggedInUser, advancedata  });
  } catch (error) {
    console.error('Error fetching advances:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 
// Record Advance route
router.post('/record-advance', advanceController.recordAdvance);
 
module.exports = router;