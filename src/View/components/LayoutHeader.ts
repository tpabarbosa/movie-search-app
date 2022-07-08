
import config from "../../config.js";
import { AppProps } from "../../interfaces.js";

const LayoutHeader = ({session_id}: AppProps) => {
    const header = document.createElement('header');
    header.classList.add('layout-header');

    let menuButton = ``

    if (!session_id) {
        menuButton = `<a href="${config.BASE_URL}/?show=login", class="button"><i class="fa-solid fa-right-to-bracket"></i></a>` 
    
    } else {
        menuButton = `<a href="${config.BASE_URL}/?show=user", class="button"><i class="fa-solid fa-user"></i></a>` 
    }

    const innerHTML = `
        <div>
            <h1><a href="${config.BASE_URL}/">Movie App</a></h1>
            <a href="https://www.themoviedb.org/"><img src="${config.BASE_URL}/public/images/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB logo"></a>
        </div>
        ${menuButton}
    `

    header.innerHTML = innerHTML

    return header;
}

export default LayoutHeader