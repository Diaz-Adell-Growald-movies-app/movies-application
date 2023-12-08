// uiFunctions

import { getMovies } from './movieFunctions.js';

export function renderAllMovieCards(movies) {
    const movieCardsContainer = document.querySelector('.movie-cards');

    // Clear existing content
    movieCardsContainer.innerHTML = '';

    // Render each movie card
    movies.forEach((movie) => {
        // Create a new movie card element
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';

        // Set innerHTML or use other methods to populate movieCard with movie details
        movieCard.innerHTML = `
            <h4 class="movie-card-title">${movie.title}</h4>
            <p class="movie-card-genre">${movie.genre}</p>
            <!-- Add other movie details as needed -->
        `;

        // Append the movie card to the container
        movieCardsContainer.appendChild(movieCard);
    });
}

export function renderSearchedMovies(movies) {
    // Implementation
}

export function renderEditForm(card) {
    // Implementation
}

export function renderFavorites(favoritesList) {
    // Implementation
}
