// include packages
const express = require('express');
const router = new express.Router();

// include routes
const Campground = require('../models/campground');

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
router.get('/new', (req, res) => {
  res.render('campgrounds/new');
});

// create new campground
router.post('/', (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  Campground.create(
      {name: name, image: image, description: description},
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

module.exports = router;
