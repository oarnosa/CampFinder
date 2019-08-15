// include packages
const express = require('express');
const router = new express.Router();

// include routes
const Campground = require('../models/campground');

// middleware
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// root route
router.get('/', (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {campgrounds: campgrounds});
    }
  });
});

// add new campground form
router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

// create new campground
router.post('/', isLoggedIn, (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const author = {
    id: req.user._id,
    username: req.user.username,
  };
  Campground.create(
      {name: name, image: image, description: description, author: author},
      (err, newlyCreated) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/campgrounds');
          console.log(newlyCreated);
        }
      }
  );
});

// show a specific campground
router.get('/:id', (req, res) => {
  Campground.findById(req.params.id)
      .populate('comments')
      .exec((err, foundCampground) => {
        if (err) {
          console.log(err);
        } else {
          res.render('campgrounds/show', {campground: foundCampground});
        }
      });
});

module.exports = router;
