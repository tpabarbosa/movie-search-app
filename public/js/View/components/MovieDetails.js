var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import config from "../../config.js";
import { convertMinutesToHours } from "../../helpers/dateHelper.js";
import AddToList from "./AddToList.js";
import AddToWatchlist from "./AddToWatchlist.js";
import MarkAsFavorite from "./MarkAsFavorite.js";
import MoviePopup from "./MoviePopup.js";
import MoviesHorizontal from "./MoviesHorizontal.js";
import RatingStars from "./RatingStars.js";
var imageUrlPoster = config.TMDB.IMAGE_URL_POSTER;
var imageUrlBackdrop = config.TMDB.IMAGE_URL_BACKDROP;
var MovieDetails = /** @class */ (function () {
    function MovieDetails(appProps, movieProps) {
        var _this = this;
        this.load = function () { return __awaiter(_this, void 0, void 0, function () {
            var html, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _c = (_b = "\n            <div class=\"movie-details-wrapper\">\n                ".concat(!this.movie
                            ? "<h3>N\u00E3o foi encontrado um filme com este identificador</h3>"
                            : this.Movie(this.movie), "\n                ")).concat;
                        return [4 /*yield*/, this.moviesRecommendations(this.movie)];
                    case 1:
                        _d = (_a = _c.apply(_b, [_e.sent(), "\n            </div>\n            "])).concat;
                        return [4 /*yield*/, this.moviesPopUp.load()];
                    case 2:
                        html = _d.apply(_a, [_e.sent(), "\n        "]);
                        return [2 /*return*/, html];
                }
            });
        }); };
        this.moviesRecommendations = function (movie) { return __awaiter(_this, void 0, void 0, function () {
            var html, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(movie === null || movie === void 0 ? void 0 : movie.recommendations)) {
                            return [2 /*return*/];
                        }
                        this.recommendationsBox = MoviesHorizontal.create(movie.recommendations.results);
                        _b = (_a = "\n            <div class=\"movie-recommendations\">\n            <h2> Gostou de ".concat(movie.title, "? </h2>\n            <h3> Voc\u00EA pode gostar destes filmes tamb\u00E9m: </h3>\n            ")).concat;
                        return [4 /*yield*/, this.recommendationsBox.load()];
                    case 1:
                        html = _b.apply(_a, [_c.sent(), "\n            </div>\n        "]);
                        return [2 /*return*/, html];
                }
            });
        }); };
        this.onLoad = function () {
            var _a, _b;
            var states = _this.accountStates;
            var movieId = String((_a = _this.movieProps.movie) === null || _a === void 0 ? void 0 : _a.id);
            if (states) {
                _this.ratingBox.onLoad();
                _this.markAsFavoriteBox.onLoad();
                _this.addToWatchlistBox.onLoad();
                _this.manageListsBox.onLoad();
                if (_this.recommendationsBox) {
                    _this.recommendationsBox.onLoad();
                }
                _this.moviesPopUp.onLoad();
                var rated = (_b = states === null || states === void 0 ? void 0 : states.rated) !== null && _b !== void 0 ? _b : false;
                if (movieId) {
                    _this.ratingBox.setValues(movieId, rated);
                    _this.markAsFavoriteBox.setValues(movieId, states.favorite);
                    _this.addToWatchlistBox.setValues(movieId, states.watchlist);
                    _this.manageListsBox.setValues(movieId, false);
                }
            }
        };
        this.leftSideDetails = function (movie) {
            var html = "\n            <div class=\"movie-details-left-side\">\n                <img src=\"".concat(imageUrlPoster).concat(movie.poster_path, "\" alt=\"").concat(movie.title, "\" />\n                <div class=\"movie-rating\">\n                    ").concat(movie.vote_average.toFixed(1), "\n                </div>\n            </div>\n        ");
            return html;
        };
        this.loadMovieGenres = function (movie) {
            var html = '';
            if (movie.genres.length === 0) {
                return html;
            }
            html = "<ul class=\"movie-genres-list\">";
            movie.genres.forEach(function (genre) {
                html += "<li class=\"movie-genre\">".concat(genre.name, "</li>");
            });
            html += "</ul>";
            return html;
        };
        this.loadDateAndDuration = function (movie) {
            var date = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
            var timeConverted = movie.runtime ? convertMinutesToHours(movie.runtime) : '';
            var minutes = timeConverted && (timeConverted.minutes < 10 ? "0".concat(timeConverted.minutes) : timeConverted.minutes);
            var time = timeConverted ? "".concat(timeConverted.hours, "h").concat(minutes) : '';
            var html = "\n            <p class=\"movie-year\">\n                ".concat(date ? "<i class=\"fa-solid fa-film\"></i> ".concat(date) : '').concat(date && time ? '  <i class="fa-solid fa-grip"></i>  <i class="fa-solid fa-clock"></i> ' : " ").concat(time !== null && time !== void 0 ? time : '', "\n            </p>\n        ");
            return html;
        };
        this.loadActionButtons = function (movie) {
            var states = _this.accountStates;
            var html = !states ? "" : "\n            <div class=\"movie-details-action-buttons\">\n            <div class=\"movie-details-action-first-group\">\n                <div class=\"movie-details-action-button\">\n                    ".concat(_this.manageListsBox.load(), "\n                </div>\n                <div>\n                    <div class=\"movie-details-action-button\">\n                        ").concat(_this.markAsFavoriteBox.load(), "\n                    </div>\n                    <div class=\"movie-details-action-button\">\n                        ").concat(_this.addToWatchlistBox.load(), "\n                    </div>\n                </div>\n            </div>\n                <div class=\"movie-details-action-button\">\n                    ").concat(_this.ratingBox.load(), "\n                </div>\n                \n                \n                <div >\n                    <span id=\"api-message-movie-detail\" class=\"notification alert  hidden\"></span>\n                </div>\n            </div>\n        ");
            return html;
        };
        this.rightSideDetails = function (movie) {
            console.log(movie);
            var html = "\n            <div class=\"movie-details-right-side\">\n                <h3>".concat(movie.title, "</h3>\n                ").concat(_this.loadMovieGenres(movie), "\n                ").concat(_this.loadDateAndDuration(movie), "\n                ").concat(_this.loadActionButtons(movie), "\n                <p>").concat(movie.overview, "</p>\n            </div>\n            \n        ");
            return html;
        };
        this.loadCast = function (movie) {
            var castHtml = "";
            var size = movie.credits.cast.length >= 6 ? 6 : movie.credits.cast.length;
            for (var i = 0; i < size; i++) {
                castHtml += "\n                <li class=\"movie-cast-item\">\n                    <img src=\"".concat(imageUrlPoster).concat(movie.credits.cast[i].profile_path, "\" alt=\"").concat(movie.credits.cast[i].original_name, "\" />\n                    <div>\n                        <p><strong>").concat(movie.credits.cast[i].original_name, "</strong></p>\n                        <p>No papel de '").concat(movie.credits.cast[i].character, "'</p>\n                    </div>\n                </li>\n            ");
            }
            var html = "\n            <div class=\"movie-cast\">\n                <h3>Elenco</h3>\n                <ul class=\"movie-cast-list\">\n                    ".concat(castHtml, "\n                </ul>\n            </div>\n        ");
            return html;
        };
        this.Movie = function (movie) {
            var html = "\n            <div class=\"movie-details-backdrop\" style=\"background-image: url(".concat(imageUrlBackdrop).concat(movie.backdrop_path, ")\">\n                ").concat(movie.tagline && "<h2>".concat(movie.tagline, "</h2>"), "\n                <div class=\"movie-details-container\">\n                    <div class=\"movie-details-up-container\">\n                        ").concat(_this.leftSideDetails(movie), "\n                        ").concat(_this.rightSideDetails(movie), "\n                    </div>\n                    ").concat(_this.loadCast(movie), "\n                </div>\n            </div>\n        ");
            return html;
        };
        this.movie = movieProps.movie;
        this.accountStates = movieProps.accountStates;
        this.ratingBox = RatingStars.create('movie-detail', appProps.session_id);
        this.markAsFavoriteBox = MarkAsFavorite.create(appProps, { id: 'movie-detail', hideText: true });
        this.addToWatchlistBox = AddToWatchlist.create(appProps, { id: 'movie-detail', hideText: true });
        this.manageListsBox = AddToList.create(appProps, { id: 'movie-detail', hideText: true });
        this.movieProps = movieProps;
        this.moviesPopUp = MoviePopup.create(appProps);
    }
    MovieDetails.create = function (appProps, movieProps) {
        return new MovieDetails(appProps, movieProps);
    };
    return MovieDetails;
}());
export default MovieDetails;
//# sourceMappingURL=MovieDetails.js.map