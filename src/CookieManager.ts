export interface ISetCookie {
    name: string;
    value: string;
    expiresIn: number;
    path?: string
}

export default class CookieManager {
    static get = (cname:string) => {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    static set = ({name, value, expiresIn, path='/'}: ISetCookie) => {
        const date = new Date()
        date.setTime(date.getTime() + expiresIn);
        const cookie = `${name}=${value}; expires=${date.toUTCString()}; path=${path}`;
        document.cookie = cookie;
    }
}
