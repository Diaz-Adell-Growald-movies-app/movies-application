import {MOVIES_KEY} from "../.idea/keys.js";
import {addMovieToDatabase, updateMovie} from "./db-api.js";


(async () => {
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


    // Start the edit button to update movie in Json
    function onEditButton (movieObject) {
        document.querySelector('#title').value = movieObject.title;
        document.querySelector('#rating').value = movieObject.rating;
        document.querySelector('#genre').value = movieObject.genre;
        document.querySelector('#summary').value = movieObject.summary;
        document.querySelector('#hidden-id').value = movieObject.id;
    }

// Add Movie to Jason Server
    const addMovie = async (movieObject) => {
        await addMovieToDatabase(movieObject);
    };


// submit button to add movie to Json
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


    // Save Changes button to update movie in Json
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


    const removeMovie = async (id) => {
        try {
            let url = `http://localhost:3000/movies`;
            const options = {
                method: 'DELETE', headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(`${url}/${id}`, options);
            return response.json();
        } catch (error) {
            console.log(error.message);
        }
    };



    const searchMoviesAPI = async (movieName) => {
        try {
            let url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=`
            const options = {
                method: 'GET', headers: {
                    'Content-Type': 'application/json',
                }
            }

            const response = await fetch(`${url}${MOVIES_KEY}`, options);
            return await response.json();
        } catch (error) {
            console.log(error.message);
        }

    }


    async function renderJsons() {
        let allJsonMovies = await getAllMovies();
        let thisContainer = document.getElementById('savedMoviesContainer');
        thisContainer.innerHTML = '';
        const savedMovieCards = allJsonMovies.map(movie => {
            let card = document.createElement('div');
            card.innerHTML = `
        <div class="card column">
            <p class="card__title">${movie.title}</p>
            <p class="card__genre">${movie.genre}</p>
            <p class="card__rating">${movie.rating}</p>
            <p class="card__summary">${movie.summary}</p>
        </div>`;

            let removeButton = document.createElement('button');
            removeButton.innerHTML = 'Delete';
            removeButton.addEventListener('click', async () => {
                await removeMovie(movie.id);
                await renderJsons();
            });
            card.appendChild(removeButton);

            let editButton = document.createElement('button');
            editButton.innerHTML = 'Edit';
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



    const movieContainer = document.getElementById('savedMoviesContainer');

    async function fetchAndRenderMovies() {
        try {
            const moviesData = await fetchMovies();
            console.log(moviesData);
            // renderMovies(moviesData);
            renderJsons(moviesData);
        } catch (error) {
            console.log(error);
        }
    }

    // fetchAndRenderMovies();


    function renderMovies(movieData) {
        movieContainer.innerHTML = '';

        // Loop through the movie data and create/render movie cards
        movieData.forEach((movie) => {
            const movieCard = createMovieCard(movie);
            movieContainer.appendChild(movieCard);
        });
    }





    await renderJsons()

})()