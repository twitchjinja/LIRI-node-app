require("dotenv").config();
var fs = require("fs");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var command = process.argv[2];
var request = process.argv[3];
var moment = require('moment');
if (command === "movie-this") {
  var url = "http://www.omdbapi.com/?t=" + request + "&y=&plot=short&apikey=trilogy";
  axios.get(url).then(
    function (response) {
      //console.log(response);
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("Rating: " + response.data.imdbRating);
      console.log("Rotten Tomato: " + JSON.stringify(response.data.Ratings[0].Value));
      console.log("Country: " + response.data.Country);
     console.log("Language: " + response.data.Language);
      console.log("Actors: " + response.data.Actors);
      console.log("Plot: " + response.data.Plot);

    }
  ).catch(function (error) {
    console.log(error);
  });;
}

if (command === "concert-this") {
  axios.get("https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp&date=upcoming").then(
    ((response) => {
      //console.log(response);
      var venue = response.data[0].venue
      console.log("Venue: " + venue.country + "\n" + venue.name + "\n" + venue.region + "\n" + venue.city);
      console.log("Date: " + (moment(response.data[0].datetime).format("MMM Do YYYY")));
      // console.log(response.data[0].venue)
      //console.log(venue.name)
      //console.log(venue.country +"\n" +venue.name +"\n"+ venue.region)
    }));
};


if (command === "spotify-this-song") {
  spotify.search({ type: 'track', query: request }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].artists[0].uri);
    console.log(data.tracks.items[0].album.name);
  })
};
if (command === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    else {
      var data1 = data.split(",");
      var dataLeft = data1[1];
      spotify.search({ type: 'track', query: dataLeft }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].artists[0].uri);
        console.log(data.tracks.items[0].album.name);
      })

    }
  })
}