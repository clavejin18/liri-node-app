js
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