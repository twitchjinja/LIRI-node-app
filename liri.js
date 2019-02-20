require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var command = process.argv[2];
var request = process.argv[3];

if (command === "movie-this") {
  axios.get("http://www.omdbapi.com/?t=" + request + "&y=&plot=short&apikey=trilogy").then(
    function (response) {
      console.log("Title: " + response.data.Title)
      console.log("Year: " + response.data.Year)
      console.log("Rating: " + response.data.imdbRating)
      console.log("Rotten Tomato: " + JSON.stringify(response.data.Ratings[1]))
      console.log("Country: " + response.data.Country)
      console.log("Language: " + response.data.Language)
      console.log("Actors: " + response.data.Actors)
      console.log("Plot: " + response.data.Plot)

    }
  );
}
debugger;
if (command === "concert-this"){
  axios.get("https://rest.bandsintown.com/artists/"+ request +"/events?app_id=codingbootcamp&date=upcoming").then(
    ((response) => {
      console.log(response);
      console.log(response.data);
      var responseData = JSON.parse(response.data);
      console.log(responseData.venue.name);
      //console.log(JSON.stringify(response.venue));
    }));
  };
debugger;


//spotify;
//axios.get("https://api.spotify.com/v1/search?q=track:stan")
  //.search({ type: 'track', query: 'All the Small Things' })
  //.then(function (response) {
    //console.log(JSON.stringify(response));
    //var spotifyResponse = JSON.stringify(response).split(",");
   // console.log(JSON.stringify(response.data));
 // })
  //.catch(function (err) {
 //   console.log(err);
 // });

