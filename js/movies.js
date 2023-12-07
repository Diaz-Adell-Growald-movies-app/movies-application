// Function to fetch all movies from the server
const getAllMovies = async () => {
    try {
        let url = 'http://localhost:3000/movies';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};

// Function to add a movie to the server
const addMovie = async (movieObject) => {
    try {
        let url = `http://localhost:3000/movies`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieObject),
        };

        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};

// Function to update a movie on the server
const updateMovie = async (movie) => {
    try {
        let url = `http://localhost:3000/movies`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        };
        const response = await fetch(`${url}/${movie.id}`, options);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
};

// Function to remove a movie from the server
const removeMovie = async (id) => {
    try {
        let url = `http://localhost:3000/movies`;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(`${url}/${id}`, options);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
};

// Function to fetch top movies from an API
const getTopAPIMovies = async () => {
    try {
        let url = 'https://api.themoviedb.org/3/movie/popular/?api_key=' + MOVIES_KEY;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};


// Function to search movies from an API
const searchMoviesAPI = async (movieName) => {
    try {
        let url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(`${url}${MOVIES_KEY}`, options);
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};

// Immediately invoked function to initialize the page
(async () => {
    const movieContainer = document.querySelector(".card-bodies");
    const savedMoviesContainer = document.querySelector('.savedMoviesContainer');

    let initialMovies = await getTopAPIMovies();

    async function renderJsons() {
        let allJsonMovies = await getAllMovies();
        savedMoviesContainer.innerHTML = '';
        const savedMovieCards = allJsonMovies.map(movie => {
            let card = document.createElement('div');

            card.innerHTML = `
                <div class="column thisCard" data-id="${movie.id}">
                    <p class="card__title">${movie.title}</p>
                    <p class="card__description">${movie.desc}</p>
                    <br>
                    <div class="row gap-5">
                        <button class="remove-btn w-20 h-7 bg-orange-300 tracking-widest
                            rounded-md text-amber-700 text-md shadow-2xl hover:scale-90 ease-in duration-300
                            hover:text-base hover:font-semibold hover:rounded-lg">
                            X
                        </button>
                        <button class="edit-btn w-20 h-7 bg-orange-300 tracking-widest
                            rounded-md text-amber-700 text-md shadow-2xl hover:scale-90 ease-in duration-300
                            hover:text-base hover:font-semibold hover:rounded-lg">
                            Edit
                        </button>
                    </div>
                    <br>
                </div>
            </div>`;

            return card;
        });

        // Append each card to the DOM.
        savedMovieCards.forEach(card => {
            savedMoviesContainer.appendChild(card);
        });
    }

    renderJsons();

    const movieCard = initialMovies.results.map(movie => {
        let card = document.createElement('div');

        card.innerHTML = `
            <div class="card column">
                <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" style="height: 500px; width: 250px" alt="poster picture">
                <div class="card__content">
                    <p class="card__title">${movie.title}</p>
                    <p class="card__description">${movie.overview}</p>
                    <br>
                    <button class="favorite-btn w-40 h-10 bg-orange-300 tracking-widest
                        rounded-md text-amber-600 text-md shadow-2xl hover:scale-90 ease-in duration-300
                        hover:text-base hover:font-semibold hover:rounded-lg">
                        Favorite
                    </button>
                </div>
            </div>`;

        return card;
    });

    // Append each card to the DOM.
    movieCard.forEach(card => {
        movieContainer.appendChild(card);
    });

    // Event delegation for removing and editing saved movies
    savedMoviesContainer.addEventListener('click', async (event) => {
        const targetButton = event.target;
        if (targetButton.classList.contains('remove-btn')) {
            // Handle remove button click
            const movieId = targetButton.closest('.thisCard').dataset.id;
            await removeMovie(movieId);
            renderJsons();
        } else if (targetButton.classList.contains('edit-btn')) {
            // Handle edit button click
            const movieId = targetButton.closest('.thisCard').dataset.id;
            const newDesc = prompt('What do you want the new movie description to be?');
            const titleElement = targetButton.closest('.thisCard').querySelector('.card__title');
            const movieTitle = titleElement.textContent.trim();

            const updatedMovie = {
                id: movieId,
                title: movieTitle,
                desc: newDesc,
            };
            await updateMovie(updatedMovie);
            renderJsons();
        }
    });

    // Append each card to the DOM.
    movieCard.forEach(card => {
        movieContainer.appendChild(card);
    });

})();