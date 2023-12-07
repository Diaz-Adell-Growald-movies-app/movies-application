const getAllMovies = async () => {
    try {
        let url = 'http://localhost:3000/movies';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
};

const addMovie = async (movieObject) => {
    try {
        let url = `http://localhost:3000/movies`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieObject)
        }

        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }

};


const updateMovie = async (movie) => {
    try {
        let url = `http://localhost:3000/movies`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        };
        const response = await fetch(`${url}/${movie.id}`, options);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
};

const removeMovie = async (id) => {
    try {
        let url = `http://localhost:3000/movies`;
        const options = {
            method: 'DELETE',
            headers: {
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
            method: 'GET',
            headers: {
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
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(`${url}${MOVIES_KEY}`, options);
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }

}


(async () => {

    const movieContainer = document.querySelector(".card-bodies");

    let initialMovies = await getTopAPIMovies();

    async function renderJsons() {
        let allJsonMovies = await getAllMovies();
        let thisContainer = document.querySelector('.savedMoviesContainer');
        thisContainer.innerHTML = '';
        const savedMovieCards = allJsonMovies.map(movie => {
            let card = document.createElement('div');


            card.innerHTML = `
      <div class="column thisCard">
              <p class="card__title">${movie.title}</p>
             <p class="card__description">${movie.desc}</p>
             <br>
             <div class=" row gap-5">
              <button id="remove-btn" class="w-20 h-7 bg-orange-300 tracking-widest
rounded-md text-amber-700 text-md shadow-2xl hover:scale-90 ease-in duration-300
hover:text-base hover:font-semibold hover:rounded-lg">
                    X
                </button>
                <button id="edit-btn" class="w-20 h-7 bg-orange-300 tracking-widest
rounded-md text-amber-700 text-md shadow-2xl hover:scale-90 ease-in duration-300
hover:text-base hover:font-semibold hover:rounded-lg">
                    Edit
                </button>
</div>
                <br>
           </div>
       </div>`;

            card.querySelector('#remove-btn').addEventListener('click', async () => {
                await removeMovie(movie.id);
                renderJsons();
            })

            card.querySelector('#edit-btn').addEventListener('click', async () => {
                let newDesc = prompt('What do you want the new movie description to be?');
                let updatedMovie = {
                    id: movie.id,
                    title: movie.title,
                    desc: newDesc
                }
                await updateMovie(updatedMovie);
                renderJsons();

            })

            return card;
        });

        // Append each card to the DOM.
        savedMovieCards.forEach(card => {
            thisContainer.appendChild(card);
        });
    }

    renderJsons()


    const movieCard = initialMovies.results.map(movie => {
        let card = document.createElement('div');

        card.innerHTML = `
      <div class="card column">
          <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" style=" height: 500px; width: 250px" alt="poster picture">
          <div class="card__content">
              <p class="card__title">${movie.title}</p>
             <p class="card__description">${movie.overview}</p>
             <br>
              <button class="w-40 h-10 bg-orange-300 tracking-widest
rounded-md text-amber-600 text-md shadow-2xl hover:scale-90 ease-in duration-300
hover:text-base hover:font-semibold hover:rounded-lg">
                    Favorite
                </button>
           </div>
       </div>`;
        card.querySelector('button').addEventListener('click', async () => {
            let newMovie = {
                id: movie.id,
                title: movie.title,
                desc: movie.overview,
            }
            await addMovie(newMovie);
            renderJsons();
        })
        return card;
    });

    // Append each card to the DOM.
    movieCard.forEach(card => {
        movieContainer.appendChild(card);
    });


    //search function
    document.querySelector('#search-btn').addEventListener('click', async () => {
        movieContainer.innerHTML = '';
        const searchValue = document.querySelector('input').value;
        let searchedMovie = await searchMoviesAPI(searchValue);

        const movieCard = searchedMovie.results.map(movie => {
            let card = document.createElement('div');

            card.innerHTML = `
      <div class="card column" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
          <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" style=" height: 500px; width: 250px" alt="poster picture">
          <div class="card__content">
              <p class="card__title">${movie.title}</p>
             <p class="card__description">${movie.overview}</p>
             <br>
              <button class="w-40 h-10 bg-orange-300 tracking-widest
rounded-md text-amber-600 text-md shadow-2xl hover:scale-90 ease-in duration-300
hover:text-base hover:font-semibold hover:rounded-lg">
                    Favorite
                </button>
           </div>
       </div>`;
            card.querySelector('button').addEventListener('click', async () => {
                let newMovie = {
                    id: movie.id,
                    title: movie.title,
                    desc: movie.overview,
                }
                await addMovie(newMovie);
                renderJsons();
            })
            return card;
        });

        // Append each card to the DOM.
        movieCard.forEach(card => {
            movieContainer.appendChild(card);
        });


    })


})()