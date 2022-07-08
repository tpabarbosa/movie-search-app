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
import config from './config.js';
import HttpClient, { Method } from './services/HttpClient.js';
import { MovieAppStorage } from './LocalStorageManager.js';
// import {renderHeader} from './View/index.js'
var oneDay = 1000 * 60 * 60 * 24;
var dateToScreenOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
var searchWrapper = document.getElementById('search-wrapper');
var suggestionsWrapper = document.getElementById('suggestions-wrapper');
var queryWrapper = document.getElementById('query-wrapper');
var loginWrapper = document.getElementById('login-wrapper');
var password;
var username;
var passwordInput = document.getElementById('senha');
var usernameInput = document.getElementById('login');
var loginButton = document.getElementById('login-button');
passwordInput.addEventListener('input', preencherSenha);
usernameInput.addEventListener('input', preencherLogin);
loginButton.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, criarRequestToken()];
            case 1:
                _a.sent();
                return [4 /*yield*/, logar()];
            case 2:
                _a.sent();
                return [4 /*yield*/, criarSessao()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var requestToken;
var sessionId;
function criarRequestToken() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "".concat(config.TMDB.API_URL, "/authentication/token/new?api_key=").concat(config.TMDB.API_KEY_V3),
                        method: Method.GET
                    })];
                case 1:
                    result = _a.sent();
                    requestToken = result.request_token;
                    return [2 /*return*/];
            }
        });
    });
}
function logar() {
    return __awaiter(this, void 0, void 0, function () {
        var body, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = {
                        username: "".concat(username),
                        password: "".concat(password),
                        request_token: "".concat(requestToken)
                    };
                    return [4 /*yield*/, HttpClient.get({
                            url: "".concat(config.TMDB.API_URL, "/authentication/token/validate_with_login?api_key=").concat(config.TMDB.API_KEY_V3),
                            method: Method.POST,
                            body: body
                        })];
                case 1:
                    result = _a.sent();
                    if (result.success) {
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function criarSessao() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "".concat(config.TMDB.API_URL, "/authentication/session/new?api_key=").concat(config.TMDB.API_KEY_V3, "&request_token=").concat(requestToken),
                        method: Method.GET
                    })];
                case 1:
                    result = _a.sent();
                    sessionId = result.session_id;
                    console.log(sessionId);
                    return [2 /*return*/];
            }
        });
    });
}
function preencherSenha() {
    password = passwordInput.value;
    validateLoginButton();
}
function preencherLogin() {
    username = usernameInput.value;
    validateLoginButton();
}
function validateLoginButton() {
    console.log(password, username);
    if (password && username) {
        loginButton.disabled = false;
    }
    else {
        loginButton.disabled = true;
    }
}
var getMovies = function (type, query, page) {
    if (query === void 0) { query = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var url, method, response, error_1, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (type === 'suggestions') {
                        url = "".concat(config.TMDB.API_URL, "/discover/movie?api_key=").concat(config.TMDB.API_KEY_V3, "&language=").concat(config.TMDB.LANGUAGE, "&sort_by=popularity.desc&include_adult=false&page=1");
                    }
                    else {
                        url = "".concat(config.TMDB.API_URL, "/search/movie?api_key=").concat(config.TMDB.API_KEY_V3, "&language=").concat(config.TMDB.LANGUAGE, "&query=").concat(query, "&page=").concat(page);
                    }
                    method = Method.GET;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, HttpClient.get({ url: url, method: method })];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response];
                case 3:
                    error_1 = _a.sent();
                    err = error_1;
                    console.log(err.status, err.statusText.status_message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var renderMovies = function () { return __awaiter(void 0, void 0, void 0, function () {
    var render, getFromAPI, moviesData, movies;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                render = function (movies) {
                    var movieList = document.getElementById('movies-list');
                    movies.forEach(function (movie) {
                        var movieElement = document.createElement('li');
                        movieElement.classList.add('suggestion');
                        movieElement.innerHTML = "\n                <a href=\"#\">\n                    <img src=\"".concat(config.TMDB.IMAGE_URL).concat(movie.poster_path, "\" alt=\"").concat(movie.title, "\">\n                    <h3>").concat(movie.title, "</h3>\n                    <p>").concat(new Date(movie.release_date).toLocaleDateString('pt-BR', dateToScreenOptions), "</p>\n                </a>\n                <span class='movie-options'>...</span>\n                <span class='movie-vote-average'>").concat(movie.vote_average, "</span>\n            ");
                        movieList.appendChild(movieElement);
                    });
                };
                getFromAPI = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var movies;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, getMovies('suggestions')];
                            case 1:
                                movies = _a.sent();
                                if (movies) {
                                    MovieAppStorage.saveSuggestions(movies.results);
                                    console.log('NEW API REQUEST get suggestions');
                                    return [2 /*return*/, movies.results];
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                return [4 /*yield*/, MovieAppStorage.getSuggestions()];
            case 1:
                moviesData = _a.sent();
                if (!moviesData) return [3 /*break*/, 5];
                if (!(new Date(moviesData.date).getTime() > new Date().getTime() - oneDay)) return [3 /*break*/, 2];
                movies = moviesData.movies;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, getFromAPI()];
            case 3:
                movies = _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, getFromAPI()];
            case 6:
                movies = _a.sent();
                _a.label = 7;
            case 7:
                if (movies) {
                    render(movies);
                }
                return [2 /*return*/];
        }
    });
}); };
var renderSearchResult = function (query, page) {
    if (page === void 0) { page = 1; }
    return __awaiter(void 0, void 0, void 0, function () {
        var movies, movieList_1, movieList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMovies('search', query, page)];
                case 1:
                    movies = _a.sent();
                    console.log(movies);
                    if (movies && movies.results.length > 0) {
                        movieList_1 = document.getElementById('query-list');
                        movies.results.forEach(function (movie) {
                            var movieElement = document.createElement('li');
                            movieElement.classList.add('query');
                            movieElement.innerHTML = "\n                    <a href=\"#\">\n                        <img src=\"".concat(config.TMDB.IMAGE_URL).concat(movie.poster_path, "\" alt=\"").concat(movie.title, "\">\n                        <div>\n                        <h3>").concat(movie.title, "</h3>\n                        <p class='movie-year'>").concat(new Date(movie.release_date).getFullYear(), "</p>\n                        <p>").concat(movie.overview, "</p>\n                        </div>\n                        \n                    </a>\n                    <span class='movie-options'>...</span>\n                    <span class='movie-vote-average'>").concat(movie.vote_average, "</span>\n                ");
                            movieList_1.appendChild(movieElement);
                        });
                    }
                    else {
                        movieList = document.getElementById('query-list');
                        movieList.innerHTML = '<h3>Nenhum resultado encontrado</h3>';
                    }
                    return [2 /*return*/];
            }
        });
    });
};
var searchButton = document.getElementById('search-button');
var searchInput = document.getElementById('search-input');
searchButton.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
    var search;
    return __generator(this, function (_a) {
        search = searchInput.value;
        if (search) {
            window.location.href = "?search=" + search;
        }
        return [2 /*return*/];
    });
}); });
var params = new URLSearchParams(window.location.search);
// renderHeader()
if (params.has('search')) {
    var query = params.get('search');
    console.log(query);
    if (query)
        renderSearchResult(query);
    var title = document.getElementsByTagName('h2')[0];
    title.innerHTML = "Resultados para a busca: \"".concat(query, "\"");
    suggestionsWrapper.classList.add('hidden');
    loginWrapper.classList.add('hidden');
    queryWrapper.classList.remove('hidden');
    searchWrapper.classList.remove('hidden');
}
else if (params.has('show')) {
    var show = params.get('show');
    if (show === 'login') {
        suggestionsWrapper.classList.add('hidden');
        loginWrapper.classList.remove('hidden');
        queryWrapper.classList.add('hidden');
        searchWrapper.classList.remove('hidden');
    }
}
else {
    renderMovies();
    suggestionsWrapper.classList.remove('hidden');
    loginWrapper.classList.add('hidden');
    queryWrapper.classList.add('hidden');
    searchWrapper.classList.add('hidden');
}
//# sourceMappingURL=app_OLD.js.map