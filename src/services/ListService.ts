import config from "../config.js";
import HttpClient, { Method } from "./HttpClient.js";
import { IActionResult, IGetCollection, IList, IMovie } from "../interfaces.js";

export interface IGetListResponse {
    items: IMovie[]
}

export interface IGetItemStatusResponse {
    id: string
    item_present: boolean
}

export interface IListToCreate {
    name: string
    description: string
}

export type IGetListsResponse = IGetCollection<IList>

export type IPostRemoveMovieToListResponse = IActionResult

export type IPostAddMovieToListResponse = IActionResult

export type IDeleteRemoveListResponse = IActionResult

export type IPostCreateListResponse = IActionResult & {
    list_id: number
} 

const api_key = config.TMDB.API_KEY_V3
const api_url = config.TMDB.API_URL
const language = config.TMDB.LANGUAGE



export default class ListService {

    static getLists = async (account_id: string, session_id: string, page: number = 1) => {
        const lists = await HttpClient.request<IGetListsResponse>({
            url: `${api_url}/account/${account_id}/lists`, 
            query: {
                api_key, 
                language,
                session_id,
                page
            },
            method: Method.GET
        })
        if (!lists) {
            return lists
        }
        return lists.results
    }

    static getListDetails = async (listId: number) => {
        const movies = await HttpClient.request<IGetListResponse>({
            url: `${api_url}/list/${listId}`, 
            query: {
                api_key, 
                language,
            },
            method: Method.GET
        })
        if (!movies) {
            return movies
        }
        return movies.items
    }

    static checkItemStatus = async (listId: number, movie_id:string) => {
        const status = await HttpClient.request<IGetItemStatusResponse>({
            url: `${api_url}/list/${listId}/item_status`, 
            query: {
                api_key, 
                movie_id
            },
            method: Method.GET
        })
        
        return status;
    }

    static createList = async (session_id:string, list: IListToCreate) => {
        const resp = await HttpClient.request<IPostCreateListResponse>({
            url: `${api_url}/list`, 
            query: {
                api_key, 
                session_id
            },
            body: {
                name: list.name,
                language,
                description: list.description
            },
            method: Method.POST
        })
        
        return resp;
    }

    static removeList = async (session_id:string, listId: string) => {
        const resp = await HttpClient.request<IDeleteRemoveListResponse>({
            url: `${api_url}/list/${listId}`, 
            query: {
                api_key, 
                session_id
            },
            method: Method.DELETE
        })
        
        return resp;
    }

    static addMovie = async (media_id: string, session_id:string, listId: string) => {
        const resp = await HttpClient.request<IPostAddMovieToListResponse>({
            url: `${api_url}/list/${listId}/add_item`, 
            query: {
                api_key, 
                session_id
            },
            body: {
                media_id
            },
            method: Method.POST
        })
        
        return resp;
    }

    static removeMovie = async (media_id: string, session_id:string, listId: string) => {
        const resp = await HttpClient.request<IPostRemoveMovieToListResponse>({
            url: `${api_url}/list/${listId}/remove_item`, 
            query: {
                api_key, 
                session_id
            },
            body: {
                media_id
            },
            method: Method.POST
        })
        
        return resp;
    }
}