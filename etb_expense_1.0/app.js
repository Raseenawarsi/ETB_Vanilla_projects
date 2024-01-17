// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const authController = require('./controllers/authController');
const User = require('./models/userModel');
const expenseRoutes = require('./routes/expensesRoutes');
const advanceRoutes = require('./routes/advanceRoutes');
const reportRoutes = require('./routes/reportRoutes'); 
const analyticsRoutes = require('./routes/analyticsRoutes');
const approvalsRoutes = require('./routes/approvalsRoutes');
const expAppRoutes = require('./routes/expAppRoutes');
const approvalTabRoutes = require('./routes/approvalTabRoutes');
const rolesRoutes = require('./routes/roleRoutes');
const userAccessRoutes = require('./routes/userAccessRoutes');





const app = express();
const port = process.env.PORT || 3054;

// Set up sessions and cookies
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ 
    mongoUrl: 'mongodb://localhost:27017/expense_db2',
  }),
  cookie: { secure: false }, // cookie options
}));

app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/expense_db2', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const upload = multer();
app.use(upload.none());

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', authController.getLogin);
app.post('/auth/login', authController.postLogin);

global.loggedIn = null;
 
app.use("*",(req,res,next)=> {
    loggedIn = req.session.rolename;
    next();
})

app.get('/register', authController.getRegister);
app.post('/register', authController.postRegister);

app.get('/home', (req, res) => {
  
  res.render('home'); 
});


app.get('/settings', (req, res) => {
  try {
    const { email, username, rolename } = req.session;
    res.render('settings', { email, username, rolename });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/userRole', (req, res) => {
  
  res.render('userRole' ,{errorMessage:'' }); 
});


app.get('/about', (req, res) => {
 
  res.render('about'); 
});

// Set up routes
app.use('/userAccess', userAccessRoutes);


// Sign-in route
app.post('/signin', (req, res) => {
    const { roleid, rolename } = req.body;

    
    if (roleid && rolename) {
        // Set a session variable to indicate that the user is authenticated
        req.session.isAuthenticated = true;

        // Store role information in the session for further use
        req.session.userRole = { roleid, rolename };

        // Redirect to the home page upon successful sign-in
        res.redirect('/home');
    } else {
        // Redirect back to the userAccess page with an error message
        res.redirect('/userAccess?error=authentication');
    }
});


app.use('/', expenseRoutes);
app.use('/', advanceRoutes);
app.use('/', reportRoutes);
app.use('/', analyticsRoutes);
app.use('/', approvalsRoutes);
app.use('/', expAppRoutes);
app.use('/', approvalTabRoutes);
app.use('/', rolesRoutes);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/logout', authController.getLogout);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
