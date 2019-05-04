//setting environment variables
require("dotenv").config();

// importing and storing keys
var keys = require("./keys.js");

// spotify 
//var spotify = new Spotify(keys.spotify);

// code for taking in arguments
var inputString = process.argv

// code for taking the last parameter
var operand = inputString[2]

// cases depending on the type of inputString
switch (operand) {
    case 'concert-this':
        console.log("you will be seraching for a concert")
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
function movie() {
    // requiring axios code
    var axios = require('axios')

    // Searching for movie. 
    var searchedMovie = process.argv.slice(3).join(" ")

    // running a movie search with axios to OMDB API
    var queryUrl = `http://www.omdbapi.com/?t=${searchedMovie}&y=&plot=short&apikey=trilogy`

    // Creating the request with axios using the queryURl
    console.log(`----- Results-----`)
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