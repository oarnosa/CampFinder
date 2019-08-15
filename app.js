// include packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const methodOverride = require('method-override');
const LocalStrategy = require('passport-local');

// include user model
const User = require('./models/user');

// include routes
const commentRoutes = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');

// connect to database
mongoose.connect('mongodb://localhost/camp_finder', {useNewUrlParser: true});

// expect ejs files
app.set('view engine', 'ejs');

// setup body-parser
app.use(bodyParser.urlencoded({extended: true}));

// set up express-session
app.use(express.static(__dirname + '/public'));
app.use(
    require('express-session')({
      secret: 'IqFic484907I0T552hiMQ1UCJimRGL55',
      resave: false,
      saveUninitialized: false,
    })
);

// setup method-override
app.use(methodOverride('_method'));

// setup passport for user login
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware to check if user is logged in
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// use created routes
app.use(indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);

// setup port to show project
app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
