import { AbstractComponent, AppProps, IMovieAccountStateComponent, IUser, MovieAccountStatesProps } from "../../interfaces.js";
import MovieService from "../../services/MovieService.js";


export default class MarkAsFavorite extends AbstractComponent<MovieAccountStatesProps> implements IMovieAccountStateComponent{
    private container!: HTMLElement;
    private movieId!: string;
    private user: IUser | undefined;
    private session_id: string = '';
    private favorite: boolean = false;
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
        return new MarkAsFavorite(appProps, opt)
    }

    public load = () => {
        const html = `
            <div id="mark-as-favorite-${this.id}" class="mark-as-favorite">
                
            </div>
            
        `
        return html
    }

    public onLoad = () => {
        this.container = document.getElementById(`mark-as-favorite-${this.id}`)! as HTMLElement;
        this.apiMessage = document.getElementById(`api-message-${this.id}`)! as HTMLSpanElement;

        this.container.addEventListener('click', async () => {
            const userId = String(this.user?.id)
            const resp = await MovieService.markAsFavorite(userId, this.session_id, this.movieId, !this.favorite);
            if (resp && (resp.success === true)) {
                this.setValues(this.movieId, !this.favorite)
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
        this.favorite = !!value;
        if (value) {
            this.container.classList.add('added')
            this.container.innerHTML = `
                <span class="fa-stack">
                    <i class="fa-solid fa-heart fa-stack-2x" style="color:red"></i>
                    
                </span>
                ${this.hideText ? '' : `Remover dos Favoritos`}
            `
        } else {
            this.container.classList.remove('added')
            this.container.innerHTML = `
                <span class="fa-stack">
                    <i class="fa-solid fa-heart fa-stack-2x" style="color:gray"></i>
                    
                </span>
                ${this.hideText ? '' : `Adicionar aos Favoritos`}
            `
        }
        this.apiMessage.innerText = ''
        this.apiMessage.classList.add('hidden')

    }

}