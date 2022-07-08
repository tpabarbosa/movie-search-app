import { AbstractPage, AppProps, IComponent, IModal} from "../../interfaces.js"
import { currentURL, navigatePush, navigateTo } from "../../helpers/navigation.js";
import ListService from "../../services/ListService.js";
import MoviesHorizontal from "../components/MoviesHorizontal.js";
import MovieService from "../../services/MovieService.js";
import MoviePopup from "../components/MoviePopup.js";
import Modal from "../components/Modal.js";


export default class MyPage extends AbstractPage{
    private content!: HTMLElement;
    private moviesListBox: IComponent[] = []
    private moviesPopUp: IComponent
    private navButtons!: HTMLCollection
    private createListButtons!: HTMLCollection
    private removeListButtons!: HTMLCollection
    private removeListConfirmButton!: HTMLButtonElement
    private removeListCancelButton!: HTMLButtonElement
    private createListConfirmButton!: HTMLButtonElement
    private createListCancelButton!: HTMLButtonElement
    private createListName = ''
    private createListDescription = ''
    private createListNameInput!: HTMLInputElement
    private createListDescriptionInput!: HTMLInputElement
    private removeListModal!: IComponent & IModal
    private createListModal!: IComponent & IModal
    private currentTab: string = 'lists'
    
    constructor (appProps: AppProps) {
        super(appProps)
        this.moviesPopUp = MoviePopup.create(appProps, this.onClosePopUp)
        
    }

    public static create = (props: AppProps) => {
        if (!props.session_id || !props.user) {
            navigateTo("/?show=login");
        }
        return new MyPage(props)
    }

    private onClosePopUp = () => {
        this.updateContent(this.currentTab)
    }

    private loadRemoveListModal = () => {
        return `
            <div class="my-page-list-modal-container">
                <h3>
                    Você tem certeza que deseja apagar esta lista?
                </h3>
                <button id="remove-list-confirm-button" class="button-alert">Apagar</button>
                <button id="remove-list-cancel-button" class="button">Cancelar</button>
            </div>
        `
    }

    private loadCreateListModal = () => {
        return `
            <div class="my-page-list-modal-container">
                <h3>Informe os detalhes da lista</h3>
                <form class="form-wrapper">
                    <input id="create-list-name" type="text" class="input  border rounded margin-around-small" placeholder="Nome da lista">
                    <textarea rows="5" id="create-list-description" type="text" class="input  border rounded margin-around-small" placeholder="Descrição da lista"></textarea>
                </form>
                <button id="create-list-confirm-button" class="button-action margin-around-small">Criar Lista</button>
                <button id="create-list-cancel-button" class="button margin-around-small">Cancelar</button>
            </div>
        `
    }

    public load = async () => {
        this.removeListModal = new Modal(this.loadRemoveListModal(), 'remove-list', this.onCloseRemoveModal)
        this.createListModal = new Modal(this.loadCreateListModal(), 'create-list', this.onCloseCreateModal)
        const html = `
            <section id="my-page" class="page-wrapper">
                <header class="content-header-wrapper">
                    ${this.myPageHeader()}
                </header>
                <section id="my-page-content" class="page-wrapper">
                </section>
                
            </section>
        `
        return html
    }

    private updateContent = async (tabToShow?: string) => {
        let tab = tabToShow ?? 'lists'
        this.currentTab = tab
        if (this.content) {
            this.content.innerHTML = 'Carregando...'
            let html = ''
            switch (tab) {
                case 'lists':
                    html += await this.listsContent() ?? ''
                    break;
                case 'favorites':
                    html += await this.favoritesContent() ?? ''
                    break;
                case 'watchlist':
                    html += await this.watchlistContent() ?? ''
                    break;
                case 'rates':
                    html += await this.ratesContent() ?? ''
                    break;
                default:
                    html += await this.listsContent() ?? ''
            }
            html += await this.moviesPopUp.load()
            this.content.innerHTML = html 
            if (tab==='lists') {
                this.moviesListBox.forEach(box => box.onLoad())
                this.updateListsButtons()
            }
            this.moviesPopUp.onLoad();
        }
        
        
    }

