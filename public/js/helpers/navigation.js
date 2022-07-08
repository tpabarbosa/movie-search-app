import config from "../config.js";
export var navigateTo = function (path) {
    window.location.href = config.BASE_URL + path;
};
export var currentURL = function () {
    return window.location.href;
};
export var getURLSearchParams = function () {
    return new URLSearchParams(window.location.search);
};
export var navigatePush = function (path) {
    window.history.pushState(null, '', path);
};
//# sourceMappingURL=navigation.js.map