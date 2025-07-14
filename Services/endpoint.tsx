import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;
const AUTH_KEY = process.env.EXPO_PUBLIC_MOVIE_API_KEY

// Keep your TMDB headers here
const TMDB_HEADERS = {
    accept: "application/json",
    Authorization:
        `Bearer ${AUTH_KEY}`
};

/**
 * Fetch popular movies from TMDB
 * @param page Page number (default: 1)
 * @param sortBy Sort order (default: popularity.desc)
 */
export const getPopularMovies = async (
    page: number = 1,
    sortBy: string = "popularity.desc"
) => {
    const today = new Date().toISOString().split('T')[0];

    // Always exclude future releases if sorting by release_date
    let url = `${API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}`;

    if (sortBy.startsWith("release_date")) {
        url += `&release_date.lte=${today}`;
    }

    return axios.get(url, {
        headers: TMDB_HEADERS
    });
};

export const getMovie = async (id: string) => {
    let url = `${API_URL}/movie/${id}`;

    return axios.get(url, {
        headers: TMDB_HEADERS
    });
}


export const searchMovies = async (query: string) => {
    let url: string;

    if (query && query.trim().length > 0) {
        url = `${API_URL}/search/movie?query=${encodeURIComponent(query)}`;
    } else {
        url = `${API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
    }

    return axios.get(url, {
        headers: TMDB_HEADERS
    });
};
