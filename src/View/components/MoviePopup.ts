import { currentURL, navigateTo } from "../../helpers/navigation.js";
import { AppProps, IComponent, IModal, IMovieAccountStateComponent, IMovieAccountStates } from "../../interfaces.js"
import ListService from "../../services/ListService.js";
import MovieService from "../../services/MovieService.js";
import AddToList from "./AddToList.js";
import AddToWatchlist from "./AddToWatchlist.js";
import MarkAsFavorite from "./MarkAsFavorite.js";
import Modal from "./Modal.js";
import RatingStars from "./RatingStars.js";

export default class MoviePopup implements IComponent {
    private addToList!: HTMLElement;
    private removeFromList!: HTMLElement;
    private movieId: string = '';
    private listId: string = '';
    private session_id: string = ''
    private ratingBox!: IComponent & IMovieAccountStateComponent;
    private markAsFavoriteBox!: IComponent & IMovieAccountStateComponent;
    private addToWatchlistBox!: IComponent & IMovieAccountStateComponent;
    private addToListBox!: IComponent & IMovieAccountStateComponent;
    private modal!: IComponent & IModal
    private onClose?: (e?: MouseEvent) => void;
    
    private constructor (appProps: AppProps, onClose?: (e?: MouseEvent) => void) {
        this.session_id = appProps.session_id ?? '';
        this.ratingBox = RatingStars.create('movie-popup', this.session_id)
        this.markAsFavoriteBox = MarkAsFavorite.create(appProps,{id: 'movie-popup', hideText: false})
        this.addToWatchlistBox = AddToWatchlist.create(appProps,{id: 'movie-popup', hideText: false})
        this.addToListBox = AddToList.create(appProps, {id: 'movie-popup', hideText: false})
        this.modal = new Modal(this.loadInnerHTML(), 'movie-popup', this.onCloseModal)
        this.onClose = onClose
    }

    public static create = (appProps: AppProps, onClose?:  (e?: MouseEvent) => void) => {
        return new MoviePopup(appProps, onClose)
    }

    private loadInnerHTML = () => {
        const html = `
            <div class="container" id="movie-popup-container">
                ${this.loadButtons()}
                <span id="api-message-movie-popup" class="movie-popup-btn notification alert  hidden"></span>
            </div>
        `
        return html
    }

    public load = () => {
        return this.modal.load()
    }

    private loadButtons = () => {
        let html = ''

        if (!this.session_id) {
            html = `
                <div class="movie-popup-btn">Você não está logado</div>
                <div class="movie-popup-btn in-text-link">
                    <i class="fa-solid fa-right-to-bracket"></i>
                    <a class="in-text-link" href="/?show=login&redirect=${currentURL()}">Fazer Login</a>
                </div>
            `
        } else {
            html = `
                <div id="add-to-list" class="movie-popup-btn hidden">
                ${this.addToListBox.load()}</div>
                <div id="remove-from-list" class="movie-popup-btn hidden"></div>
                <div id="add-to-favorites" class="movie-popup-btn">${this.markAsFavoriteBox.load()}</div>
                <div id="add-to-watchlist" class="movie-popup-btn">${this.addToWatchlistBox.load()}</div>
                <div id="add-rating" class="movie-popup-btn">
                    ${this.ratingBox.load()}
                </div>
                
            `
        }

        return html
    }

    public onLoad = async () => {
        this.addToList = document.getElementById('add-to-list')!;
        this.removeFromList = document.getElementById('remove-from-list')!;

        this.modal.onLoad()

        const spans = document.getElementsByClassName('movie-options') as HTMLCollectionOf<HTMLSpanElement>;

        for (let i = 0; i < spans.length; i++) {
            const id = spans[i].dataset.id as string;
            const list = spans[i].dataset.listId as string;
            spans[i].addEventListener('click', (e: MouseEvent) => {
                e.preventDefault();
                this.open(id, e, list)
            })
        }

        if (this.session_id) {

            this.removeFromList.addEventListener('click', async () => {
                const resp = await ListService.removeMovie(this.movieId, this.session_id, this.listId)
                if (resp && resp.success) {
                    navigateTo(currentURL())
                }
            });

            this.ratingBox.onLoad()
            this.markAsFavoriteBox.onLoad()
            this.addToWatchlistBox.onLoad()
            this.addToListBox.onLoad()
        }
    }

    public open = async (movieId: string, event: MouseEvent, listId: string ) => {
        const accountStates = await this.movieAccountStates(movieId);
        if (this.session_id && accountStates) {
            this.movieId = movieId;
            this.listId = listId;
            this.updateButtons(movieId, accountStates)
        }

        this.modal.open(event)
    }

    private onCloseModal = () => {
        if (this.onClose) {
            this.onClose()
        }
    }

    private updateButtons = (movieId: string, accountStates: IMovieAccountStates) => {
        
        if (!this.listId) {
            this.addToList.classList.remove('hidden')
            this.removeFromList.classList.add('hidden')
            this.addToListBox.setValues(movieId, false)
        } else {
            this.removeFromList.innerHTML = `
                <span class="fa-stack">
                    <i class="fa-solid fa-list fa-stack-2x"></i>
                </span>
                Excluir desta lista
            `
            this.addToList.classList.add('hidden')
            this.removeFromList.classList.remove('hidden')
        }
        

        this.ratingBox.setValues(movieId, accountStates.rated)

        this.markAsFavoriteBox.setValues(movieId, accountStates.favorite)

        this.addToWatchlistBox.setValues(movieId, accountStates.watchlist)
    }

    private movieAccountStates = async (movieId: string) => {
        
        let accountStates: IMovieAccountStates | undefined
        if (movieId && this.session_id) {
            accountStates = await MovieService.getAccountStates(movieId, this.session_id)
        }
        return accountStates
    }

}
