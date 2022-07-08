import { navigateTo } from "../../helpers/navigation.js";
import { AbstractComponent } from "../../interfaces.js";

export default class SearchBox extends AbstractComponent<undefined> {
    public searchButton!: HTMLButtonElement;
    public searchInput!: HTMLInputElement;

    public static create = () => {
        return new SearchBox()
    }

    public load = () => {
        const html = `
            <div class="box flex-container rounded">
                <input type="text" placeholder="Escreva..." class="input" id="search-input"/>
                <button class="button" id="search-button" disabled>
                    Buscar
                </button>
            </div>
        `

        return html
    }

    public onLoad = () => {
        this.searchButton = document.getElementById('search-button')! as HTMLButtonElement;
        this.searchInput = document.getElementById('search-input')! as HTMLInputElement;

        this.searchButton.addEventListener('click', () => {
            const search = this.searchInput.value;
            if (search) {
                navigateTo(`?show=search&query=${search}`);
            }
        })

        this.searchInput.addEventListener('input', () => {
            if (this.searchInput.value) {
                this.searchButton.disabled = false;
            } else {
                this.searchButton.disabled = true;
            }
        })
    }
}


