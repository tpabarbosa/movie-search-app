import config from "../../config.js";
import { dateToLocal, yMMd } from "../../helpers/dateHelper.js";
var imageUrl = config.TMDB.IMAGE_URL_POSTER;
var MoviesHorizontal = /** @class */ (function () {
    function MoviesHorizontal(movies, listId) {
        if (listId === void 0) { listId = ''; }
        var _this = this;
        this.listId = '';
        this.load = function () {
            var html = "\n            <div class=\"movies-horizontal-wrapper\">\n                ".concat(_this.loadMoviesList(), "\n            </div>\n        ");
            return html;
        };
        this.loadMoviesList = function () {
            var html = '';
            if (_this.movies.length === 0) {
                html = "\n                <h3>N\u00E3o existem filmes nesta lista</h3>\n            ";
                return html;
            }
            html = "<ul class=\"movies-horizontal-list\">";
            _this.movies.forEach(function (movie) { return html += _this.Movie(movie); });
            html += "</ul>";
            return html;
        };
        this.onLoad = function () {
        };
        this.Movie = function (movie) {
            var html = "\n            <li class=\"movies-horizontal-item\">\n                <a href=\"/?show=movie&id=".concat(movie.id, "\">\n                    <img src=\"").concat(imageUrl).concat(movie.poster_path, "\" alt=\"").concat(movie.title, "\" />\n                    <h3>").concat(movie.title, "</h3>\n                    <p>").concat(dateToLocal(movie.release_date, yMMd), "</p>\n                </a>\n                <span class='movie-options' data-id=\"").concat(movie.id, "\" data-list-id=\"").concat(_this.listId, "\">...</span>\n                <span class='movie-rating'>").concat(movie.vote_average.toFixed(1), "</span>\n            </li>\n        ");
            return html;
        };
        this.movies = movies !== null && movies !== void 0 ? movies : [];
        this.listId = listId;
    }
    MoviesHorizontal.create = function (movies, listId) {
        if (listId === void 0) { listId = ''; }
        return new MoviesHorizontal(movies, listId);
    };
    return MoviesHorizontal;
}());
export default MoviesHorizontal;
//# sourceMappingURL=MoviesHorizontal.js.map