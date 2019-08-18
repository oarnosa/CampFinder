// include packages
const express = require('express');
const router = new express.Router({ mergeParams: true });

// include models
const Campground = require('../models/campground');
const Comment = require('../models/comment');

// include middleware
const middleware = require('../middleware');

// show new comment form
router.get('/new', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campground: campground });
    }
  });
});

// create a new comment
router.post('/', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          req.flash('error', 'Uh oh! Something went wrong!');
          console.log(err);
        } else {
          // add user information to comment model
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          // add comment information to campground
          campground.comments.push(comment);
          campground.save();
          req.flash('success', 'Comment was successfully added!');
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});

// edit a comment
router.get(
  '/:comment_id/edit',
  middleware.checkCommentOwnership,
  (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err || !foundCampground) {
        req.flash('error', 'Uh oh! This campground was not found!');
        return res.redirect('back');
      }
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
  }
);

// update a comment
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body.comment,
    (err, updatedComment) => {
      if (err) {
        req.flash('error', 'Failed to update comment');
        res.redirect('back');
      } else {
        req.flash('success', 'Comment was successfully updated!');
        res.redirect('/campgrounds/' + req.params.id);
      }
    }
  );
});

// destroy a comment
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndDelete(req.params.comment_id, err => {
    if (err) {
      req.flash('error', "Uh oh! This comment couldn't be removed");
      res.redirect('back');
    } else {
      req.flash('success', 'Comment was successfully removed!');
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

module.exports = router;
