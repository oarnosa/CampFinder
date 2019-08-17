// include packages
const express = require('express');
const router = new express.Router({ mergeParams: true });

// include models
const Campground = require('../models/campground');
const Comment = require('../models/comment');

// middleware
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// show new comment form
router.get('/new', isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campground: campground });
    }
  });
});

// create a new comment
router.post('/', isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          // add user information to comment model
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          // add comment information to campground
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});

// edit a comment
router.get('/:comment_id/edit', (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/edit', {
        campground_id: req.params.id,
        comment: foundComment
      });
    }
  });
});

// update a comment
router.put('/:comment_id', (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body.comment,
    (err, updatedComment) => {
      if (err) {
        res.redirect('back');
      } else {
        res.redirect('/campgrounds/' + req.params.id);
      }
    }
  );
});

// destroy a comment
router.delete('/:comment_id', (req, res) => {
  Comment.findByIdAndDelete(req.params.comment_id, err => {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

module.exports = router;
