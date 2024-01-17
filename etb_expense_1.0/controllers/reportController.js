// controllers/reportController.js
 
const Report = require('../models/reportModel');
 
// Controller method to render the reports page
exports.renderReports = async (req, res) => {
  try {
    const reportId = req.query.reportId;
    const reportdata = reportId ? await Report.findById(reportId).populate('user') : null;
 
    // Fetch reports from the database for the logged-in user
    const loggedInUser = req.session.userId; // Use the userId instead of email
    const allReports = await Report.find({ user: loggedInUser }).populate('user');
 
    // Render the reports page with the fetched data
    res.render('reports', { reportdata, loggedInUser, allReports });
  } catch (error) {
    console.error('Error retrieving reports:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
 
// Controller method to submit a new report
exports.submitReport = async (req, res) => {
  try {
    // Extract report data from the request body
    const { report_name, business_purpose, trip } = req.body;
 
    // Assuming user information is available in the session
    const createdBy = req.session.email || 'UnknownUser';
 
    // Create a new report instance with additional columns
    const newReport = new Report({
      report_name,
      business_purpose,
      trip,
      created_by: createdBy,
      last_updated_by: createdBy,
      last_update_login: createdBy,
      user: req.session.userId,
    });
 
    // Save the new report to the database
    const savedReport = await newReport.save();
 
    // Respond with a success message or redirect to another page
    res.redirect('/reports');
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};