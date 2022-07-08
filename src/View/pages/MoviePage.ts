import { AbstractPage, AppProps, IComponent,  IMovieAccountStates,  IMovieDetails } from "../../interfaces.js"
import SearchBox from "../components/SearchBox.js";
import MovieService from "../../services/MovieService.js";
import MovieDetails from "../components/MovieDetails.js";
import { navigateTo } from "../../helpers/navigation.js";


export type MovieDetailsProps = {
    movie?: IMovieDetails,
    accountStates?: IMovieAccountStates
    isLoggedIn: boolean
}


export default class MoviePage extends AbstractPage{
    private searchBox: IComponent
    private movieBox: IComponent

    
    constructor (appProps: AppProps, movieProps: MovieDetailsProps) {
        super(appProps)
        this.searchBox = SearchBox.create();
        this.movieBox = MovieDetails.create(appProps, movieProps);
        
    }

    public static create = async (props: AppProps) => {
        if (!props.query_params || !props.query_params.get('id')) {
            navigateTo("/")
        }

        const movieId = props.query_params.get('id') as string
        const movie = await MoviePage.loadMovie(movieId)
        
        const isLoggedIn = !!props.session_id
        let accountStates: IMovieAccountStates | undefined
        if (movieId && props.session_id) {
            accountStates = await MovieService.getAccountStates(movieId, props.session_id)
        }
        
        return new MoviePage(props, {movie, accountStates, isLoggedIn})
    }

    private static loadMovie = async (movieId: string | null) => {
        
        if (movieId) {
            const movie = await MovieService.getMovieDetails(movieId)
            return movie
        }
    }

    public load = async () => {
        const html = `
            <section id="movie-page" class="page-wrapper">
                <div class="content-main-wrapper">
                    ${await this.movieBox.load()}
                </div>
                <header class="content-header-wrapper">
                    ${await this.searchBox.load()}
                </header>
                
            </section>
        `

        return html
    }

    public onLoad = () => {
        this.searchBox.onLoad();
        this.movieBox.onLoad();
    }
}

