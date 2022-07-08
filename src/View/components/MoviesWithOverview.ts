import config from "../../config.js";
import { IComponent, IMovie } from "../../interfaces.js";

const imageUrl = config.TMDB.IMAGE_URL_POSTER;

export default class MoviesWithOverview implements IComponent {
    private movies: IMovie[];

    public constructor (movies?: IMovie[]) {
        this.movies = movies ?? []
    }

    public static create = (movies?: IMovie[]) =>{
        return new MoviesWithOverview(movies);
    }

    private loadMoviesList = () => {
        let html = ''
        if (this.movies.length === 0) {
            html = `
                <h3>'Não foram encontrados filmes com esta palavra chave</h3>
            `
            return html
        }

        html = `<ul class="movies-with-overview-list">`
        this.movies.forEach(movie => html += this.Movie(movie))
        html += `</ul>`
        return html

    }

    public load = () => {
        const html = `
            <div class="movies-with-overview-wrapper">
                ${this.loadMoviesList()}
            </div>
        `
        return html
    }

    public onLoad = () => {

    }

    private Movie = (movie: IMovie) => {
        const html = `
            <li class="movies-with-overview-item">
                <a href="${config.BASE_URL}/?show=movie&id=${movie.id}">
                    <img src="${imageUrl}${movie.poster_path}" alt="${movie.title}" />
                    <div class="">
                        <h3>${movie.title}</h3>
                        <p class="movie-year">${movie.release_date ? new Date(movie.release_date).getFullYear() : ''}</p>
                        <p class="text">${movie.overview}</p>
                    </div>
                </a>
                <span class='movie-options' data-id="${movie.id}">...</span>
                <span class='movie-rating'>${movie.vote_average}</span>
            </li>
        `
        return html
    }
}