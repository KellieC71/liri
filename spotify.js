require("dotenv").config();
const keys = require('../liri-node-app/keys.js');
const Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const fs = require("fs");

function SpotifySearch() {
    var divider = "\n\n------------------------------------------------------------------------\n\n";
    this.spotifySearch = function(command, query) {
        spotify.search({type: 'track', query: query}, function(error, data) {
            if (error) {
                console.log('Error occurred: ' + error);
            } else {
                var spotifyTrack = data.tracks.items;
                for ( let i = 0; i < spotifyTrack.length; i++ ) {
                    var trackName = spotifyTrack[i].name,
                        trackUrl = spotifyTrack[i].external_urls.spotify,
                        albumName = spotifyTrack[i].album.name;
                    for ( let j = 0; j < spotifyTrack[i].artists.length; j++ ) {
                        var artistName = spotifyTrack[i].artists[j].name;
                        var spotifyData = [
                            command,
                            query + divider,
                            "Track: " + trackName,
                            "Album: " + albumName,
                            "Artist: " + artistName,
                            "Url to play the song on Spotify: " + trackUrl,
                            divider
                        ].join("\n\n");
                    }
                }
                fs.appendFile("log.txt", spotifyData, function(error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(spotifyData);
                    }
                });
            }
        });
    }
}

module.exports = SpotifySearch;