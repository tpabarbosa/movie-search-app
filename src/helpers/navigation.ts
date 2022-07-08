export const navigateTo = (path: string) => {
    window.location.href = 'https://tpabarbosa.github.io/' + path
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