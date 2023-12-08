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
        let changeMovie = {
            title: title, genre: genre, rating: rating, summary: summary,
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

    const getTopAPIMovies = async () => {
        try {
            let url = 'https://api.themoviedb.org/3/movie/popular/?api_key=';
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

    let initialMovies = await getTopAPIMovies();
    // function deleteById(id) {
    //     alert(id);
    // }

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

//             card.innerHTML = `
//       <div class="column thisCard">
//               <p class="card__title">${movie.title}</p>
//              <p class="card__description">${movie.desc}</p>
//              <br>
//              <div class=" row gap-5">
//
//              <form>
//              <input type="hidden" value="${movie.id}">
//               <button  onclick="deleteById(${movie.id})" type="button" class="remove-btn" class="w-20 h-7 bg-orange-300 tracking-widest
// rounded-md text-amber-700 text-md shadow-2xl hover:scale-90 ease-in duration-300
// hover:text-base hover:font-semibold hover:rounded-lg">
//                   Remove
//                 </button>
//                 </form>
//
//                 <form>
//                 <input type="hidden" value="${movie.id}">
//                 <button type="button" class="edit-btn" class="w-20 h-7 bg-orange-300 tracking-widest
// rounded-md text-amber-700 text-md shadow-2xl hover:scale-90 ease-in duration-300
// hover:text-base hover:font-semibold hover:rounded-lg">
//                     Edit
//                 </button>
//                 </form>
// </div>
//                 <br>
//            </div>
//        </div>`;


    //
    // document.querySelectorAll('.remove-btn').forEach(function (button) {
    //     button.addEventListener('click', async function (e) {
    //         alert('remove');
    //         e.preventDefault()
    //         console.log(e);
    //         console.log (e.parentNode);
    //         let id = button.parentNode.querySelector('input').value;
    //         alert(id);
    //         await removeMovie(id);
    //         renderJsons();
    //     })
    // })
    //
    //
    // document.querySelectorAll('.edit-btn').forEach(function (button) {
    //     button.addEventListener('click', async function (e) {
    //         e.preventDefault()
    //         let id = button.parentNode.querySelector('input').value;
    //         alert(id);
    //         await updateMovie(id);
    //         renderJsons();
    //     })
    // })


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


    function createMovieCard(movie) {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';

        const titleElement = document.createElement('h4');
        titleElement.textContent = movie.title;
        movieCard.appendChild(titleElement);

        const genreElement = document.createElement('p');
        genreElement.textContent = movie.genre;
        movieCard.appendChild(genreElement);

        const ratingElement = document.createElement('p');
        genreElement.textContent = movie.rating;
        movieCard.appendChild(genreElement);

        const summaryElement = document.createElement('p');
        genreElement.textContent = movie.summary;
        movieCard.appendChild(genreElement);

        // Add more elements as needed for your movie card structure

        return movieCard;
    }

//
//     const movieCard = initialMovies.results.map(movie => {
//         let card = document.createElement('div');
//
//         card.innerHTML = `
//       <div class="card column">
//           <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" style=" height: 500px; width: 250px" alt="poster picture">
//           <div class="card__content">
//               <p class="card__title">${movie.title}</p>
//              <p class="card__description">${movie.overview}</p>
//              <br>
//               <button class="w-40 h-10 bg-orange-300 tracking-widest
// rounded-md text-amber-600 text-md shadow-2xl hover:scale-90 ease-in duration-300
// hover:text-base hover:font-semibold hover:rounded-lg">
//                     Favorite
//                 </button>
//            </div>
//        </div>`;
//         card.querySelector('button').addEventListener('click', async () => {
//             let newMovie = {
//                 id: movie.id,
//                 title: movie.title,
//                 desc: movie.overview,
//             }
//             await addMovie(newMovie);
//             renderJsons();
//         })
//         return card;
//     });
//
//     // Append each card to the DOM.
//     movieCard.forEach(card => {
//         movieContainer.appendChild(card);
//     });


    //search function
//     document.querySelector('#search-btn').addEventListener('click', async () => {
//         movieContainer.innerHTML = '';
//         const searchValue = document.querySelector('input').value;
//         let searchedMovie = await searchMoviesAPI(searchValue);
//
//         const movieCard = searchedMovie.results.map(movie => {
//             let card = document.createElement('div');
//
//             card.innerHTML = `
//       <div class="card column" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
//           <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" style=" height: 500px; width: 250px" alt="poster picture">
//           <div class="card__content">
//               <p class="card__title">${movie.title}</p>
//              <p class="card__description">${movie.overview}</p>
//              <br>
//               <button class="w-40 h-10 bg-orange-300 tracking-widest
// rounded-md text-amber-600 text-md shadow-2xl hover:scale-90 ease-in duration-300
// hover:text-base hover:font-semibold hover:rounded-lg">
//                     Favorite
//                 </button>
//            </div>
//        </div>`;
//             card.querySelector('button').addEventListener('click', async () => {
//                 let newMovie = {
//                     id: movie.id,
//                     title: movie.title,
//                     desc: movie.overview,
//                 }
//                 await addMovie(newMovie);
//                 renderJsons();
//             })
//             return card;
//         });
//
//         // Append each card to the DOM.
//         movieCard.forEach(card => {
//             movieContainer.appendChild(card);
//         });
//
//
//     })
    await renderJsons()

})()