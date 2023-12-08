// main.js
// import { initializeApp } from './appInitializer';
import { getMovies, renderAllMovieCards } from './movieFunctions';
import { fetchMovies } from './moviesApi';

// Assuming you have a container element in your HTML with the id 'movie-container'
const movieContainer = document.getElementById('movie-container');

// Initialize the application
// initializeApp();


async function fetchAndRenderMovies() {
    try {
        const moviesData = await fetchMovies();
        renderMovies(moviesData);
    } catch (error) {
        console.error('Error fetching or rendering movies:', error);
    }
}

fetchAndRenderMovies();


function renderMovies(movieData) {
    // Clear existing content in the container
    movieContainer.innerHTML = '';

    // Loop through the movie data and create/render movie cards
    movieData.forEach((movie) => {
        const movieCard = createMovieCard(movie);
        movieContainer.appendChild(movieCard);
    });
}

// Sample movies data (replace this with your actual data or fetched movies)
const movies = [
    { title: 'Movie 1', genre: 'Action' },
    { title: 'Movie 2', genre: 'Comedy' },
    // Add more movies as needed
];

function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';

    const titleElement = document.createElement('h4');
    titleElement.textContent = movie.title;
    movieCard.appendChild(titleElement);

    const genreElement = document.createElement('p');
    genreElement.textContent = movie.genre;
    movieCard.appendChild(genreElement);

    // Add more elements as needed for your movie card structure

    return movieCard;
}



<script type="module" src="js/main.js"></script>
<script type="module" src="js/ui-functions.js"></script>
<script type="module" src="js/movieFunctions.js"></script>
<script type="module" src="js/moviesApi.js"></script>