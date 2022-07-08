import config from "../../config.js";
var imageUrl = config.TMDB.IMAGE_URL_POSTER;
var MoviesWithOverview = /** @class */ (function () {
    function MoviesWithOverview(movies) {
        var _this = this;
        this.loadMoviesList = function () {
            var html = '';
            if (_this.movies.length === 0) {
                html = "\n                <h3>'N\u00E3o foram encontrados filmes com esta palavra chave</h3>\n            ";
                return html;
            }
            html = "<ul class=\"movies-with-overview-list\">";
            _this.movies.forEach(function (movie) { return html += _this.Movie(movie); });
            html += "</ul>";
            return html;
        };
        this.load = function () {
            var html = "\n            <div class=\"movies-with-overview-wrapper\">\n                ".concat(_this.loadMoviesList(), "\n            </div>\n        ");
            return html;
        };
        this.onLoad = function () {
        };
        this.Movie = function (movie) {
            var html = "\n            <li class=\"movies-with-overview-item\">\n                <a href=\"/?show=movie&id=".concat(movie.id, "\">\n                    <img src=\"").concat(imageUrl).concat(movie.poster_path, "\" alt=\"").concat(movie.title, "\" />\n                    <div class=\"\">\n                        <h3>").concat(movie.title, "</h3>\n                        <p class=\"movie-year\">").concat(movie.release_date ? new Date(movie.release_date).getFullYear() : '', "</p>\n                        <p class=\"text\">").concat(movie.overview, "</p>\n                    </div>\n                </a>\n                <span class='movie-options' data-id=\"").concat(movie.id, "\">...</span>\n                <span class='movie-rating'>").concat(movie.vote_average, "</span>\n            </li>\n        ");
            return html;
        };
        this.movies = movies !== null && movies !== void 0 ? movies : [];
    }
    MoviesWithOverview.create = function (movies) {
        return new MoviesWithOverview(movies);
    };
    return MoviesWithOverview;
}());
export default MoviesWithOverview;
//# sourceMappingURL=MoviesWithOverview.js.map