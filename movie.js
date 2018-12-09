const request = require("request");
const fs = require("fs");

function Movie() {
    var divider = "\n\n---------------------------------------------------------------------\n\n";
    this.movieSearch = function (command, query) {
        var omdbUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";
        request(omdbUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var jsonBody = JSON.parse(body);
                 var movieData = [
                    command, 
                    query + divider,
                    "Movie Title: " + jsonBody.Title,
                    "Year Released: " + jsonBody.Released,
                    "Rating on IMDB: " + jsonBody.Ratings[0].Value,
                    "Rating on Rotten Tomatoes: " + jsonBody.Ratings[1].Value,
                    "Country Produced in: " + jsonBody.Country,
                    "Language Produced in: " + jsonBody.Language,
                    "Movie Plot: " + jsonBody.Plot,
                    "Movie Cast: " + jsonBody.Actors,
                    divider
                ].join("\n\n");
                fs.appendFile("log.txt", movieData, function(error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(movieData);
                    }
                });
            }
        });
    }
}

module.exports = Movie;