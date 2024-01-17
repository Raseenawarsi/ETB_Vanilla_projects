// controllers/reportController.js
 
const Roles = require('../models/user_rolesModel');
 
// Controller method to render the reports page
exports.renderRoles = async (req, res) => {
  try {
    // Fetch reports from the database
    const userRoles = await Roles.find();
 
    // Render the reports page with the fetched data
    res.render('userRole', { userRoles});
  } catch (error) {
    console.error('Error retrieving reports:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
 
exports.submitRoles = async (req, res) => {
  try {
    // Extract report data from the request body
    const { roleid, rolename,email } = req.body;
 
    // Create a new report instance with additional columns
    const newRoles = new Roles({
      roleid,
      rolename,
      email,
    });
 
    // Save the new report to the database
    const savedRoles = await newRoles.save();
 
    // Respond with a success message or redirect to another page
    res.redirect('/userRole');
  } catch (error) {
    // Check if the error is a duplicate key error (code 11000)
    if (error.code === 11000) {
      // Duplicate key error, handle accordingly
      const duplicateKey = Object.keys(error.keyPattern)[0];
      const duplicateValue = error.keyValue[duplicateKey];
 
      // Provide a user-friendly error message
      const errorMessage = `Role ID '${duplicateValue}' already exists. Please choose a different Role ID.`;
 
      // Render the userRole page with the error message
      const userRoles = await Roles.find();
      res.render('userRole', { userRoles, errorMessage });
    } else {
      // Other types of errors, handle as needed
      console.error('Error submitting report:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};