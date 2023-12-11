
let loaderAnim = document.querySelector('.loading');

//moviesApi.js
const apiUrl = 'http://localhost:3000/movies';

// api.js
async function fetchMovies() {
    try {
        const response = await fetch(apiUrl); // Replace with your local JSON file path
        const movies = await response.json();
        return movies;
    } catch (error) {
        console.log(error);
        return [];
    }
}

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

export async function deleteMovie(id) {
    try {
        // Prompt the user to confirm deletion
        const confirmDelete = confirm('Are you sure you want to delete this movie?');

        if (confirmDelete) {
            // If user confirms, proceed with deletion
            let url = `http://localhost:3000/movies/`;
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(`${url}/${id}`, options);
            return response.json();
        }
    } catch (error) {
        console.log(error.message);
    }
};



