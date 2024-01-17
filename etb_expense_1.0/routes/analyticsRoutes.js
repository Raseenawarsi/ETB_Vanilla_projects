const express = require('express');
const router = express.Router();
 
// Define the route for "/settings"
router.get('/analytics', (req, res) => {
    res.render('analytics'); // Adjust the rendering based on your setup
});
 
module.exports = router;