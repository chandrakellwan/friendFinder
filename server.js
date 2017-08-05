
// sets up npm packages
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
//path to grab data from
var friends = require('./app/data/friends.js');

var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port.

//makes static assets in the public folder available (style.css)
app.use(express.static('app/public'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// routes

require('./app/routing/api-routes.js')(app);
require('./app/routing/html-routes.js')(app);
//============================================
// server listening

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is listening!")
});