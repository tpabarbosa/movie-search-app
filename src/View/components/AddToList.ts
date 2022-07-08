import { AbstractComponent, MovieAccountStatesProps, AppProps, IMovieAccountStateComponent, IUser } from "../../interfaces.js";
import ListService from "../../services/ListService.js";

export interface IMovieListsStatus {
    list_name: string;
    list_id: number;
    item_present: boolean;
}

export default class AddToList extends AbstractComponent<MovieAccountStatesProps> implements IMovieAccountStateComponent{
    private container!: HTMLElement;
    private movieId!: string;
    private user: IUser | undefined;
    private session_id: string = '';
    private apiMessage!: HTMLSpanElement;
    private modal!: HTMLDivElement;
    private hideText: boolean;
    private isOpen: boolean = false;
    private id = ''

    private constructor (appProps: AppProps, opt: MovieAccountStatesProps) {
        super()
        this.user = appProps.user;
        this.session_id = appProps.session_id ?? '';
        this.hideText = opt.hideText;
        this.id = opt.id
    }

    public static create = (appProps: AppProps, opt: MovieAccountStatesProps) => {
        return new AddToList(appProps, opt)
    }

    public load = () => {
        const html = `
            
                
                <div id="add-to-list-title-${this.id}" class="add-to-list-title">
                    <div>
                    <span class="fa-stack">
                        <i class="fa-solid fa-list fa-stack-2x"></i>
                    </span>
                    ${!this.hideText ? 'Administrar Listas' : ''}
                    </div>
                    ${!this.hideText ?' <i class="fa-solid fa-caret-down"></i>' : ''}
                </div>
                
            
            <div id="manage-lists-modal-${this.id}" class="manage-lists-container hidden">
                    Deve abrir uma modal

                </div>
        `
        return html
    }

    private updateLists = async () => {
        this.modal.innerHTML = 'Carregando...'
        
        const userId = String(this.user?.id)
        const lists = await ListService.getLists(userId, this.session_id)

        let movieStatus: IMovieListsStatus[] = [];
        let html = '<ul class="lists">';
        if (lists) {
            for (let list of lists) {
                const status = await ListService.checkItemStatus(list.id, this.movieId)
                movieStatus.push({list_name: list.name, list_id: list.id, item_present: status?.item_present ?? false})
                html += `
                    <li class='manage-lists-list-item'>
                        <div class=${status?.item_present ? 'in-list' : ''}>
                        ${status?.item_present ? 
                            `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-xmark"></i>`} 
                        ${list.name}
                        </div>
                        <span>
                        ${status?.item_present ? 
                            `<i id=""  data-list-id="${list.id}" class="fa-solid fa-minus-circle remove-from-list-button"></i>` : `<i id=""  data-list-id="${list.id}" class="fa-solid fa-plus-circle add-to-list-button"></i>`}
                        </span>    
                    </li>
                `
            }
        }
        html += `</ul>`
        this.modal.innerHTML = html;
        

    }

    public onLoad = () => {
        this.container = document.getElementById(`add-to-list-title-${this.id}`)! as HTMLElement;
        this.apiMessage = document.getElementById(`api-message-${this.id}`)! as HTMLSpanElement;
        this.modal = document.getElementById(`manage-lists-modal-${this.id}`)! as HTMLDivElement;

        this.container.addEventListener('click', async () => {
            if (this.isOpen) {
                this.modal.classList.add('hidden');
                this.isOpen = false;
                return
            } 

            this.modal.classList.remove('hidden');
            this.isOpen = true;
            
            await this.updateLists();
            const addBtns = document.getElementsByClassName(`add-to-list-button`) as HTMLCollectionOf<HTMLElement>;
        
            for (let i = 0; i < addBtns.length; i++) {
                const list = addBtns[i].dataset.listId as string;
                addBtns[i].addEventListener('click', async (e: MouseEvent) => {
                    e.preventDefault();
                    const resp = await ListService.addMovie(this.movieId, this.session_id, list)
                    this.modal.classList.add('hidden');
                    this.isOpen = false;
                })
            }

            const removeBtns = document.getElementsByClassName(`remove-from-list-button`) as HTMLCollectionOf<HTMLElement>;
        
            for (let i = 0; i < removeBtns.length; i++) {
                const list = removeBtns[i].dataset.listId as string;
                removeBtns[i].addEventListener('click', async (e: MouseEvent) => {
                    e.preventDefault();
                    const resp = await ListService.removeMovie(this.movieId, this.session_id, list)
                    this.modal.classList.add('hidden');
                    this.isOpen = false;
                    
                })
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

        this.apiMessage.innerText = ''
        this.apiMessage.classList.add('hidden')
        this.modal.classList.add('hidden');
        this.isOpen = false
        
    }

}