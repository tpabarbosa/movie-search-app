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
import config from "../config.js";
import HttpClient, { Method } from "./HttpClient.js";
import LocalStorageManager from "../LocalStorageManager.js";
var api_key = config.TMDB.API_KEY_V3;
var api_url = config.TMDB.API_URL;
var language = config.TMDB.LANGUAGE;
var MovieService = /** @class */ (function () {
    function MovieService() {
    }
    var _a;
    _a = MovieService;
    MovieService.getSuggestions = function (page) {
        if (page === void 0) { page = 1; }
        return __awaiter(void 0, void 0, void 0, function () {
            var movies;
            return __generator(_a, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, HttpClient.request({
                            url: "".concat(api_url, "/discover/movie"),
                            query: {
                                api_key: api_key,
                                language: language,
                                sort_by: "popularity.desc",
                                include_adult: 'false',
                                page: page
                            },
                            method: Method.GET
                        })];
                    case 1:
                        movies = _b.sent();
                        if (!movies) {
                            return [2 /*return*/, movies];
                        }
                        LocalStorageManager.setSuggestions(movies.results);
                        return [2 /*return*/, movies.results];
                }
            });
        });
    };
    MovieService.searchMovies = function (query, page) {
        if (page === void 0) { page = 1; }
        return __awaiter(void 0, void 0, void 0, function () {
            var movies;
            return __generator(_a, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, HttpClient.request({
                            url: "".concat(api_url, "/search/movie"),
                            query: {
                                api_key: api_key,
                                language: language,
                                sort_by: "popularity.desc",
                                include_adult: 'false',
                                query: query,
                                page: page
                            },
                            method: Method.GET
                        })];
                    case 1:
                        movies = _b.sent();
                        if (!movies) {
                            return [2 /*return*/, movies];
                        }
                        return [2 /*return*/, movies.results];
                }
            });
        });
    };
    MovieService.getMovieDetails = function (movieId) { return __awaiter(void 0, void 0, void 0, function () {
        var movie;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, HttpClient.request({
                        url: "".concat(api_url, "/movie/").concat(movieId),
                        query: {
                            api_key: api_key,
                            language: language,
                            append_to_response: 'recommendations,credits,reviews'
                        },
                        method: Method.GET
                    })];
                case 1:
                    movie = _b.sent();
                    return [2 /*return*/, movie];
            }
        });
    }); };
    MovieService.getAccountStates = function (movieId, session_id) { return __awaiter(void 0, void 0, void 0, function () {
        var states;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, HttpClient.request({
                        url: "".concat(api_url, "/movie/").concat(movieId, "/account_states"),
                        query: {
                            api_key: api_key,
                            session_id: session_id,
                        },
                        method: Method.GET
                    })];
                case 1:
                    states = _b.sent();
                    return [2 /*return*/, states];
            }
        });
    }); };
    MovieService.rateMovie = function (movieId, session_id, value) { return __awaiter(void 0, void 0, void 0, function () {
        var rate;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, HttpClient.request({
                        url: "".concat(api_url, "/movie/").concat(movieId, "/rating"),
                        query: {
                            api_key: api_key,
                            session_id: session_id,
                        },
                        body: {
                            value: value
                        },
                        method: Method.POST
                    })];
                case 1:
                    rate = _b.sent();
                    return [2 /*return*/, rate];
            }
        });
    }); };
    MovieService.deleteRateMovie = function (movieId, session_id) { return __awaiter(void 0, void 0, void 0, function () {
        var rate;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, HttpClient.request({
                        url: "".concat(api_url, "/movie/").concat(movieId, "/rating"),
                        query: {
                            api_key: api_key,
                            session_id: session_id,
                        },
                        method: Method.DELETE
                    })];
                case 1:
                    rate = _b.sent();
                    return [2 /*return*/, rate];
            }
        });
    }); };
    MovieService.markAsFavorite = function (account_id, session_id, media_id, favorite) { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, HttpClient.request({
                        url: "".concat(api_url, "/account/").concat(account_id, "/favorite"),
                        query: { api_key: api_key, session_id: session_id },
                        method: Method.POST,
                        body: {
                            media_type: 'movie',
                            media_id: media_id,
                            favorite: favorite
                        }
                    })];
                case 1:
                    resp = _b.sent();
                    return [2 /*return*/, resp];
            }
        });
    }); };
    MovieService.addToWatchlist = function (account_id, session_id, media_id, watchlist) { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, HttpClient.request({
                        url: "".concat(api_url, "/account/").concat(account_id, "/watchlist"),
                        query: { api_key: api_key, session_id: session_id },
                        method: Method.POST,
                        body: {
                            media_type: 'movie',
                            media_id: media_id,
                            watchlist: watchlist
                        }
                    })];
                case 1:
                    resp = _b.sent();
                    return [2 /*return*/, resp];
            }
        });
    }); };
    MovieService.getRatedMovies = function (account_id, session_id, page) {
        if (page === void 0) { page = 1; }
        return __awaiter(void 0, void 0, void 0, function () {
            var movies;
            return __generator(_a, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, HttpClient.request({
                            url: "".concat(api_url, "/account/").concat(account_id, "/rated/movies"),
                            query: {
                                api_key: api_key,
                                session_id: session_id,
                                language: language,
                                page: page
                            },
                            method: Method.GET
                        })];
                    case 1:
                        movies = _b.sent();
                        if (!movies) {
                            return [2 /*return*/, movies];
                        }
                        return [2 /*return*/, movies.results];
                }
            });
        });
    };
    MovieService.getWatchlistMovies = function (account_id, session_id, page) {
        if (page === void 0) { page = 1; }
        return __awaiter(void 0, void 0, void 0, function () {
            var movies;
            return __generator(_a, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, HttpClient.request({
                            url: "".concat(api_url, "/account/").concat(account_id, "/watchlist/movies"),
                            query: {
                                api_key: api_key,
                                session_id: session_id,
                                language: language,
                                page: page
                            },
                            method: Method.GET
                        })];
                    case 1:
                        movies = _b.sent();
                        if (!movies) {
                            return [2 /*return*/, movies];
                        }
                        return [2 /*return*/, movies.results];
                }
            });
        });
    };
    MovieService.getFavoritesMovies = function (account_id, session_id, page) {
        if (page === void 0) { page = 1; }
        return __awaiter(void 0, void 0, void 0, function () {
            var movies;
            return __generator(_a, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, HttpClient.request({
                            url: "".concat(api_url, "/account/").concat(account_id, "/favorite/movies"),
                            query: {
                                api_key: api_key,
                                session_id: session_id,
                                language: language,
                                page: page
                            },
                            method: Method.GET
                        })];
                    case 1:
                        movies = _b.sent();
                        if (!movies) {
                            return [2 /*return*/, movies];
                        }
                        return [2 /*return*/, movies.results];
                }
            });
        });
    };
    return MovieService;
}());
export default MovieService;
//# sourceMappingURL=MovieService.js.map