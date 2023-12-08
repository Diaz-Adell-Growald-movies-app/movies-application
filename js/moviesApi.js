//moviesApi.js
const apiUrl = 'http://localhost:3000/movies';

// api.js
export async function fetchMovies() {
    try {
        const response = await fetch(); // Replace with your local JSON file path
        const movies = await response.json();
        return movies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error; // You might want to handle errors appropriately in your application
    }
}