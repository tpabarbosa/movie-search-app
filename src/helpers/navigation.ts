import config from "../config.js"

export const navigateTo = (path: string, skipBaseURL: boolean = false) => {
    window.location.href = skipBaseURL ? path : config.BASE_URL + path
}

export const currentURL = () => {
    return window.location.href
}

export const getURLSearchParams = () => {
    return new URLSearchParams(window.location.search);
}

export const navigatePush = (path: string) => {
    window.history.pushState(null, '', path)
}