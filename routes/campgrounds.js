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

// edit campground route
router.get('/:id/edit', (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.render('campgrounds/edit', {campground: foundCampground});
    }
  });
});

// update campground route
router.put('/:id', (req, res) => {
  Campground.findByIdAndUpdate(
      req.params.id,
      req.body.campground,
      (err, updatedCamp) => {
        if (err) {
          res.redirect('/campgrounds');
        } else {
          res.redirect('/campgrounds/' + req.params.id);
        }
      }
  );
});

// destroy campground route
router.delete('/:id', (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err, campgroundRemoved) => {
    if (err) {
      console.log(err);
    }
    Comment.deleteMany({_id: {$in: campgroundRemoved.comments}}, (err) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/campgrounds');
    });
  });
});

module.exports = router;
