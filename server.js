var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var routes = require("./app/routing/htmlRoutes.js");
var apiRoutes = require("./app/routing/apiRoutes.js");

app.use("/", routes);
app.use("/api", apiRoutes);

app.use('/assets', express.static(path.join(__dirname, 'app/public')));
app.use('/slider', express.static(path.join(__dirname, 'node_modules/bootstrap-slider/dist')));


var PORT = process.env.PORT || 8080;

var server = app.listen(PORT,function(){
  console.log("Server listening on: http://localhost:%s", PORT);	
});