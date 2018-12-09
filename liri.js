var fs = require('fs');
const Movie = require("./movie.js");
const Concert = require("./concert.js");
const SpotifySearch = require("./spotify.js");

var movie = new Movie();
var concert = new Concert();
var spotifySearch = new SpotifySearch();

var command = process.argv[2],
    query = process.argv.slice(3).join(" ");

liri(command, query);
function liri(command, query) {
       if ( command === "concert-this" ) {
        concert.concertSearch(command, query);
    } else if ( command === 'spotify-this-song' && query ) {
        spotifySearch.spotifySearch(command, query);
    } else if ( command === 'spotify-this-song' && !query ) {
        query = "The Sign"
        spotifySearch.spotifySearch(command, query);
    } else if ( command === 'movie-this' && query ) {
        movie.movieSearch(command, query);
    } else if ( command === 'movie-this' && !query ) {
        query = "Mr. Nobody";
        movie.movieSearch(command, query);
    } else if ( command === 'do-what-it-says' ) {
        doWhatItSays();
    }
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        } else {
            var dataArr = data.split(",");
             var command = dataArr[0],
                query = dataArr[1],
                newData = ["Do What It Says", command, query];
                fs.appendFile("log.txt", newData, function(error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Content Added to log.txt");
                    }
                });
                liri(command, query);
        }
    });

}
