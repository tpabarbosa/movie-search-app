export var navigateTo = function (path) {
    window.location.href = 'https://tpabarbosa.github.io/' + path;
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