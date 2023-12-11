

import {MOVIES_KEY} from "../.idea/keys.js";
import {addMovieToDatabase, updateMovie, deleteMovie} from "./db-api.js";

"use strict";
(async () => {

// loading animation
document.addEventListener('DOMContentLoaded', async function () {
    // Display "loading..." message initially
    const loadingElement = document.getElementById('loadingElement');
    try {
        // Simulating an AJAX request with a delay
        await new Promise(resolve => setTimeout(resolve, 5000));
        // Remove the "loading..." element
        loadingElement.style.display = 'none';
        // Your other logic here after the AJAX request comes back
        console.log('AJAX request completed');
    } catch (error) {
        console.error('Error:', error.message);
    }
});

    const getAllMovies = async () => {
        try {
            let url = 'http://localhost:3000/movies';
            const options = {
                method: 'GET', headers: {
                    'Content-Type': 'application/json',
                }
            }

            const response = await fetch(url, options);
            return await response.json();
        } catch (error) {
            console.log(error.message);
        }
    };


    //Edit button to update movie in Json
    function onEditButton (movieObject) {
        document.querySelector('#title').value = movieObject.title;
        document.querySelector('#rating').value = movieObject.rating;
        document.querySelector('#genre').value = movieObject.genre;
        document.querySelector('#summary').value = movieObject.summary;
        document.querySelector('#hidden-id').value = movieObject.id;
    }

    // Event Listner to update movie in Json
    document.getElementById('save-btn').addEventListener('click', async (e) => {
        e.preventDefault();
        let title = document.querySelector('#title').value;
        let rating = document.querySelector('#rating').value;
        let genre = document.querySelector('#genre').value;
        let summary = document.querySelector('#summary').value;
        let id = document.querySelector('#hidden-id').value;
        let changeMovie = {
            id:id, title: title, genre: genre, rating: rating, summary: summary,
        }

        await updateMovie(changeMovie);
        await renderJsons();
    });



// Add Movie to Jason Server
    const addMovie = async (movieObject) => {
        await addMovieToDatabase(movieObject);
    };


// Event Listner to add movie to Json
    document.getElementById('add-btn').addEventListener('click', async (e) => {
        e.preventDefault();
        let title = document.querySelector('#title').value;
        let rating = document.querySelector('#rating').value;
        let genre = document.querySelector('#genre').value;
        let summary = document.querySelector('#summary').value;
        let newMovie = {
            title: title, genre: genre, rating: rating, summary: summary,
        }

        await addMovie(newMovie);
        await renderJsons();
    });



    async function renderJsons() {
        let allJsonMovies = await getAllMovies();
        let thisContainer = document.getElementById('savedMoviesContainer');
        thisContainer.innerHTML = '';
        const savedMovieCards = allJsonMovies.map(movie => {
            let card = document.createElement('div');
            card.classList.add('card', 'movie-card');
            card.innerHTML = `
            <p class="card__title">${movie.title}</p>
            <p class="card__genre">${movie.genre}</p>
            <p class="card__rating"> Rating ${movie.rating}/5</p>
            <p class="card__summary">${movie.summary}</p>
            `;

            let removeButton = document.createElement('button');
            removeButton.innerHTML = 'Delete';
            removeButton.classList.add(
                'bg-red-500',      // Red background
                'text-white',      // White text
                'rounded-md',      // Border-radius of 4
                'shadow-md',       // Drop shadow
                'hover:bg-red-600', // Hover feature
                'p-2',             // Padding of 2 units
                'mr-4'             // Right margin of 4 units
            );
            removeButton.addEventListener('click', async () => {
                await deleteMovie(`${movie.id}`);
                await renderJsons();
            });
            card.appendChild(removeButton);

            let editButton = document.createElement('button');
            editButton.innerHTML = 'Edit';
            editButton.classList.add(
                'bg-red-500',      // Red background
                'text-white',      // White text
                'rounded-md',      // Border-radius of 4
                'shadow-md',       // Drop shadow
                'hover:bg-red-600', // Hover feature
                'p-2',             // Padding of 2 units
                'mr-4'             // Right margin of 4 units
            );
            editButton.addEventListener('click', async () => {
                await onEditButton(movie);
            });
            card.appendChild(editButton);

            return card;
        });

        savedMovieCards.forEach(card => {
            thisContainer.appendChild(card);
        });
    }

    const movieContainer = document.getElementById('savedMoviesContainer');


    async function fetchAndRenderMovies() {
        try {
            const moviesData = await fetchMovies();
            renderMovies(moviesData);
            renderJsons(moviesData);
        } catch (error) {
            console.log(error);
        }
    }
    fetchAndRenderMovies();

    function renderMovies(movieData) {
        movieContainer.innerHTML = '';

        // Loop through the movie data and create/render movie cards
        movieData.forEach( (movie) => {
            const movieCard = createMovieCard(movie);
            movieContainer.appendChild(movieCard);
        });
    }
    await renderJsons()

    const getMoviePosters = async (title) => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${MOVIES_KEY}`
                }
            };
            console.log(MOVIES_KEY);
            const omdbUrl  = await fetch('http://www.omdbapi.com/?t=' + title + '&apikey=' + MOVIES_KEY);
            console.log(omdbUrl);
            return await omdbUrl.json();

        } catch (err) {
            console.error(err);
        }
    };
    getMoviePosters();

})()