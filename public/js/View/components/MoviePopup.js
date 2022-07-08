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
import { currentURL, navigateTo } from "../../helpers/navigation.js";
import ListService from "../../services/ListService.js";
import MovieService from "../../services/MovieService.js";
import AddToList from "./AddToList.js";
import AddToWatchlist from "./AddToWatchlist.js";
import MarkAsFavorite from "./MarkAsFavorite.js";
import Modal from "./Modal.js";
import RatingStars from "./RatingStars.js";
var MoviePopup = /** @class */ (function () {
    function MoviePopup(appProps, onClose) {
        var _this = this;
        var _a;
        this.movieId = '';
        this.listId = '';
        this.session_id = '';
        this.loadInnerHTML = function () {
            var html = "\n            <div class=\"container\" id=\"movie-popup-container\">\n                ".concat(_this.loadButtons(), "\n                <span id=\"api-message-movie-popup\" class=\"movie-popup-btn notification alert  hidden\"></span>\n            </div>\n        ");
            return html;
        };
        this.load = function () {
            return _this.modal.load();
        };
        this.loadButtons = function () {
            var html = '';
            if (!_this.session_id) {
                html = "\n                <div class=\"movie-popup-btn\">Voc\u00EA n\u00E3o est\u00E1 logado</div>\n                <div class=\"movie-popup-btn in-text-link\">\n                    <i class=\"fa-solid fa-right-to-bracket\"></i>\n                    <a class=\"in-text-link\" href=\"".concat(config.BASE_URL, "/?show=login&redirect=").concat(currentURL(), "\">Fazer Login</a>\n                </div>\n            ");
            }
            else {
                html = "\n                <div id=\"add-to-list\" class=\"movie-popup-btn hidden\">\n                ".concat(_this.addToListBox.load(), "</div>\n                <div id=\"remove-from-list\" class=\"movie-popup-btn hidden\"></div>\n                <div id=\"add-to-favorites\" class=\"movie-popup-btn\">").concat(_this.markAsFavoriteBox.load(), "</div>\n                <div id=\"add-to-watchlist\" class=\"movie-popup-btn\">").concat(_this.addToWatchlistBox.load(), "</div>\n                <div id=\"add-rating\" class=\"movie-popup-btn\">\n                    ").concat(_this.ratingBox.load(), "\n                </div>\n                \n            ");
            }
            return html;
        };
        this.onLoad = function () { return __awaiter(_this, void 0, void 0, function () {
            var spans, _loop_1, i;
            var _this = this;
            return __generator(this, function (_a) {
                this.addToList = document.getElementById('add-to-list');
                this.removeFromList = document.getElementById('remove-from-list');
                this.modal.onLoad();
                spans = document.getElementsByClassName('movie-options');
                _loop_1 = function (i) {
                    var id = spans[i].dataset.id;
                    var list = spans[i].dataset.listId;
                    spans[i].addEventListener('click', function (e) {
                        e.preventDefault();
                        _this.open(id, e, list);
                    });
                };
                for (i = 0; i < spans.length; i++) {
                    _loop_1(i);
                }
                if (this.session_id) {
                    this.removeFromList.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
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
                    this.ratingBox.onLoad();
                    this.markAsFavoriteBox.onLoad();
                    this.addToWatchlistBox.onLoad();
                    this.addToListBox.onLoad();
                }
                return [2 /*return*/];
            });
        }); };
        this.open = function (movieId, event, listId) { return __awaiter(_this, void 0, void 0, function () {
            var accountStates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.movieAccountStates(movieId)];
                    case 1:
                        accountStates = _a.sent();
                        if (this.session_id && accountStates) {
                            this.movieId = movieId;
                            this.listId = listId;
                            this.updateButtons(movieId, accountStates);
                        }
                        this.modal.open(event);
                        return [2 /*return*/];
                }
            });
        }); };
        this.onCloseModal = function () {
            if (_this.onClose) {
                _this.onClose();
            }
        };
        this.updateButtons = function (movieId, accountStates) {
            if (!_this.listId) {
                _this.addToList.classList.remove('hidden');
                _this.removeFromList.classList.add('hidden');
                _this.addToListBox.setValues(movieId, false);
            }
            else {
                _this.removeFromList.innerHTML = "\n                <span class=\"fa-stack\">\n                    <i class=\"fa-solid fa-list fa-stack-2x\"></i>\n                </span>\n                Excluir desta lista\n            ";
                _this.addToList.classList.add('hidden');
                _this.removeFromList.classList.remove('hidden');
            }
            _this.ratingBox.setValues(movieId, accountStates.rated);
            _this.markAsFavoriteBox.setValues(movieId, accountStates.favorite);
            _this.addToWatchlistBox.setValues(movieId, accountStates.watchlist);
        };
        this.movieAccountStates = function (movieId) { return __awaiter(_this, void 0, void 0, function () {
            var accountStates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(movieId && this.session_id)) return [3 /*break*/, 2];
                        return [4 /*yield*/, MovieService.getAccountStates(movieId, this.session_id)];
                    case 1:
                        accountStates = _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, accountStates];
                }
            });
        }); };
        this.session_id = (_a = appProps.session_id) !== null && _a !== void 0 ? _a : '';
        this.ratingBox = RatingStars.create('movie-popup', this.session_id);
        this.markAsFavoriteBox = MarkAsFavorite.create(appProps, { id: 'movie-popup', hideText: false });
        this.addToWatchlistBox = AddToWatchlist.create(appProps, { id: 'movie-popup', hideText: false });
        this.addToListBox = AddToList.create(appProps, { id: 'movie-popup', hideText: false });
        this.modal = new Modal(this.loadInnerHTML(), 'movie-popup', this.onCloseModal);
        this.onClose = onClose;
    }
    MoviePopup.create = function (appProps, onClose) {
        return new MoviePopup(appProps, onClose);
    };
    return MoviePopup;
}());
export default MoviePopup;
//# sourceMappingURL=MoviePopup.js.map