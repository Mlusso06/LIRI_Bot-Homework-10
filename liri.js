// This code is required to read and set any enviroment variables
require("dotenv").config();

// variable required to import info from the keys file
var keys = require("./keys.js");

// access of spotify

var spotify = new Spotify(keys.spotify);



// Liri bot needs to accept the following commands, and produce a responce

"concert-this"

"spotify-this-song"

"moive-this"

"do-what-it-says"