// routes/authRoutes.js
 
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
 
// Logout route
router.get('/logout', authController.getLogout);  // Change to getLogout
 
module.exports = router;