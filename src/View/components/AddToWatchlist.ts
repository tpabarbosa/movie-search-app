import { AbstractComponent, AppProps, IMovieAccountStateComponent, IUser, MovieAccountStatesProps } from "../../interfaces.js";
import MovieService from "../../services/MovieService.js";

export default class AddToWatchlist extends AbstractComponent<MovieAccountStatesProps> implements IMovieAccountStateComponent{
    private container!: HTMLElement;
    private movieId!: string;
    private user: IUser | undefined;
    private session_id: string = '';
    private watchlist: boolean = false;
    private apiMessage!: HTMLSpanElement;
    private hideText: boolean;
    private id = ''

    private constructor (appProps: AppProps, opt: MovieAccountStatesProps) {
        super()
        this.user = appProps.user;
        this.session_id = appProps.session_id ?? '';
        this.hideText = opt.hideText;
        this.id = opt.id
    }

    public static create = (appProps: AppProps, opt: MovieAccountStatesProps) => {
        return new AddToWatchlist(appProps, opt)
    }

    public load = () => {
        const html = `
            <div id="add-to-watchlist-${this.id}" class="add-to-watchlist">
                
            </div>
            
        `
        return html
    }

    public onLoad = () => {
        this.container = document.getElementById(`add-to-watchlist-${this.id}`)! as HTMLElement;
        this.apiMessage = document.getElementById(`api-message-${this.id}`)! as HTMLSpanElement;

        this.container.addEventListener('click', async () => {
            const userId = String(this.user?.id)
            const resp = await MovieService.addToWatchlist(userId, this.session_id, this.movieId, !this.watchlist);
            
            if (resp && (resp.success === true)) {
                this.setValues(this.movieId, !this.watchlist)
                this.apiMessage.classList.remove('hidden')
                this.apiMessage.innerText = 'Operação realizada com sucesso!';
                this.startCountdown();
            } else {
                this.apiMessage.classList.remove('hidden')
                this.apiMessage.innerText = 'Erro ao realizar a operação!';
                this.startCountdown();
            }
        })

    }

    private startCountdown() {
        setTimeout(() => {
                    this.apiMessage.classList.add('hidden');
                    this.apiMessage.innerText ='';
                }, 3000)
    }

    public setValues = (movieId: string, value: boolean | {value: number}) => {
        this.movieId = movieId;
        this.watchlist = !!value;
        if (value) {
            this.container.classList.add('added')
            this.container.innerHTML = `
                <span class="fa-stack">
                    <i class="fa-solid fa-bookmark fa-stack-2x" style="color:blue"></i>
                    
                </span>
                ${this.hideText ? '' : `Remover dos interesses`}
            `
        } else {
            this.container.classList.remove('added')
            this.container.innerHTML = `
                <span class="fa-stack">
                    <i class="fa-solid fa-bookmark fa-stack-2x" style="color:gray"></i>
                    
                </span>
                ${this.hideText ? '' : `Adicionar os interesses`}
            `
        }
        this.apiMessage.innerText = ''
        this.apiMessage.classList.add('hidden')

    }

}