import config from "../../config.js";
import { convertMinutesToHours } from "../../helpers/dateHelper.js";
import { IMovieAccountStates, IComponent, IMovieDetails, AppProps, IMovieAccountStateComponent } from "../../interfaces.js";

import { MovieDetailsProps } from "../pages/MoviePage.js";
import AddToList from "./AddToList.js";
import AddToWatchlist from "./AddToWatchlist.js";
import MarkAsFavorite from "./MarkAsFavorite.js";
import MoviePopup from "./MoviePopup.js";
import MoviesHorizontal from "./MoviesHorizontal.js";
import RatingStars from "./RatingStars.js";

const imageUrlPoster = config.TMDB.IMAGE_URL_POSTER;
const imageUrlBackdrop = config.TMDB.IMAGE_URL_BACKDROP;

export default class MovieDetails implements IComponent {
    private movie: IMovieDetails | undefined;
    private accountStates: IMovieAccountStates | undefined
    private ratingBox!: IComponent & IMovieAccountStateComponent;
    private markAsFavoriteBox!: IComponent & IMovieAccountStateComponent;
    private addToWatchlistBox!: IComponent & IMovieAccountStateComponent;
    private manageListsBox!: IComponent & IMovieAccountStateComponent;
    private movieProps: MovieDetailsProps
    private recommendationsBox!: IComponent
    private moviesPopUp: IComponent

    public constructor (appProps: AppProps, movieProps: MovieDetailsProps) {
        this.movie = movieProps.movie
        this.accountStates = movieProps.accountStates
        this.ratingBox = RatingStars.create('movie-detail', appProps.session_id)
        this.markAsFavoriteBox = MarkAsFavorite.create(appProps, {id: 'movie-detail', hideText:true})
        this.addToWatchlistBox = AddToWatchlist.create(appProps, {id: 'movie-detail', hideText:true})
        this.manageListsBox = AddToList.create(appProps, {id: 'movie-detail', hideText:true} )
        this.movieProps = movieProps;
        this.moviesPopUp = MoviePopup.create(appProps)
    }

    public static create = (appProps: AppProps, movieProps: MovieDetailsProps) =>{
        return new MovieDetails(appProps, movieProps);
    }

    public load = async () => {
        const html = `
            <div class="movie-details-wrapper">
                ${!this.movie 
                    ? `<h3>Não foi encontrado um filme com este identificador</h3>`
                    : this.Movie(this.movie)
                }
                ${await this.moviesRecommendations(this.movie)}
            </div>
            ${await this.moviesPopUp.load()}
        `

        return html
    }
    
    private moviesRecommendations = async (movie?: IMovieDetails) => {
        if (!movie?.recommendations) {
            return
        }
        this.recommendationsBox = MoviesHorizontal.create(movie.recommendations.results);
        const html = `
            <div class="movie-recommendations">
            <h2> Gostou de ${movie.title}? </h2>
            <h3> Você pode gostar destes filmes também: </h3>
            ${await this.recommendationsBox.load()}
            </div>
        `
        return html
    }

    public onLoad = () => {
        const states = this.accountStates
        const movieId = String(this.movieProps.movie?.id)
        if (states) {
            this.ratingBox.onLoad()
            this.markAsFavoriteBox.onLoad()
            this.addToWatchlistBox.onLoad()
            this.manageListsBox.onLoad()
            if (this.recommendationsBox) {
                this.recommendationsBox.onLoad()
            }
            this.moviesPopUp.onLoad()
            const rated = states?.rated ?? false
            if (movieId) {
                this.ratingBox.setValues(movieId, rated)
                this.markAsFavoriteBox.setValues(movieId, states.favorite)
                this.addToWatchlistBox.setValues(movieId, states.watchlist)
                this.manageListsBox.setValues(movieId, false)
            } 
        }
        
    }

