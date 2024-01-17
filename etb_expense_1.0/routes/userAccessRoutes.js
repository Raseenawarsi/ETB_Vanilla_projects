const express = require('express');
const router = express.Router();

// Route to render the userAccess page
router.get('/', (req, res) => {
    // Check if there's an authentication error in the query parameters
    const errorMessage = req.query.error === 'authentication' ? 'Invalid username or password.' : '';
    res.render('userAccess', { errorMessage });
});

module.exports = router;
