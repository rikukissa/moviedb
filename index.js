'use strict';

var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var app = express(); // Luodaan uusi express-applikaatio

var bodyParser = require('body-parser');

app.use(bodyParser.json());

// Endpoint kaikkien elokuvien hakemiseen
app.get('/movies', function(req, res, next) {
  app.movies.find().toArray(function(err, results) {
    if(err) {
      next(err);
      return;
    }
    res.send(results);
  });
});

// Endpoint elokuvien tallentamiseen
app.post('/movies', function(req, res, next) {
  var newMovie = req.body;

  app.movies.insert(newMovie, function(err, newMovies) {

    if(err) {
      next(err);
      return;
    }

    res.status(201).send(newMovies);
  });

});

app.use(function(err, req, res, next) {
  res.status(500).send('Internal server error');
});

MongoClient.connect('mongodb://127.0.0.1:27017/moviedb', function(err, db) {
  if(err) {
    throw err;
  }
  app.movies = db.collection('movies');

  // Asetetaan applikaatio kuuntelemana porttia 9000 ja
  // tulostetaan viesti kun se on valmis vastaanottamaan kyselyitä

  app.listen(9000, function() {
    console.log('Movie API listening port 9000');
  });
});
