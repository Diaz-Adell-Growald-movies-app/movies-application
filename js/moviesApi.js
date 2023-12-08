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