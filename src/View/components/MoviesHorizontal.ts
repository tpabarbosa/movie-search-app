import config from "../../config.js";
import { dateToLocal, yMMd } from "../../helpers/dateHelper.js";
import { IComponent, IMovie } from "../../interfaces.js";

const imageUrl = config.TMDB.IMAGE_URL_POSTER;

export default class MoviesHorizontal implements IComponent {
    private movies: IMovie[];
    private listId: string = ''

    public constructor (movies?: IMovie[], listId: string = '') {
        this.movies = movies ?? []
        this.listId = listId
    }

    public static create = (movies?: IMovie[], listId: string = '') =>{
        return new MoviesHorizontal(movies, listId);
    }

    public load = () => {
        const html = `
            <div class="movies-horizontal-wrapper">
                ${this.loadMoviesList()}
            </div>
        `
        return html
    }
    
    private loadMoviesList = () => {
        let html = ''
        if (this.movies.length === 0) {
            html = `
                <h3>Não existem filmes nesta lista</h3>
            `
            return html
        }

        html = `<ul class="movies-horizontal-list">`
        this.movies.forEach(movie => html += this.Movie(movie))
        html += `</ul>`
        return html

    }

    public onLoad = () => {

    }

    private Movie = (movie: IMovie) => {
        const html = `
            <li class="movies-horizontal-item">
                <a href="/?show=movie&id=${movie.id}">
                    <img src="${imageUrl}${movie.poster_path}" alt="${movie.title}" />
                    <h3>${movie.title}</h3>
                    <p>${dateToLocal(movie.release_date, yMMd)}</p>
                </a>
                <span class='movie-options' data-id="${movie.id}" data-list-id="${this.listId}">...</span>
                <span class='movie-rating'>${movie.vote_average.toFixed(1)}</span>
            </li>
        `
        
        return html
    }
}
