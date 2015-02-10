'use strict';

var listEl = document.getElementById('movies');
var formEl = document.getElementById('submit-movie');
var titleInput = document.querySelectorAll('input[name="title"]')[0];
var yearInput = document.querySelectorAll('input[name="year"]')[0];

function createListItem(movie) {
  var li = document.createElement('li');
  li.innerHTML = movie.title + ' (' + movie.year + ')';
  listEl.appendChild(li);
}

// Haetaan elokuvat backendistä
$.get('/movies', function(movies) {
  movies.forEach(createListItem);
});


// Kuunnellaan 'submit' eventtiä formilta ja lähetetään elokuva
// backendiin

formEl.addEventListener('submit', function(e) {

  e.preventDefault();

  var newMovie = {
    title: titleInput.value,
    year: yearInput.value
  };

  $.ajax({
    type: 'POST',
    url: '/movies',
    contentType: 'application/json',
    data: JSON.stringify(newMovie),
    success: function(movie) {

      // Tyhjennetään tekstikentät ja luodaan uusi elokuva listaan
      titleInput.value = '';
      yearInput.value = '';

      createListItem(movie);
    },
    dataType: 'json'
  });

});


