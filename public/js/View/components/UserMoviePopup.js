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
import { currentURL, navigateTo } from "../../helpers/navigation.js";
import ListService from "../../services/ListService.js";
import MovieService from "../../services/MovieService.js";
import AddToWatchlist from "./AddToWatchlist.js";
import MarkAsFavorite from "./MarkAsFavorite.js";
import RatingStars from "./RatingStars.js";
var UserMoviePopup = /** @class */ (function () {
    function UserMoviePopup(appProps) {
        var _this = this;
        var _a;
        this.movieId = '';
        this.listId = '';
        this.showListButton = true;
        this.body = document.getElementsByTagName('body')[0];
        this.session_id = '';
        this.scroll = 0;
        this.load = function () {
            var html = "\n            <aside id=\"movie-popup\" class=\"movie-popup hidden\">\n                <div class=\"movie-popup-background\" id=\"movie-popup-background\">\n                </div>\n                <div class=\"container\" id=\"movie-popup-container\">\n                    ".concat(_this.loadButtons(), "\n                    <span id=\"api-message\" class=\"movie-popup-btn notification alert  hidden\"></span>\n                </div>\n            </aside>\n        ");
            return html;
        };
        this.loadButtons = function () {
            var html = '';
            if (!_this.session_id) {
                html = "\n                <div class=\"movie-popup-btn\">Voc\u00EA n\u00E3o est\u00E1 logado</div>\n                <div class=\"movie-popup-btn\">\n                    <i class=\"fa-solid fa-user\"></i>\n                    <a class=\"in-text-link\" href=\"/?show=login&redirect=".concat(currentURL(), "\">Fazer Login</a>\n                </div>\n            ");
            }
            else {
                html = "\n                <div id=\"add-to-list\" class=\"movie-popup-btn\"></div>\n                <div id=\"add-to-favorites\" class=\"movie-popup-btn\">".concat(_this.markAsFavoriteBox.load(), "</div>\n                <div id=\"add-to-watchlist\" class=\"movie-popup-btn\">").concat(_this.addToWatchlistBox.load(), "</div>\n                <div id=\"add-rating\" class=\"movie-popup-btn\">\n                    ").concat(_this.ratingBox.load(), "\n                </div>\n                \n            ");
            }
            return html;
        };
        this.onLoad = function () {
            _this.popup = document.getElementById('movie-popup');
            _this.background = document.getElementById('movie-popup-background');
            _this.container = document.getElementById('movie-popup-container');
            _this.removeFromList = document.getElementById('add-to-list');
            _this.removeFromList.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                var resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ListService.removeMovie(this.movieId, this.session_id, this.listId)];
                        case 1:
                            resp = _a.sent();
                            if (resp && resp.success) {
                                navigateTo(currentURL());
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            _this.background.addEventListener('click', function (e) {
                e.preventDefault();
                _this.close();
            });
            var spans = document.getElementsByClassName('movie-options');
            var _loop_1 = function (i) {
                var id = spans[i].dataset.id;
                var list = spans[i].dataset.listId;
                spans[i].addEventListener('click', function (e) {
                    e.preventDefault();
                    _this.open(id, e, list);
                });
            };
            for (var i = 0; i < spans.length; i++) {
                _loop_1(i);
            }
            if (_this.session_id) {
                _this.ratingBox.onLoad();
                _this.markAsFavoriteBox.onLoad();
                _this.addToWatchlistBox.onLoad();
            }
        };
        this.open = function (movieId, event, listId) { return __awaiter(_this, void 0, void 0, function () {
            var accountStates, x, y;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.scroll = window.scrollY;
                        this.body.style.top = -this.scroll + 'px';
                        this.lockScroll(this.body);
                        return [4 /*yield*/, this.movieAccountStates(movieId)];
                    case 1:
                        accountStates = _a.sent();
                        if (this.session_id && accountStates) {
                            this.movieId = movieId;
                            this.listId = listId;
                            this.showListButton = !!listId;
                            this.updateButtons(movieId, accountStates);
                        }
                        this.popup.classList.remove('hidden');
                        x = event.clientX - this.container.clientLeft - this.container.clientWidth;
                        y = event.clientY - this.container.clientTop;
                        this.container.style.top = y + 160 + this.container.clientHeight < window.innerHeight ? y + 'px' : window.innerHeight - this.container.clientHeight - 160 + 'px';
                        this.container.style.left = x > 0 ? x + 'px' : 0 + 'px';
                        return [2 /*return*/];
                }
            });
        }); };
        this.close = function () {
            _this.body.classList.remove('no-scroll');
            window.scroll(0, _this.scroll);
            _this.scroll = 0;
            _this.popup.classList.add('hidden');
        };
        this.updateButtons = function (movieId, accountStates) {
            _this.removeFromList.innerHTML = !_this.showListButton ? '' : "\n            <span class=\"fa-stack\">\n                <i class=\"fa-solid fa-list fa-stack-2x\"></i>\n            </span>\n            Excluir desta lista\n        ";
            _this.ratingBox.setRate(movieId, accountStates.rated);
            // this.ratingBox.toggleShowState(true)
            _this.markAsFavoriteBox.setValues(movieId, accountStates.favorite);
            // this.markAsFavoriteBox.toggleShowState(true)
            _this.addToWatchlistBox.setValues(movieId, accountStates.watchlist);
        };
        this.movieAccountStates = function (movieId) { return __awaiter(_this, void 0, void 0, function () {
            var isLoggedIn, accountStates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isLoggedIn = !!this.session_id;
                        if (!(movieId && this.session_id)) return [3 /*break*/, 2];
                        return [4 /*yield*/, MovieService.getAccountStates(movieId, this.session_id)];
                    case 1:
                        accountStates = _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, accountStates];
                }
            });
        }); };
        this.lockScroll = function (body) {
            if (document.documentElement.scrollHeight > window.innerHeight) {
                body.classList.add('no-scroll');
            }
        };
        this.session_id = (_a = appProps.session_id) !== null && _a !== void 0 ? _a : '';
        this.ratingBox = RatingStars.create(this.session_id);
        this.markAsFavoriteBox = MarkAsFavorite.create(appProps);
        this.addToWatchlistBox = AddToWatchlist.create(appProps);
    }
    UserMoviePopup.create = function (appProps) {
        return new UserMoviePopup(appProps);
    };
    return UserMoviePopup;
}());
export default UserMoviePopup;
//# sourceMappingURL=UserMoviePopup.js.map