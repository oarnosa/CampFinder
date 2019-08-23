# CampSite

> A RESTful web app built on Node.js, Express.js, and MongoDB to help users share and find camping sites around the world

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)
- [Inspiration](#inspiration)

## General info

The purpose of this project was to develop my skills in creating a full-stack RESTful application using the latest technologies such as MongoDB, Node.js, Express.js, and more. This served as an introduction to working with server-side frameworks and understanding how the interactions between the client and server function. The features were implemented with full CRUD (Create, Read, Update, Destroy) following the standard of RESTful routing to allow the seperation of data from the client and server. Other features such as user authentication, and user authorization exposed me to the importance of middleware when working with routes and the data persistance added from using MongoDB exposed me to working with a NoSQL database. This app was deployed using Heroku and MongoDB Atlas which improved my understanding of building and deploying a full web-app from start to finish.

## Technologies

- Node - v10.16
- Express - v4.17.1
- MongoDB - v4.0.11
- Mongoose - v5.6.9
- jQuery - v3.4.1
- Embedded JS - v2.6.2
- Bootstrap - v4.3.1

## Setup

Clone project into desired directory and ensure [MongoDB](https://www.mongodb.com/download-center/community) and [Node.js](https://nodejs.org/en/download/) are installed.

Within the project root path, create a **_.env_** file and declare the database path:

```
DATABASE_URL=mongodb://localhost/campsite
```

Install project dependencies:

```
npm install
```

Host MongoDB in the root directory with a seperate terminal using:

```
mongod
```

Run the application with:

```
node app.js
```

To populate the database add the following to the **_app.js_** file and restart the app:

```javascript
const SeedDB = require("./seed");
SeedDB();
```

This app was deployed using Heroku and can be viewed at [campsite-app.herokuapp.com](https://campsite-app.herokuapp.com/)

## Features

- Create, Read, Update, Destroy, (CRUD) for Campgrounds and Comments
- RESTful routing
- User Authentication
- User Authorization

To-do list:

- Add dynamic pricing
- Add search for campsites
- Create a superuser account to manage all the content
- Improve UI/UX with animations and better visuals
- Integrate Google Maps API to view campsite locations

## Status

Project is: _in progress_, as there are several features which I would like to implement as I learn about new technologies. I would like to, at some pont, recreate the UI/UX when my skills with CSS and frontend frameworks improve.

## Inspiration

This project was inspired by Colt Steele and his project YelpCamp from his Udemy course, the "Web Developer Bootcamp".
