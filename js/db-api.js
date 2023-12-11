



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
            }, body: JSON.stringify(movieObject)
        };
        const response = await fetch(`${url}/${movieObject.id}`, options);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
};

export const getMoviePosters = async () => {
    try {
        const options = {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${MOVIES_KEY}`
            }
        };
        const response = await fetch('https://api.themoviedb.org/3/movie/movie_id/images', options)

        const data = await response.json();
        return data;

    } catch (err) {
        console.error(err);
    }
};
console.log(getMoviePosters());


// Exporting getMovies function
export { getMovies };

