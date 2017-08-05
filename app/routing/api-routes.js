// Links routes to data sources that hold the array friends data
var friends = require('../data/friends.js');

module.exports = function(app) {
    // api path to get the friends data, responds with a json object array of friends
    // activated on both html pages with blue api Link
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    // updates array of friends database array and sends back json form of the most compatible new friend
    app.post('/api/friends', function(req, res) {
        // newFriend is the user that filled out the survey
        var newFriend = req.body;

        // computes best match 
        var bestMatch = {};

        for (var i = 0; i < newFriend.scores.length; i++) {
            if (newFriend.scores[i] == "1 (Strongly Disagree)") {
                newFriend.scores[i] = 1;
            } else if (newFriend.scores[i] == "5 (Strongly Agree)") {
                newFriend.scores[i] = 5;
            } else {
                newFriend.scores[i] = parseInt(newFriend.scores[i]);
            }
        }
        // compares newFriend scores with each friend score in database 
        // finds friend with the smallest difference in scores 

        var bestMatchIndex = 0;
        //greatest difference for a question is 4
        //so greatest difference is 4 times # of questions in survey
        var bestMatchDifference = 40;

        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;

            for (var index = 0; index < friends[i].scores.length; index++) {
                var differenceOneScore = Math.abs(friends[i].scores[index] - newFriend.scores[index]);
                totalDifference += differenceOneScore;
            }
            // if totalDifference in scores is less than best match,
            // save that index and difference
            if (totalDifference < bestMatchDifference) {
                bestMatchIndex = i;
                bestMatchDifference = totalDifference;
            }
        }

        // best match index is used to get the best match data from the friends index
        bestMatch = friends[bestMatchIndex];

        // Put new friend from survey in database array
        friends.push(newFriend);

        // return the best match friend
        res.json(bestMatch);
    });

};