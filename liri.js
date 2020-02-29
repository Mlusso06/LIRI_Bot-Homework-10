// DEPENDENCIES
// =====================================

// Read and set environment variables
require("dotenv").config();

// Import the API keys
var keys = require("./keys");

// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");

// Import the axios npm package.
var axios = require("axios");

// Import the moment npm package.
var moment = require("moment");

// Import the FS package for read/write.
var fs = require("fs");

// Initialize the spotify API client using our client id and secret
var spotify = new Spotify(keys.spotify);

// FUNCTIONS
// =====================================


// Function for running a Spotify search
var getMeSpotify = function (songName) {
  if (songName === undefined) {
    songName = "What's my age again";
  };
  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // this will send the info to the user after the liri request
    console.log(
      "\nThe information you seek:" + 
    "\nArtist: " + data.tracks.items[0].artists[0].name + 
    "\nSong: " + data.tracks.items[0].name + 
    "\nLink: " + data.tracks.items[0].external_urls.spotify + 
    "\nAlbum: " + data.tracks.items[0].album.name + 
    "\n\n" + songName + " is a Great Song and should be a Top Hit")
  });
}
// Function for concert search
var getMyBands = function (artist) {

  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(
    function (response) {
      var jsonData = response.data;
      // console.log(jsonData)

      if (!jsonData.length) {
        console.log("No results found for " + artist);
        return;
      };

      var concertDate = moment(jsonData[0].datetime).format("MM/DD/YYYY");
      console.log(`Here is the Upcoming concerts for: 
      \n      ${artist}
      Venue: ${jsonData[0].venue.name}
      Location: ${jsonData[0].venue.country}
      Date: ${concertDate}
      Now go to ticket master to order tickets`)

    }
  );
};
// Function for running a Movie Search
var getMeMovie = function (movieName) {
  if (movieName === "") {
    movieName = "Mr Nobody";
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(urlHit).then(
    function (response) {
      var jsonData = response.data;
      // console.log(jsonData);
      console.log(
        "\nMovie Info " + "\nTitle: " + jsonData.Title +
        "\nRelease Year: " + jsonData.Year +
        "\nRating: " + jsonData.Rated +
        "\nRelease Country: " + jsonData.Contry +
        "\nLanguage: " + jsonData.Language +
        "\nPlot: " + jsonData.Plot +
        "\nActors: " + jsonData.Actors + "\n" + "\n This is a Hit movie!");
    }
  );
};

// Function for running a command based on text file
var doWhatItSays = function () {
  fs.readFile("random.txt", "utf8", function (error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    }
    else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};

// Function for determining which command is executed
var pick = function (command, commandData) {
  // This will be the main function to control which method to call. See function "runThis" is calling this pick method
  // useing the switch and case instead of if / else to get the correct action picked  where commandData will be what the user placed as a data to do
  switch (command) {
    case "concert-this":
      getMyBands(commandData);
      break;
    case "spotify-this":
      getMeSpotify(commandData);
      break;
    case "movie-this":
      getMeMovie(commandData);
      break;
    case "do-what":
      doWhatItSays(commandData);
      break;
    default:
      console.log("Not sure what you are doing. \nType node liri.js 'movie' for an example");
      break;
  }
};

// Function which takes in command line arguments and executes correct function accordingly
var runThis = function (argOne, argTwo) {
  pick(argOne, argTwo);
};

// MAIN PROCESS
// =====================================
runThis(process.argv[2], process.argv.slice(3).join(" "));