    private updateListsButtons = () => {
        this.createListButtons = document.getElementsByClassName('create-list-button')
        this.removeListButtons = document.getElementsByClassName('remove-list-button')

        this.removeListModal.onLoad()
        this.createListModal.onLoad()

        this.removeListCancelButton = document.getElementById('remove-list-cancel-button')! as HTMLButtonElement

        this.removeListConfirmButton = document.getElementById('remove-list-confirm-button')! as HTMLButtonElement

        this.createListCancelButton = document.getElementById('create-list-cancel-button')! as HTMLButtonElement

        this.createListConfirmButton = document.getElementById('create-list-confirm-button')! as HTMLButtonElement

        this.createListNameInput = document.getElementById('create-list-name')! as HTMLInputElement

        this.createListDescriptionInput = document.getElementById('create-list-description')! as HTMLInputElement

        for (let i = 0; i < this.createListButtons.length; i++) {
            const item = this.createListButtons[i] as HTMLButtonElement
            item.addEventListener('click', (e: MouseEvent) => {
                e.preventDefault();
                this.createListModal.open(e)
                this.createListNameInput.value = ''
                this.createListDescriptionInput.value = ''
                this.createListConfirmButton.disabled = true
            })
        }

        for (let i = 0; i < this.removeListButtons.length; i++) {
            const item = this.removeListButtons[i] as HTMLButtonElement
            item.addEventListener('click', (e: MouseEvent) => {
                e.preventDefault();
                this.removeListModal.open(e)
                this.removeListConfirmButton.dataset.listId = item.dataset.listId
            })
        }

        this.removeListCancelButton.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            this.removeListModal.close()
        })

        this.createListCancelButton.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            this.createListModal.close()
        })

        this.removeListConfirmButton.addEventListener('click', async () => {
            const listId = this.removeListConfirmButton.dataset.listId
            if (this.session_id && listId) {
                const resp = await ListService.removeList(this.session_id, listId)
                this.removeListModal.close()
                navigateTo(currentURL())
            }
            
        })

        this.createListConfirmButton.addEventListener('click', async () => {
            const list = {
                name: this.createListName,
                description:this.createListDescription
            }
            if (this.session_id && this.createListName && this.createListDescription) {
                const resp = await ListService.createList(this.session_id, list)
                this.createListModal.close()
                navigateTo(currentURL())
            }
        })

        this.createListNameInput.addEventListener('input', this.changeValueCreateListName)
        this.createListDescriptionInput.addEventListener('input', this.changeValueCreateListDescription)

        this.createListConfirmButton.disabled = true
    }

    public onLoad = () => {
        this.content = document.getElementById('my-page-content')!
        this.navButtons = document.getElementsByClassName('user-navigation')
        

        const tab = this.params.get('tab') ?? 'user-lists'
        this.updateContent(tab)

        for (let i = 0; i < this.navButtons.length; i++) {
            this.navButtons[i].addEventListener('click', this.handleNavButtonClick)
        }

        
    }

    private onCloseRemoveModal = (e?: MouseEvent) => {
        
    }

    private onCloseCreateModal = (e?: MouseEvent) => {
        
    }

    private handleNavButtonClick = (event: Event) => {

        for (let i = 0; i < this.navButtons.length; i++) {
            const el = event.currentTarget as HTMLElement;
            if (this.navButtons[i].id !== el.id) {
                this.navButtons[i].classList.remove('active')
            } else {
                const button = this.navButtons[i] as HTMLElement;
                navigatePush(`/?show=user&tab=${button.dataset.id}`)
                this.navButtons[i].classList.add('active')
                this.updateContent(button.dataset.id)
            }
        }
    }

    private myPageHeader = () => {
        let tab = this.params.get('tab') ?? 'lists'
        
        let html = ``
    
        let image = ''
        if (this.user) {
            if (this.user.avatar.tmdb.avatar_path) {
                    image = `<img class='user-image' src="https://www.themoviedb.org/t/p/w300_and_h300_face/${this.user.avatar.tmdb.avatar_path}">`
                } else {
                    image = `<div  class='user-image' ></div>`
                }
            html = `
                <div class='user-header'>
                    ${image}
                    <h2>${this.user.name !== '' ? this.user.name : this.user.username}</h2>
                </div>
                <nav>
                    
                    <div class='${tab==='lists' ? 'active ' : ''} user-navigation' id="user-lists-button" data-id="lists">
                        <p>Listas</p>
                    </div>
                    <div class='${tab==='favorites' ? 'active ' : ''}user-navigation' id="user-favorites-button" data-id="favorites">
                        <p>Favoritos</p>
                    </div>
                    <div class='${tab==='watchlist' ? 'active ' : ''}user-navigation'  id="user-watchlist-button"  data-id="watchlist">
                        <p>Interesses</p>
                    </div>
                    <div class='${tab==='rates' ? 'active ' : ''}user-navigation'  id="user-rates-button"  data-id="rates">
                        <p>Avaliações</p>
                    </div>
                    
                </nav>
            `
        }
                
        return html
    }

    private listsContent = async () => { 
        const userId = String(this.user?.id)
        if (!this.user || !this.session_id) {
            return
        }
        const lists = await ListService.getLists(userId, this.session_id)

        let listsHtml = ''
        if (lists) {
            for (let list of lists) {
                const movies = await ListService.getListDetails(list.id)
                let moviesHtml = "";

                if (movies && list.list_type==='movie') {
                    const moviesList = MoviesHorizontal.create(movies)
                    moviesHtml = moviesList.load()
                    this.moviesListBox.push(moviesList)
                    
                }

                listsHtml +=`
                    <div class="content-main-wrapper">
                        <h2 class="lists-title">
                            <div>
                                <i class="fa-solid fa-list"></i> ${list.name} 
                            </div>
                            <div>
                                <button data-list-id="${list.id}" class="remove-list-button button-alert rounded"><i class="fa-solid fa-trash"></i></button>
                                
                            </div>
                        </h2>
                        <p class="text">${list.description}</p>
                        <ul class="suggestions-list" id="movies-list">
                            ${moviesHtml}
                        </ul>
                    </div>
                `
            }
        
        }

        const html = `
            <div  class='user-content' id="user-lists" >
                <div class="create-list-button">
                    <button class="button"><i class="fa fa-plus"></i> Criar uma nova Lista</button>
                </div>
                ${listsHtml}
                <div class="create-list-button">
                    <button class="button"><i class="fa fa-plus"></i> Criar uma nova Lista</button>
                </div>
                ${await this.removeListModal.load()}
                ${await this.createListModal.load()}
            </div>
        `

        return html
    }


    private ratesContent = async () => { 
        const userId = String(this.user?.id)
        if (!this.user || !this.session_id) {
            return
        }

        const movies = await MovieService.getRatedMovies(userId, this.session_id)
        let moviesHtml = "";
        if (movies) {
            const moviesList = MoviesHorizontal.create(movies)
            moviesHtml = moviesList.load()
            this.moviesListBox.push(moviesList)
        }

        const html =`
            <div class="content-main-wrapper">
                <h2><i class="fa-solid fa-star"></i> Minhas Avaliações</h2>
                <ul class="suggestions-list" id="movies-list">
                    ${moviesHtml}
                </ul>
            </div>
        `

        return html
    }

    private watchlistContent = async () => { 
        const userId = String(this.user?.id)
        if (!this.user || !this.session_id) {
            return
        }

        const movies = await MovieService.getWatchlistMovies(userId, this.session_id)
        let moviesHtml = "";
        if (movies) {
            const moviesList = MoviesHorizontal.create(movies)
            moviesHtml = moviesList.load()
            this.moviesListBox.push(moviesList)
        }

        const html =`
            <div class="content-main-wrapper">
                <h2><i class="fa-solid fa-bookmark"></i> Meus Interesses</h2>
                <ul class="suggestions-list" id="movies-list">
                    ${moviesHtml}
                </ul>
            </div>
        `

        return html
    }

    private favoritesContent = async () => { 
        const userId = String(this.user?.id)
        if (!this.user || !this.session_id) {
            return
        }

        const movies = await MovieService.getFavoritesMovies(userId, this.session_id)
        let moviesHtml = "";
        if (movies) {
            const moviesList = MoviesHorizontal.create(movies)
            moviesHtml = moviesList.load()
            this.moviesListBox.push(moviesList)
        }

        const html =`
            <div class="content-main-wrapper">
                <h2><i class="fa-solid fa-heart"></i> Meus Favoritos</h2>
                <ul class="suggestions-list" id="movies-list">
                    ${moviesHtml}
                </ul>
            </div>
        `

        return html
    }

    private changeValueCreateListName = () => {
        this.createListName = this.createListNameInput.value;
        this.validateCreateListButton();
    }

    private changeValueCreateListDescription = () => {
        this.createListDescription =  this.createListDescriptionInput.value;
        this.validateCreateListButton();
    }

    private validateCreateListButton() {
        if (this.createListName && this.createListDescription) {
            this.createListConfirmButton.disabled = false;
        } else {
            this.createListConfirmButton.disabled = true;
        }
    }
}


