// include models
const Campground = require('../models/campground');
const Comment = require('../models/comment');

module.exports = {
  // check if user is logged in
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('/login');
  },

  // check if user posted the campground
  checkCampgroundOwnership: (req, res, next) => {
    if (req.isAuthenticated()) {
      Campground.findById(req.params.id, (err, foundCampground) => {
        if (err || !foundCampground) {
          req.flash('error', 'Uh oh! This campground was not found!');
          res.redirect('back');
        } else {
          if (foundCampground.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash('error', 'You do not have permission to do that!');
            res.redirect('back');
          }
        }
      });
    } else {
      req.flash('error', 'You must be logged in to do that!');
      res.redirect('back');
    }
  },

  // check if user posted the comment
  checkCommentOwnership: (req, res, next) => {
    if (req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err || !foundComment) {
          req.flash('error', 'Uh oh! This comment could not be found');
          res.redirect('back');
        } else {
          if (foundComment.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash('error', 'You do not have permission to do that!');
            res.redirect('back');
          }
        }
      });
    } else {
      req.flash('error', 'You must be logged in to do that!');
      res.redirect('back');
    }
  },
};
