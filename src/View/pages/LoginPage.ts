import CookieManager from "../../CookieManager.js";
import { oneDay } from "../../helpers/dateHelper.js";
import { IErrorResponse } from "../../services/HttpClient.js";
import { AbstractPage, AppProps } from "../../interfaces.js"
import AuthService from "../../services/AuthService.js";
import { navigateTo } from "../../helpers/navigation.js";

export default class LoginPage extends AbstractPage{
    private request_token: string = '';
    private errorMessage!: HTMLElement;
    private passwordInput!: HTMLInputElement;
    private usernameInput!: HTMLInputElement;
    private loginButton!: HTMLButtonElement;
    private password: string = '';
    private username: string = '';

    constructor (props: AppProps) {
        super(props)
        
    }

    public static create = (props: AppProps) => {
        if (props.session_id) {
            navigateTo("?show=user")
            return
        };
        return new LoginPage(props)
    }

    public load = async () => {
        const html = `
            <section id="login-page" class="page-wrapper">
                ${LoginHeader()}
                ${LoginMain()}
            </section>
        `
        return html 
    }

    public onLoad = () => {
        this.passwordInput = document.getElementById('senha')! as HTMLInputElement;
        this.usernameInput = document.getElementById('login')! as HTMLInputElement;
        this.loginButton = document.getElementById('login-button')! as HTMLButtonElement;

        this.errorMessage = document.getElementById('error-message')!;

        this.passwordInput.addEventListener('input', this.preencherSenha);
        this.usernameInput.addEventListener('input', this.preencherLogin);
        this.loginButton.addEventListener('click', this.login)
    }

    private login = async () => {
        this.errorMessage.innerText = ""
        this.loginButton.disabled = true;
        const token = await AuthService.getRequestToken();
        if (!token) {
            this.errorMessage.innerText = "Ocorreu um erro ao obter o token de autenticação."
            return
        }
        this.request_token = token.request_token;
        const login = await this.requestLogin();
        if (!login) {
            if (this.errorMessage.innerText==='') this.errorMessage.innerText = "Ocorreu um erro ao tentar fazer o login."
            return
        }
        const session = await this.requestSession();
        if (!session) { 
            this.errorMessage.innerText = "Ocorreu um erro ao tentar gerar uma nova sessão de usuário."
            return
        }

        if (this.params.has('redirect')) {
            navigateTo(`?show=${this.params.get('redirect')}`);
        } else {
            navigateTo("?show=user");
        }
    }

    private requestLogin = async () => {
        const onLoginError = (error: IErrorResponse) => {
            if (error.statusText.status_code===30) {
                this.errorMessage.innerText = "Login ou senha inválidos"
                this.loginButton.disabled = true;
            }
        }

        const loginUser = {
            userCredentials: {
                username: this.username, 
                password: this.password
            },
            request_token: this.request_token,
            onError: onLoginError
        }

        const login = await AuthService.loginUser(loginUser);
        return login
    }

    private requestSession = async () => {
        const session = await AuthService.createSession(this.request_token);
        if (session) {
            const cookie = {
                name: 'session_id', 
                value: session.session_id, 
                expiresIn: oneDay
            }
            CookieManager.set(cookie)
        }
        return session
    }

    private preencherSenha = () => {
        this.password = this.passwordInput.value;
        this.validateLoginButton();
    }

    private preencherLogin = () => {
        this.username =  this.usernameInput.value;
        this.validateLoginButton();
    }

    private validateLoginButton() {
        if (this.password && this.username) {
            this.loginButton.disabled = false;
        } else {
            this.loginButton.disabled = true;
        }
    }
}

const LoginHeader = () => { 
    const html = `
        <header class="content-header-wrapper">
            <p class='text'>
                Para fazer o login é necessário possuir uma conta no site <a href="https://www.themoviedb.org" target="_blank" class="in-text-link">The Movie Database</a>. Caso você ainda não possua uma conta, registrar-se é grátis e simples. <a href="https://www.themoviedb.org/signup" target="_blank" class="in-text-link">Clique aqui</a> para começar.
            </p>
            <p  class='text'>
                Se você já fez o seu cadastro, você pode entrar com o seu nome de usuário e senha para começar a utilizar os recursos.
            </p>
        </header>
    `

    return html
}

const LoginMain = () => { 
    const html = `
        <div class="content-main-wrapper">
            ${LoginForm()}
        </div>
    `
    return html
}

const LoginForm = () => {

    const html = `
        <form class="form-wrapper">
            <h3>Já possuo uma conta</h3>
            <input type="text" class='input border rounded margin-around-small' id="login" placeholder='Nome do usuário'/>
            <input type="password" class='input border rounded margin-around-small' id="senha" placeholder="Senha"/>
            <span id="error-message" class="notification alert"></span>
            <button class="button rounded" id="login-button" disabled>Entrar</button>
        </form>
    `

    return html
}

