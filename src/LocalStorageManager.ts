import { IMovie, IUser } from "./interfaces";

export default class LocalStorageManager {
    private static getKey = (key: string) => { 
        return `${key}@MovieApp`
    }

    static setUser = (user: IUser) => {
        LocalStorageManager.save('user', user)
    }

    static getUser = (): IUser | undefined => {
        return LocalStorageManager.get('user');
    }

    static setSuggestions = (movies: IMovie[]) => {
        const data = {date: new Date(Date.now()), movies};
        LocalStorageManager.save('suggestions', data);
    }

    static getSuggestions = (): {date: Date, movies: IMovie[]} | undefined => {
        return LocalStorageManager.get('suggestions');
    }

    private static save(key: string, data: any) {
        const item = LocalStorageManager.getKey(key)
        window.localStorage.setItem(item, JSON.stringify(data));
    }

    private static get = (key: string) => {
        const item = LocalStorageManager.getKey(key)
        const data = window.localStorage.getItem(item);
        if (data) {
            return JSON.parse(data);
        }
        return;
    }
}