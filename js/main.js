// main.js
// import { initializeApp } from './appInitializer';
// import { getMovies, renderAllMovieCards } from './movieFunctions';
// import { fetchMovies } from './moviesApi';

// Assuming you have a container element in your HTML with the id 'movie-container'
// const movieContainer = document.getElementById('savedMoviesContainer');
//
// // Initialize the application
// // initializeApp();
//
//
// async function fetchAndRenderMovies() {
//     try {
//         const moviesData = await fetchMovies();
//         console.log(moviesData);
//         // renderMovies(moviesData);
//         renderJsons(moviesData);
//     } catch (error) {
//         console.log(error);
//     }
// }
//
// fetchAndRenderMovies();
//
//
// function renderMovies(movieData) {
//     movieContainer.innerHTML = '';
//
//     // Loop through the movie data and create/render movie cards
//     movieData.forEach((movie) => {
//         const movieCard = createMovieCard(movie);
//         movieContainer.appendChild(movieCard);
//     });
// }
//
//
// function createMovieCard(movie) {
//     const movieCard = document.createElement('div');
//     movieCard.className = 'movie-card';
//
//     const titleElement = document.createElement('h4');
//     titleElement.textContent = movie.title;
//     movieCard.appendChild(titleElement);
//
//     const genreElement = document.createElement('p');
//     genreElement.textContent = movie.genre;
//     movieCard.appendChild(genreElement);
//
//     const ratingElement = document.createElement('p');
//     genreElement.textContent = movie.rating;
//     movieCard.appendChild(genreElement);
//
//     const summaryElement = document.createElement('p');
//     genreElement.textContent = movie.summary;
//     movieCard.appendChild(genreElement);
//
//     // Add more elements as needed for your movie card structure
//
//     return movieCard;
// }



// // Sample movies data (replace this with your actual data or fetched movies)
// const movies = [
//     { title: 'Movie 1', genre: 'Action' },
//     { title: 'Movie 2', genre: 'Comedy' },
//     // Add more movies as needed
// ];