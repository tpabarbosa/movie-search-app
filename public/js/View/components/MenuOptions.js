import CookieManager from "../../cookies.js";
var MoviePopup = /** @class */ (function () {
    function MoviePopup() {
    }
    MoviePopup.getContent = function () {
    };
    MoviePopup.onRender = function () { };
    return MoviePopup;
}());
export default MoviePopup;
var MenuOptions = function (movieId) {
    console.log("clicou em ".concat(movieId));
    var session = CookieManager.get('session_id');
    if (!session) {
        //open menu with login link
    }
    else {
        //open menu with options
    }
};
var isLoggedIn = function () {
    var content = document.createElement('div');
    content.innerHTML = "\n        <div class=\"popup-menu\">\n            <div>Adicionar a uma lista</div>\n            <div>Adicionar aos favoritos</div>\n            <div>Lista de Interesses</div>\n            <div>Sua avalia\u00E7\u00E3o</div>\n        </div>\n    ";
    return content;
};
//# sourceMappingURL=MenuOptions.js.map