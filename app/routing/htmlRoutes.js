
var router = require("express").Router();
var path = require("path");

router.route("/").get(function(req,res){
	res.sendFile(path.resolve("app/public/home.html"));
});

router.route("/survey").get(function(req,res){
	res.sendFile(path.resolve("app/public/survey.html"));
});


module.exports = router;