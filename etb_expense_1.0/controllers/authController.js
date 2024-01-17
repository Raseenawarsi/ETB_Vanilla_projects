// authController.js
 
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Roles = require('../models/user_rolesModel');
 
exports.getLogin = (req, res) => {
    const error = req.query.error || '';
    res.render('login', { error });
};
 
exports.postLogin = async (req, res) => {
    try {
        const { email, password, username,role } = req.body;
 
        // Find the user based on the email
        const user = await User.findOne({ email: email });
 
        if (user) {
            // Check if the provided password matches the user's password
            if (user.password === password) {
                // Find the role based on the user's email
                const role = await Roles.findOne({ email: email });
                req.session.userId = user._id;
                req.session.username = user.username;
                req.session.email = user.email;
                if (role) {
                    // Store user-related data in the session
                   
                    req.session.rolename = role.rolename; // Set user role in the session
                   
 
                    // Save the session
                    req.session.save((err) => {
                        if (err) {
                            console.error('Error saving session:', err);
                        }
                       
                        // Redirect to the expenses page or any other page after successful login
                        res.redirect('/home');
                    });
                } else {
                    res.redirect('/login?error=User not found');
                }
            } else {
                res.redirect('/login?error=Incorrect password');
            }
        } else {
            res.redirect('/login?error=User not found');
        }
    } catch (error) {
        console.error('Login error:', error);
        res.redirect('/login?error=Server error');
    }
};
 
 
 
exports.getRegister = async (req, res) => {
    try {
        const userRoles = await Roles.find();
        res.render('register', { error: null, userRoles });
    } catch (error) {
        console.error('Error fetching user roles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
 
exports.postRegister = async (req, res) => {
    try {
        const { username, email, password, passwordConfirm } = req.body;
 
        // Check if password and passwordConfirm match
        if (password !== passwordConfirm) {
            return res.render('register', { error: 'Passwords do not match' });
        }
 
        // Check if the password is at least 8 characters long
        if (password.length < 8) {
            return res.render('register', { error: 'Password should be at least 8 characters long' });
        }
 
        // Check if the email already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.render('register', { error: 'Email already exists' });
        }  
 
        const newUser = await User.create({
            username: username,
            email: email,
            password: password,
           
        });
 
        console.log('User created:', newUser);
        res.redirect('/login');
    } catch (error) {
        console.error('Error creating user:', error);
        res.redirect('/register?error=Server error');
    }
};
 
// ... other methods remain unchanged ...
exports.getLogout = (req, res) => {
    // Clear the session and redirect to the login page
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    });
};