import config from "../config.js";
import HttpClient, { Method } from "./HttpClient.js";
import { IActionResult, IGetCollection, IMovie, IMovieAccountStates, IMovieDetails } from "../interfaces.js";
import LocalStorageManager from "../LocalStorageManager.js";

const api_key = config.TMDB.API_KEY_V3
const api_url = config.TMDB.API_URL
const language = config.TMDB.LANGUAGE

export type IPostRatingMovieResponse = IActionResult

export type IGetMovieResponse = IMovieDetails 

export type IGetMoviesResponse  = IGetCollection<IMovie>


export type IGetMovieAccountStatesResponse = IMovieAccountStates

export type IPostMarkAsFavoriteResponse = IActionResult

export type IPostAddToWatchlistResponse = IActionResult

export default class MovieService {

    static getSuggestions = async (page: number = 1) => {
        const movies = await HttpClient.request<IGetMoviesResponse>({
            url: `${api_url}/discover/movie`, 
            query: {
                api_key, 
                language,
                sort_by: "popularity.desc",
                include_adult: 'false',
                page
            },
            method: Method.GET
        })
        if (!movies) {
            return movies
        }
        LocalStorageManager.setSuggestions(movies.results);
        return movies.results;
    }

    static searchMovies = async (query: string, page: number = 1) => {
        const movies = await HttpClient.request<IGetMoviesResponse>({
            url: `${api_url}/search/movie`, 
            query: {
                api_key, 
                language,
                sort_by: "popularity.desc",
                include_adult: 'false',
                query,
                page
            },
            method: Method.GET
        })
        if (!movies) {
            return movies
        }
        
        return movies.results;
    }

    static getMovieDetails = async (movieId: string) => {
        const movie = await HttpClient.request<IGetMovieResponse>({
            url: `${api_url}/movie/${movieId}`, 
            query: {
                api_key, 
                language,
                append_to_response: 'recommendations,credits,reviews'
            },
            method: Method.GET
        })
        return movie;
    }

    static getAccountStates = async (movieId: string, session_id: string) => {
        const states = await HttpClient.request<IGetMovieAccountStatesResponse>({
            url: `${api_url}/movie/${movieId}/account_states`, 
            query: {
                api_key, 
                session_id,
            },
            method: Method.GET
        })
        
        return states;
    }

    static rateMovie = async (movieId: string, session_id: string, value: string | boolean) => {
        const rate = await HttpClient.request<IPostRatingMovieResponse>({
            url: `${api_url}/movie/${movieId}/rating`, 
            query: {
                api_key, 
                session_id,
            },
            body: {
                value
            },
            method: Method.POST
        })
        
        return rate;
    }

    static deleteRateMovie = async (movieId: string, session_id: string) => {
        const rate = await HttpClient.request<IPostRatingMovieResponse>({
            url: `${api_url}/movie/${movieId}/rating`, 
            query: {
                api_key, 
                session_id,
            },
            method: Method.DELETE
        })
        
        return rate;
    }

    static markAsFavorite = async (account_id: string, session_id: string, media_id: string, favorite: boolean) => {
        const resp = await HttpClient.request<IPostMarkAsFavoriteResponse>({
            url: `${api_url}/account/${account_id}/favorite`,
            query: {api_key, session_id},
            method: Method.POST,
            body: {
                media_type: 'movie',
                media_id,
                favorite
            }
        })
        return resp
        
    }

    static addToWatchlist = async (account_id: string, session_id: string, media_id: string, watchlist: boolean) => {
        const resp = await HttpClient.request<IPostAddToWatchlistResponse>({
            url: `${api_url}/account/${account_id}/watchlist`,
            query: {api_key, session_id},
            method: Method.POST,
            body: {
                media_type: 'movie',
                media_id,
                watchlist
            }
        })
        return resp
    }

    static getRatedMovies = async (account_id: string, session_id: string, page: number = 1) => {
        const movies = await HttpClient.request<IGetMoviesResponse>({
            url: `${api_url}/account/${account_id}/rated/movies`, 
            query: {
                api_key, 
                session_id,
                language,
                page
            },
            method: Method.GET
        })

        if (!movies) {
            return movies
        }
        return movies.results;
    }

    static getWatchlistMovies = async (account_id: string, session_id: string, page: number = 1) => {
        const movies = await HttpClient.request<IGetMoviesResponse>({
            url: `${api_url}/account/${account_id}/watchlist/movies`, 
            query: {
                api_key, 
                session_id,
                language,
                page
            },
            method: Method.GET
        })

        if (!movies) {
            return movies
        }
        return movies.results;
    }

    static getFavoritesMovies = async (account_id: string, session_id: string, page: number = 1) => {
        const movies = await HttpClient.request<IGetMoviesResponse>({
            url: `${api_url}/account/${account_id}/favorite/movies`, 
            query: {
                api_key, 
                session_id,
                language,
                page
            },
            method: Method.GET
        })

        if (!movies) {
            return movies
        }
        return movies.results;
    }
}