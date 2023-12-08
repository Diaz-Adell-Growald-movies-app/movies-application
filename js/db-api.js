// movie-app.js
// import express from 'express';
// import cors from 'cors';
// const app = express();
//
// // Enable CORS
// app.use(cors());
//
// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

let loaderAnim = document.querySelector('.loading');

// Functions to talk to the Database
async function getMovies() {
    // loaderAnim.style.display = 'flex';
    try {
        const url = 'http://localhost:3000/movies';
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        };
        const response = await fetch(url, options);
        const movies = await response.json();
        // loaderAnim.style.display = 'none';
        return movies;
    } catch (error) {
        // loaderAnim.innerHTML = 'ERROR: Failed to fetch movies';
        console.error('Error fetching movies:', error);
        throw error;
    }
}

export async function addMovieToDatabase(movieObject) {
    try {
        let url = `http://localhost:3000/movies`;
        const options = {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(movieObject)
        }

        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
}

async function deleteMovie(id) {
    loaderAnim.style.display = 'flex';
    const url = `http://localhost:3000/movies/${id}`
    const options = {
        method: 'DELETE'
    }
    fetch(url, options)
        .then(response => {
            loaderAnim.style.display = 'none';
            console.log(`deleted`)
        })
        .catch(error => console.error(error));
}


export async function updateMovie(movieObject) {
    try {
        let url = `http://localhost:3000/movies`;
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(movie)
        };
        const response = await fetch(`${url}/${movie.id}`, options);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
};

// Exporting getMovies function
export { getMovies };

// // WHERE THE MAGIC HAPPENS
// (async () => {
//     // VARIABLES AND QUERIES
//     // variables
//     let movies = await getMovies();
//     // queries
//     const movieCards = document.querySelector(".movie-cards");
//     const searchInput = document.querySelector("#search-input");
//     const sideMenu = document.querySelector(".column.side-menu");
//     const submitMovieTitleTextBox = document.querySelector("#submit-movie-title");
//     const submitMovieGenre = document.querySelector("#submit-movie-genre");
//     const submitMovieBtn = document.querySelector("#submit-movie-btn");
//     let allMovieCards;
//     const movieCard = document.querySelector('.movie-cards');
//     let editForm;
//     let favoritesList = [];
//     let favoritesListDiv = document.querySelector('.favorites-list');
//     const menuFavoritesLink = document.querySelector('#menu-favorites');
//
//     // FUNCTIONS
//     function renderAllMovieCards() {
//         movieCards.innerHTML = "";
//         movies.forEach((movie) => {
//             const starRating = "&starf;".repeat(parseInt(movie.rating) || 0);
//             const movieCardHTML = `
//             <div class="movie-card">
//                 <div class="movie-card-rating">${starRating}</div>
//                 <h4 class="movie-card-title">${movie.title}</h4>
//                 <p class="movie-card-genre">${movie.genre}</p>
//                 <div class="card-mod">
//                     <span class="edit-movie">EDIT</span>
//                     <span class="add-fav">+</span>
//                     <span class="delete-movie">X</span>
//                 </div>
//             </div>`;
//             movieCards.innerHTML += movieCardHTML;
//         });
//     }

    // other functions...

    // EVENTS
    // searchInput.addEventListener('keyup', (event) => {
    //     searchMovies(searchInput.value);
    // })

    // other event listeners...

// RUN ON LOAD
//     movies = await getMovies(); // Remove the 'let' to avoid re-declaration
//     console.log(movies);
//     renderAllMovieCards();
// })();