import { View } from './View/index.js';
import IndexPage from './View/pages/IndexPage.js';
import MoviePage from './View/pages/MoviePage.js';
import LoginPage from './View/pages/LoginPage.js';
import MyPage from './View/pages/MyPage.js';
import SearchPage from './View/pages/SearchPage.js';
import TestPage from './View/pages/testPage.js';
import CookieManager from './CookieManager.js';
import LocalStorageManager from './LocalStorageManager.js';
import AuthService from './services/AuthService.js';
import { IUser, AppProps } from './interfaces.js';
import { getURLSearchParams } from './helpers/navigation.js';


const init = async () => {
    const query_params = getURLSearchParams()
    const session_id = CookieManager.get('session_id');
    let user = LocalStorageManager.getUser();

    if (!user && session_id) {
        user = await tryAuthUser(session_id)
    }

    const appProps = {query_params, session_id, user}
    router(appProps)
}

const tryAuthUser = async (session_id: string) => {
    const user = await AuthService.getUser(session_id)
    if (user) {
        LocalStorageManager.setUser(user)
        return user;
    }
}



const router = async (appProps: AppProps) => {
    const view = new View(appProps);
    if (appProps.query_params.has('show')) { // show some especific page
        const page = appProps.query_params.get('show');
        switch (page) {
            case 'user':
                view.loadPage(MyPage.create(appProps))
                break
            case 'login':
                view.loadPage(LoginPage.create(appProps))
                break
            case 'movie':
                view.loadPage(await MoviePage.create(appProps))
                break
            case 'search':
                view.loadPage(await SearchPage.create(appProps))
                break
            case 'test':
                view.loadPage(TestPage.create(appProps))
                break
            default :
                view.loadPage(await IndexPage.create(appProps))
        }
    } else { // show index page
        view.loadPage(await IndexPage.create(appProps))
    }
}

init();
