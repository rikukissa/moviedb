'use strict';

var express = require('express');
var app = express(); // Luodaan uusi express-applikaatio

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var movies = [{ // Väliaikainen tietokanta elokuville
  title: 'Robocop',
  year: 1987
}, {
  title: 'Predator',
  year: 1987
}];

// Endpoint kaikkien elokuvien hakemiseen
app.get('/movies', function(req, res) {
  res.send(movies);
});

// Endpoint elokuvien tallentamiseen
app.post('/movies', function(req, res) {
  var newMovie = req.body;
  newMovie.id = movies.length + 1;

  movies.push(newMovie);

  res.status(201).send(newMovie);
});

// Asetetaan applikaatio kuuntelemana porttia 9000 ja
// tulostetaan viesti kun se on valmis vastaanottamaan kyselyitä
app.listen(9000, function() {
  console.log('Movie API listening port 9000');
});
