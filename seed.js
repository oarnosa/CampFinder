const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
  {
    name: "Hawk's Nest",
    image:
      'https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    author: {
      id: '5d5eb8a3d7bfdc3ffc9d4e8f',
      username: 'Admin'
    }
  },
  {
    name: 'Canyon Floor',
    image:
      'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    author: {
      id: '5d5eb8a3d7bfdc3ffc9d4e8f',
      username: 'Admin'
    }
  },
  {
    name: 'Hillside Valley',
    image:
      'https://images.unsplash.com/photo-1511993807578-701168605ad3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    author: {
      id: '5d5eb8a3d7bfdc3ffc9d4e8f',
      username: 'Admin'
    }
  },
  {
    name: 'Widows Recluse',
    image:
      'https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    author: {
      id: '5d5eb8a3d7bfdc3ffc9d4e8f',
      username: 'Admin'
    }
  },
  {
    name: 'Tundra Trial',
    image:
      'https://images.unsplash.com/photo-1464547323744-4edd0cd0c746?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    author: {
      id: '5d5eb8a3d7bfdc3ffc9d4e8f',
      username: 'Admin'
    }
  },
  {
    name: 'Desert Mesa',
    image:
      'https://images.unsplash.com/photo-1499363145340-41a1b6ed3630?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    author: {
      id: '5d5eb8a3d7bfdc3ffc9d4e8f',
      username: 'Admin'
    }
  }
];

const seedDB = () => {
  // clear database
  Comment.deleteMany({}, err => {
    if (err) {
      console.log(err);
    }
    console.log('Removed Comments!');
  });
  Campground.deleteMany({}, err => {
    if (err) {
      console.log(err);
    }
    console.log('Removed Campgrounds!');
    // create a campground
    data.forEach(seed => {
      Campground.create(seed, (err, campground) => {
        if (err) {
          console.log(err);
        } else {
          console.log('added a campground');
          // create a comment
          Comment.create(
            {
              text: 'This place is great, but I wish there was internet.',
              author: {
                id: '5d5eb8a3d7bfdc3ffc9d4e8f',
                username: 'Admin'
              }
            },
            (err, comment) => {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log('created a new comment');
              }
            }
          );
        }
      });
    });
  });
};

module.exports = seedDB;