    private leftSideDetails = (movie: IMovieDetails) => {
        const html = `
            <div class="movie-details-left-side">
                <img src="${imageUrlPoster}${movie.poster_path}" alt="${movie.title}" />
                <div class="movie-rating">
                    ${movie.vote_average.toFixed(1)}
                </div>
            </div>
        `
        return html
    }

    private loadMovieGenres = (movie: IMovieDetails) => {
        let html = ''
        if (movie.genres.length === 0) {
            return html
        }

        html = `<ul class="movie-genres-list">`
        movie.genres.forEach(genre => {
            html += `<li class="movie-genre">${genre.name}</li>`
        })
        html += `</ul>`
        return html
    }

    private loadDateAndDuration = (movie: IMovieDetails) => {
        const date = movie.release_date ? new Date(movie.release_date).getFullYear() : ''

        const timeConverted = movie.runtime ? convertMinutesToHours(movie.runtime) : ''

        const minutes = timeConverted && (timeConverted.minutes < 10 ? `0${timeConverted.minutes}` : timeConverted.minutes);

        const time = timeConverted ? `${timeConverted.hours}h${minutes}`: ''
        
        const html = `
            <p class="movie-year">
                ${date ? `<i class="fa-solid fa-film"></i> ${date}`  : ''}${date && time ? '  <i class="fa-solid fa-grip"></i>  <i class="fa-solid fa-clock"></i> ' : " "}${time ?? ''}
            </p>
        `
        
        return html
    }

    private loadActionButtons = (movie: IMovieDetails) => {
        

        const states = this.accountStates
        const html = !states ?  `` :`
            <div class="movie-details-action-buttons">
            <div class="movie-details-action-first-group">
                <div class="movie-details-action-button">
                    ${this.manageListsBox.load()}
                </div>
                <div>
                    <div class="movie-details-action-button">
                        ${this.markAsFavoriteBox.load()}
                    </div>
                    <div class="movie-details-action-button">
                        ${this.addToWatchlistBox.load()}
                    </div>
                </div>
            </div>
                <div class="movie-details-action-button">
                    ${this.ratingBox.load()}
                </div>
                
                
                <div >
                    <span id="api-message-movie-detail" class="notification alert  hidden"></span>
                </div>
            </div>
        `
        return html
    }

    private rightSideDetails = (movie: IMovieDetails) => {
        console.log(movie)
        const html = `
            <div class="movie-details-right-side">
                <h3>${movie.title}</h3>
                ${this.loadMovieGenres(movie)}
                ${this.loadDateAndDuration(movie)}
                ${this.loadActionButtons(movie)}
                <p>${movie.overview}</p>
            </div>
            
        `
        return html
    }

    private loadCast = (movie: IMovieDetails) => {
        let castHtml = ``
        const size = movie.credits.cast.length >= 6 ? 6 : movie.credits.cast.length
        for (let i = 0; i < size; i++) {
            castHtml += `
                <li class="movie-cast-item">
                    <img src="${imageUrlPoster}${movie.credits.cast[i].profile_path}" alt="${movie.credits.cast[i].original_name}" />
                    <div>
                        <p><strong>${movie.credits.cast[i].original_name}</strong></p>
                        <p>No papel de '${movie.credits.cast[i].character}'</p>
                    </div>
                </li>
            `
        }

        const html = `
            <div class="movie-cast">
                <h3>Elenco</h3>
                <ul class="movie-cast-list">
                    ${castHtml}
                </ul>
            </div>
        `
        return html
    }

    private Movie = (movie: IMovieDetails) => {
        const html = `
            <div class="movie-details-backdrop" style="background-image: url(${imageUrlBackdrop}${movie.backdrop_path})">
                ${movie.tagline && `<h2>${movie.tagline}</h2>`}
                <div class="movie-details-container">
                    <div class="movie-details-up-container">
                        ${this.leftSideDetails(movie)}
                        ${this.rightSideDetails(movie)}
                    </div>
                    ${this.loadCast(movie)}
                </div>
            </div>
        `
        return html
    }
}
