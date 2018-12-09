const request = require("request");
const fs = require("fs");
const moment = require("moment");

function Concert() {
    var divider = "\n\n------------------------------------------------------------------------\n\n";
    this.concertSearch = function(command, query) {
        var artist = query;
        bandsUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        request(bandsUrl, function(error, response, body) {
            // if the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
                // parse the body of the site and recover the following:
                var jsonBody = JSON.parse(body);
                for (let i = 0; i < jsonBody.length; i++) {
                    if (jsonBody[i].venue.country === "United States" && jsonBody[i].venue.region === "FL") {
                        const eventDate = moment(jsonBody[i].datetime).format("MM/DD/YYYY");
                        const eventLocation = jsonBody[i].venue.city + " " 
                                            + jsonBody[i].venue.region + " " 
                                            + jsonBody[i].venue.country;
                        const eventName = jsonBody[i].venue.name;
                        var concertData = [
                            command,
                            query + divider,
                            "Date of the Concert: " + eventDate,
                            "Concert Venue: " + eventName,
                            "Venue Location: " + eventLocation,
                            divider
                        ].join("\n\n");
                        fs.appendFile("log.txt", concertData, function(error) {
                            // if an error was experienced log the error
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(concertData);
                            }
                        });
                    }
                }
            }
        });
    }
}

module.exports = Concert;