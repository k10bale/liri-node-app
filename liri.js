
require("dotenv").config();
var keys = require("./keys.js")
var fs = require("fs");
var Spotify = require("node-spotify-api");

var request = require("request");
var input = JSON.stringify(process.argv[3]);
var liriResponse = process.argv[2];
// var moment = require("moment");
var divider = "\n------------------------------------------------------------\n\n";

switch (liriResponse){
  case "spotify-this-song":
  if (input === undefined){
    input = 'The Sign (Ace of Base)';
    spotifyThisSong();
  }
  spotifyThisSong();
  break;

  case "concert-this":
  concertThis();
  break;

  case "movie-this":
  if (input === undefined){
    input = 'Mr. Nobody';
    movieThis();
  }
  movieThis();
  break;

  case "do-what-it-says":
  doWhatItSays();
  break;

  default: console.log("\n" + "======= type any command (search term wrapped in quotes) after 'node liri.js': =======" + "\n" + 
                          "spotify-this-song" + "\n" +
                          "concert-this" + "\n" +
                          "movie-this" + "\n" +
                          "do-what-it-says" + "\n");
};
 
function concertThis(){
  var bandSearch = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
 
  request(bandSearch, function(error, response, body){
    console.log(JSON.parse(body));
    // if (error) {
    //     console.log("Error" + error);
    //     return;
    // } else {
    //   var objectBody = JSON.parse(body);
    //         for (i = 0; i < objectBody.length; i++) {
    //     output =  "================= LIRI SAYS...==================" +
    //     "Venue: " + objectBody[i].venue.name +
    //     "City: " + objectBody[i].venue.city + ", " + objectBody[i].venue.country +
    //     "Dates: " + moment(objectBody[i].datetime).format("MM/DD/YY");
    //   console.log(output);
    // fs.appendFile('log.txt', output + divider, function (err) {
    //   if (err) throw err;
    //   console.log(output);
    // });
  
  
});
}





function spotifyThisSong(){
  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: 'track', query: input }, function(error, data) {
    if (error) {
      console.log("Error" + error);
      return;
    } else {
    output = `================= LIRI SAYS...==================
    Song Name: ${input.toUpperCase()} 
    Album Name: ${data.tracks.items[0].album.name} 
    Artist Name: ${data.tracks.items[0].album.artists[0].name} 
    URL: ${data.tracks.items[0].album.external_urls.spotify} `;

    fs.appendFile('log.txt', output + divider, function (err) {
  if (err) throw err;
  console.log(output);
});
  };
});
};

function movieThis(){
  var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

  
    request(queryUrl, function(error, response, body) {
      if (error) {
          console.log("Error" + error);
          return;
      } else {
          var jsonData = JSON.parse(body);
    output = `================= LIRI SAYS...==================
    Title: ${jsonData.Title} 
    Year: ${jsonData.Year} 
    Rated: ${jsonData.Rated} 
    Country: ${jsonData.Country} 
    Language: ${jsonData.Language} 
    Plot: ${jsonData.Plot} 
    Actors: ${jsonData.Actors} 
    IMDB Rating: ${jsonData.imdbRating} 
    Tomato Rating: ${jsonData.Ratings[1].Value} `;

    fs.appendFile('log.txt', output + divider , function (err) {
       if (err) throw err;
      console.log(output);
     });
  }
  });
  }



  var fs = require("fs");

  function doWhatItSays() {
      fs.readFile('random.txt', 'utf8', function (error, data) {
          if (error) {
              return console.log(error);
          }
          console.log(data);
      })
  };
  
  