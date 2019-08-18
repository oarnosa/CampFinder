// include packages
const express = require('express');
const router = new express.Router();
const passport = require('passport');

// include models
const User = require('../models/user');

// root route
router.get('/', (req, res) => {
  res.render('landing');
});

// auth route
router.get('/register', (req, res) => {
  res.render('register');
});

// handle sign up logic
router.post('/register', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      return res.render('register', { error: err.message });
    }
    passport.authenticate('local')(req, res, () => {
      req.flash(
        'success',
        `Welcome to Camper! Nice to meet you ${user.username}`
      );
      res.redirect('/campgrounds');
    });
  });
});

// show login form
router.get('/login', (req, res) => {
  res.render('login');
});

// handle login route
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  })
);

// handle logout request
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Successfully logged you out!');
  res.redirect('/campgrounds');
});

module.exports = router;
