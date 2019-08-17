// include models
const Campground = require('../models/campground');
const Comment = require('../models/comment');

module.exports = {
  //check if user is logged in
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  },

  // check if user posted the campground
  checkCampgroundOwnership: (req, res, next) => {
    if (req.isAuthenticated()) {
      Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
          res.redirect('back');
        } else {
          if (foundCampground.author.id.equals(req.user._id)) {
            next();
          } else {
            res.redirect('back');
          }
        }
      });
    } else {
      res.redirect('back');
    }
  },

  // check if user posted the comment
  checkCommentOwnership: (req, res, next) => {
    if (req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
          res.redirect('back');
        } else {
          if (foundComment.author.id.equals(req.user._id)) {
            next();
          } else {
            res.redirect('back');
          }
        }
      });
    } else {
      res.redirect('back');
    }
  }
};
