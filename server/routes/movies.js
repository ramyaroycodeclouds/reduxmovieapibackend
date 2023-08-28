const express = require('express');
const movies = express.Router();
const movieController = require('../controllers/movieController');

 
movies.get('/movies/:searchType?/:searchValue?/:key?', movieController.getByTitle);

 

module.exports = movies;