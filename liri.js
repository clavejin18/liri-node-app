//setting environment variables
require("dotenv").config();

// importing and storing keys
var keys = require("./keys.js");

// Setting moment variable
var moment = require('moment');

// spotify 
//var spotify = new Spotify(keys.spotify);

// code for taking in arguments
var inputString = process.argv

// code for taking the last parameter
var operand = inputString[2]

// cases depending on the type of inputString
switch (operand) {
    case 'concert-this':
        concertSearch();
        break;
    case 'spotify-this-song':
        console.log("you will be searching for songs")
        break;
    case 'movie-this':
        movie();
        break;
    case 'do-what-it-says':
        console.log("you will be searching for something")
        break;
}
// concert function 
function concertSearch() {
    // Searching with axios
    var axios = require(`axios`);

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
    })

        // documenting errors
        .catch(function (error) {
            console.log(error);
        });



}
// Movie function
function movie() {
    // requiring axios code
    var axios = require('axios')

    // Searching for movie. 
    var searchedMovie = process.argv.slice(3).join(" ")

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