import { AbstractPage, AppProps, IComponent, IMovie } from "../../interfaces.js"
import MoviePopup from "../components/MoviePopup.js";
import SearchBox from "../components/SearchBox.js";
import MoviesWithOverview from "../components/MoviesWithOverview.js";
import MovieService from "../../services/MovieService.js";
import { navigateTo } from "../../helpers/navigation.js";

export default class SearchPage extends AbstractPage{
    private searchBox: IComponent
    private moviesBox: IComponent
    private moviesPopUp: IComponent

    constructor (props: AppProps, movies?: IMovie[]) {
        super(props)
        this.searchBox = SearchBox.create();
        this.moviesBox = MoviesWithOverview.create(movies);
        this.moviesPopUp = MoviePopup.create(props)
    }

    public static create = async (props: AppProps) => {
        if (!props.query_params.has('query')) {
            navigateTo("/")
            return
        }

        const query = props.query_params.get('query') as string
        const movies = await MovieService.searchMovies(query)
        return new SearchPage(props, movies)
    }

    public load = async () => {
        const html = `
            <section id="search-page" class="page-wrapper">
                <header class="content-header-wrapper">
                    ${await this.searchBox.load()}
                </header>
                <div class="content-main-wrapper">
                    <h2>Resultados da busca por: "${this.params.get('query')}"</h2>
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