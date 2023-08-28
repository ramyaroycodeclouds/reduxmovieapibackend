const mongoose = require("mongoose");
 
let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Year: {type: String, required: true},
    Rated: {type: String, required: true},
    Released : {type: String},
    Runtime : {type: String},
    Genre : {type: String, required: true},
    Director : {type: String, required: true},
    Writer : {type: String, required:true},
    Actors : {type: String, required:true},
    Plot :  {type : String, required:true},
    Language : {type: String},
    Country : {type: String},
    Awards : {type: String},
    Poster : {type: String},
    Ratings : { type : Array , "default" : [] },
    Metascore : {type: String},
    imdbRating : {type: String},
    imdbVotes : {type: String},
    imdbID : {type: String , required:true},
    Type : {type: String},
    DVD : {type: String},
    BoxOffice : {type: String},
    Production : {type: String},
    Website : {type: String}
});


module.exports = mongoose.model(
    'Movie', movieSchema, 'Movie');