"use strict";

const apiKey = "ba79b8b22fcd35d753678de756210c23"; // API key is from themoviedb.org

// A function to search for the movies you want
function searchMovies() {
  const searchInput = document.querySelector("#searchInput").value;

  if (searchInput.trim() === "") {
    alert("Please enter a movie title.");
    return;
  }

  // the api used is from themoviedb.org
  const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&api_key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => displayMovies(data.results))
    .catch((error) => console.error("Error fetching data:", error));
}

// A function to display the movies you chose
function displayMovies(movies) {
  const movieList = document.querySelector("#movieList");
  movieList.innerHTML = "";

  if (!movies || movies.length === 0) {
    alert("Sorry, No movies found. Please try another search.");
    return;
  }

  // Loop through each movie object in the array
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const title = document.createElement("h2");
    title.textContent = movie.title;

    const releaseDate = document.createElement("p");
    releaseDate.textContent = `Release Date: ${movie.release_date}`;

    const poster = document.createElement("img");
    poster.classList.add("movie-poster");
    poster.src = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "no-poster.jpg";
    poster.alt = movie.title;

    movieCard.appendChild(title);
    movieCard.appendChild(releaseDate);
    movieCard.appendChild(poster);

    movieList.appendChild(movieCard);
  });
}
