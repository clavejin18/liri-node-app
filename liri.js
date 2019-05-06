//setting environment variables
require("dotenv").config();

// code for taking in arguments
var inputString = process.argv

// code for taking the last parameter
var userInput = inputString[2]

// cases depending on the type of inputString
switch (userInput) {
    case 'concert-this':
        concertSearch();
        break;
    case 'spotify-this-song':
        spotifySearch();
        break;
    case 'movie-this':
        movie();
        break;
    case 'do-what-it-says':
        readFile();
        break;
}
// concert function 
function concertSearch() {
    // required functions 
    var moment = require('moment');
    var axios = require('axios');
    // Searching for concerts by artist
    var artist = process.argv.slice(3).join(" ");

    // URL for searching for concerts
    var queryURl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`

    // Creating the concert request with axios to bandsintown API
    console.log('----- Results -----');
    console.log('');
    console.log(`Artist/Band: ${artist}`);
    console.log('')
    axios.get(queryURl).then(function (response) {
        if (response.data.length == 0) {
            console.log("No Upcoming Events")
        }
        else {
            var jsonData = response.data;
            // A loop that displays all upcoming concerts
            console.log('* Upcoming Events *');
            console.log('');
            for (index = 0, counter = 1; index < jsonData.length; index++ , counter++) {
                console.log(`Event ${counter} :`)
                var eventDays = [
                    "Venue: " + jsonData[index].venue.name,
                    "Venue Location: " + jsonData[index].venue.city + "," + jsonData[index].venue.country,
                    "Date Of Event: " + moment(jsonData[index].datetime).format("MM/DD/YYYY") + " at " + moment(jsonData[index].datetime).format('LT')
                ].join("\n\n");
                console.log(eventDays);
                console.log('--------------');
            }
            console.log('----- End Of Results -----')
        }
    })

        // documenting errors
        .catch(function (error) {
            console.log(error);
        });



}
function spotifySearch() {
    // required functions
    var Spotify = require('node-spotify-api');
    var keys = require("./keys.js");
    var moment = require('moment');

    // spotify 
    var spotify = new Spotify(keys.spotify)

    // When no song is typed for the 3rd argument 
    var searchSong = process.argv.slice(3).join(" ");
    if (searchSong === '') {
        defaultSong = "The Sign";
        // Spotify Search
        search = spotify.search({ type: 'track', query: `${defaultSong}`, limit: 50 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            //Displaying specific song
            console.log('')
            console.log("Specified Searched Song List From Spotify API:")
            console.log('')
            for (index = 0, counter = 1; index < 50; index++) {
                if (`${defaultSong}` === `${data.tracks.items[index].name}`) {
                    console.log(`Song ${counter} :`)
                    counter++;
                    var display = [`Artist(s): ${data.tracks.items[index].artists[0].name}
                    Song Name: ${data.tracks.items[index].name}
                    Preview Link: ${data.tracks.items[index].preview_url}
                    Album: ${data.tracks.items[index].album.name}
                    Length Of Track: ${moment(data.tracks.items[index].duration_ms).format('mm:ss')}`].join("\n\n")
                    console.log(display)
                    console.log("----------------------")
                }
            }
        });
    }

    else {

        // Spotify Search
        spotify.search({ type: 'track', query: `${searchSong}`, limit: 50 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            //Displaying specific searched song
            console.log('')
            console.log("Specified Searched Song List From Spotify API:")
            console.log('')
            for (index = 0, counter = 1; index < 50; index++) {
                if (`${searchSong}` === `${data.tracks.items[index].name}`) {
                    console.log(`Song ${counter} :`)
                    counter++;
                    display = `Artist(s): ${data.tracks.items[index].artists[0].name}
                    Song Name: ${data.tracks.items[index].name}
                    Preview Link: ${data.tracks.items[index].preview_url}
                    Album: ${data.tracks.items[index].album.name}
                    Length Of Track: ${moment(data.tracks.items[index].duration_ms).format('mm:ss')}`
                    console.log(display)
                    console.log("----------------------")
                }
            }
        });
    }

}
// Movie function
function movie() {
    // required functions 
    var axios = require('axios');

    // storing movie variable
    var searchedMovie = process.argv.slice(3).join(" ")

    if (searchedMovie === '') {
        var defaultMovie = "Mr. Nobody"
        // running a movie search with axios to OMDB API
        var queryUrl = `http://www.omdbapi.com/?t=${defaultMovie}&y=&plot=short&apikey=trilogy`

        // Creating the request with axios using the queryURl
        console.log(`----- Results -----`)
        axios.get(queryUrl).then(function (response) {
            var jsonData = response.data;
            var showMovie = [
                "Title: " + jsonData.Title,
                "Year: " + jsonData.Year,
                "IMDB Rating: " + jsonData.imdbRating,
                "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
                "Language(s): " + jsonData.Language,
                "Plot: " + jsonData.Plot,
                "Actors: " + jsonData.Actors
            ].join("\n\n");
            console.log(showMovie)
            console.log("----- End Of Results -----")
        })

            // documenting errors
            .catch(function (error) {
                console.log(error);
            });
    }
    else {
        // running a movie search with axios to OMDB API
        var queryUrl = `http://www.omdbapi.com/?t=${searchedMovie}&y=&plot=short&apikey=trilogy`

        // Creating the request with axios using the queryURl
        console.log(`----- Results -----`)
        axios.get(queryUrl).then(function (response) {
            var jsonData = response.data;
            var showMovie = [
                "Title: " + jsonData.Title,
                "Year: " + jsonData.Year,
                "IMDB Rating: " + jsonData.imdbRating,
                "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
                "Language(s): " + jsonData.Language,
                "Plot: " + jsonData.Plot,
                "Actors: " + jsonData.Actors
            ].join("\n\n");
            console.log(showMovie)
            console.log("----- End Of Results -----")
        })

            // documenting errors
            .catch(function (error) {
                console.log(error);
            });
    }
}
function readFile() {
    // requirements 
    const fs = require('fs');

    // read the random.txt file
    fs.readFile('random.txt', 'utf8', function (error, data) {
        // In case of errors 
        if (error) {
            return console.log(error)
        }
        // split the text file data by commas and place into an array
        var dataArr = data.split(',')

        // assign command and query values based on the text file data
        userInput = dataArr[0];
        searchSong = dataArr[1];
        autoInput(dataArr[0], dataArr[1]);
    })

}
function autoInput() {
    switch (userInput) {
        case 'concert-this':
            concertSearch();
            break;
        case 'spotify-this-song':
            spotifySearch();
            break;
        case 'movie-this':
            movie();
            break;
    }
}