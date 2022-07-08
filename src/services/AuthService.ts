import config from "../config.js";
import HttpClient, { IErrorResponse, Method } from "./HttpClient.js";
import { IUser } from "../interfaces.js";

const api_key = config.TMDB.API_KEY_V3
const api_url = config.TMDB.API_URL

export type IGetUserResponse = IUser

export interface ILoginUser {
    userCredentials: IUserCredentials, 
    request_token: string, 
    onError: (err: IErrorResponse) => void
}

export interface IUserCredentials {
    username: string,
    password: string
}

export interface IGetRequestTokenResponse {
    success: boolean,
    expires_at: Date,
    request_token: string
}

export interface IGetSessionIdResponse {
    success: boolean,
    expires_at: Date,
    session_id: string
}



export default class AuthService {

    static getUser = async (session_id: string) => {
        const user = await HttpClient.request<IGetUserResponse>({
                url: `${api_url}/account`, 
                query: {api_key, session_id},
                method: Method.GET
            })
        return user
    }

    static getRequestToken = async () => {
        const token = await HttpClient.request<IGetRequestTokenResponse>({
            url: `${api_url}/authentication/token/new`,
            query: {api_key},
            method: Method.GET
        })
        return token
    }

    static loginUser = async ({userCredentials, request_token, onError}: ILoginUser) => {
        const login = await HttpClient.request<IGetRequestTokenResponse>({
            url: `${api_url}/authentication/token/validate_with_login`,
            query: {api_key},
            method: Method.POST,
            body: {...userCredentials, request_token}
        },{onError})
        return login
    } 

    static createSession = async (request_token: string) => {
        const session = await HttpClient.request<IGetSessionIdResponse>({
            url: `${api_url}/authentication/session/new`,
            query: {api_key, request_token},
            method: Method.GET
        })
        return session
    }

    
}


