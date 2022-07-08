import { IMovie, AbstractPage, AppProps, IComponent } from '../../interfaces.js';

import MoviePopup from '../components/MoviePopup.js';
import SearchBox from '../components/SearchBox.js'
import { isDateOlderThan, oneDay } from '../../helpers/dateHelper.js';
import LocalStorageManager from '../../LocalStorageManager.js';
import MovieService from '../../services/MovieService.js';
import MoviesHorizontal from '../components/MoviesHorizontal.js';


export default class IndexPage extends AbstractPage{
    private searchBox: IComponent
    private moviesBox: IComponent
    private moviesPopUp: IComponent

    private constructor (props: AppProps, movies?: IMovie[]) {
        super(props)
        this.searchBox = SearchBox.create();
        this.moviesBox = MoviesHorizontal.create(movies);
        this.moviesPopUp = MoviePopup.create(props)
    }

    public static create = async (props: AppProps) => {
        const movies = await IndexPage.loadMovies()
        return new IndexPage(props, movies)
    }

    private static loadMovies = async () => {
        const moviesData = LocalStorageManager.getSuggestions();
            let movies: IMovie[] | undefined
            if (!moviesData || isDateOlderThan(moviesData.date, oneDay)) {
                movies = await MovieService.getSuggestions()
            } else {
                movies = moviesData.movies;
            }
        return movies
    }

    public load = async () => {
        const html = `
            <section id="index-page" class="page-wrapper">
                <header class="content-header-wrapper">
                    ${await this.searchBox.load()}
                </header>
                <div class="content-main-wrapper">
                    <h2>Dê uma olhada nos filmes em destaque</h2>
                    ${await this.moviesBox.load()}
                </div>
                ${await this.moviesPopUp.load()}
            </section>
        `
        return html
    }

    public onLoad = () => {
        this.searchBox.onLoad();
        this.moviesBox.onLoad();
        this.moviesPopUp.onLoad();
    }
}

