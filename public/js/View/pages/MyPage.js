var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { AbstractPage } from "../../interfaces.js";
import { currentURL, navigatePush, navigateTo } from "../../helpers/navigation.js";
import ListService from "../../services/ListService.js";
import MoviesHorizontal from "../components/MoviesHorizontal.js";
import MovieService from "../../services/MovieService.js";
import MoviePopup from "../components/MoviePopup.js";
import Modal from "../components/Modal.js";
var MyPage = /** @class */ (function (_super) {
    __extends(MyPage, _super);
    function MyPage(appProps) {
        var _this = _super.call(this, appProps) || this;
        _this.moviesListBox = [];
        _this.createListName = '';
        _this.createListDescription = '';
        _this.currentTab = 'lists';
        _this.onClosePopUp = function () {
            _this.updateContent(_this.currentTab);
        };
        _this.loadRemoveListModal = function () {
            return "\n            <div class=\"my-page-list-modal-container\">\n                <h3>\n                    Voc\u00EA tem certeza que deseja apagar esta lista?\n                </h3>\n                <button id=\"remove-list-confirm-button\" class=\"button-alert\">Apagar</button>\n                <button id=\"remove-list-cancel-button\" class=\"button\">Cancelar</button>\n            </div>\n        ";
        };
        _this.loadCreateListModal = function () {
            return "\n            <div class=\"my-page-list-modal-container\">\n                <h3>Informe os detalhes da lista</h3>\n                <form class=\"form-wrapper\">\n                    <input id=\"create-list-name\" type=\"text\" class=\"input  border rounded margin-around-small\" placeholder=\"Nome da lista\">\n                    <textarea rows=\"5\" id=\"create-list-description\" type=\"text\" class=\"input  border rounded margin-around-small\" placeholder=\"Descri\u00E7\u00E3o da lista\"></textarea>\n                </form>\n                <button id=\"create-list-confirm-button\" class=\"button-action margin-around-small\">Criar Lista</button>\n                <button id=\"create-list-cancel-button\" class=\"button margin-around-small\">Cancelar</button>\n            </div>\n        ";
        };
        _this.load = function () { return __awaiter(_this, void 0, void 0, function () {
            var html;
            return __generator(this, function (_a) {
                this.removeListModal = new Modal(this.loadRemoveListModal(), 'remove-list', this.onCloseRemoveModal);
                this.createListModal = new Modal(this.loadCreateListModal(), 'create-list', this.onCloseCreateModal);
                html = "\n            <section id=\"my-page\" class=\"page-wrapper\">\n                <header class=\"content-header-wrapper\">\n                    ".concat(this.myPageHeader(), "\n                </header>\n                <section id=\"my-page-content\" class=\"page-wrapper\">\n                </section>\n                \n            </section>\n        ");
                return [2 /*return*/, html];
            });
        }); };
        _this.updateContent = function (tabToShow) { return __awaiter(_this, void 0, void 0, function () {
            var tab, html, _a, _b, _c, _d, _e, _f, _g;
            var _h, _j, _k, _l, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        tab = tabToShow !== null && tabToShow !== void 0 ? tabToShow : 'lists';
                        this.currentTab = tab;
                        if (!this.content) return [3 /*break*/, 13];
                        this.content.innerHTML = 'Carregando...';
                        html = '';
                        _a = tab;
                        switch (_a) {
                            case 'lists': return [3 /*break*/, 1];
                            case 'favorites': return [3 /*break*/, 3];
                            case 'watchlist': return [3 /*break*/, 5];
                            case 'rates': return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 9];
                    case 1:
                        _b = html;
                        return [4 /*yield*/, this.listsContent()];
                    case 2:
                        html = _b + ((_h = _o.sent()) !== null && _h !== void 0 ? _h : '');
                        return [3 /*break*/, 11];
                    case 3:
                        _c = html;
                        return [4 /*yield*/, this.favoritesContent()];
                    case 4:
                        html = _c + ((_j = _o.sent()) !== null && _j !== void 0 ? _j : '');
                        return [3 /*break*/, 11];
                    case 5:
                        _d = html;
                        return [4 /*yield*/, this.watchlistContent()];
                    case 6:
                        html = _d + ((_k = _o.sent()) !== null && _k !== void 0 ? _k : '');
                        return [3 /*break*/, 11];
                    case 7:
                        _e = html;
                        return [4 /*yield*/, this.ratesContent()];
                    case 8:
                        html = _e + ((_l = _o.sent()) !== null && _l !== void 0 ? _l : '');
                        return [3 /*break*/, 11];
                    case 9:
                        _f = html;
                        return [4 /*yield*/, this.listsContent()];
                    case 10:
                        html = _f + ((_m = _o.sent()) !== null && _m !== void 0 ? _m : '');
                        _o.label = 11;
                    case 11:
                        _g = html;
                        return [4 /*yield*/, this.moviesPopUp.load()];
                    case 12:
                        html = _g + _o.sent();
                        this.content.innerHTML = html;
                        if (tab === 'lists') {
                            this.moviesListBox.forEach(function (box) { return box.onLoad(); });
                            this.updateListsButtons();
                        }
                        this.moviesPopUp.onLoad();
                        _o.label = 13;
                    case 13: return [2 /*return*/];
                }
            });
        }); };
        _this.updateListsButtons = function () {
            _this.createListButtons = document.getElementsByClassName('create-list-button');
            _this.removeListButtons = document.getElementsByClassName('remove-list-button');
            _this.removeListModal.onLoad();
            _this.createListModal.onLoad();
            _this.removeListCancelButton = document.getElementById('remove-list-cancel-button');
            _this.removeListConfirmButton = document.getElementById('remove-list-confirm-button');
            _this.createListCancelButton = document.getElementById('create-list-cancel-button');
            _this.createListConfirmButton = document.getElementById('create-list-confirm-button');
            _this.createListNameInput = document.getElementById('create-list-name');
            _this.createListDescriptionInput = document.getElementById('create-list-description');
            for (var i = 0; i < _this.createListButtons.length; i++) {
                var item = _this.createListButtons[i];
                item.addEventListener('click', function (e) {
                    e.preventDefault();
                    _this.createListModal.open(e);
                    _this.createListNameInput.value = '';
                    _this.createListDescriptionInput.value = '';
                    _this.createListConfirmButton.disabled = true;
                });
            }
            var _loop_1 = function (i) {
                var item = _this.removeListButtons[i];
                item.addEventListener('click', function (e) {
                    e.preventDefault();
                    _this.removeListModal.open(e);
                    _this.removeListConfirmButton.dataset.listId = item.dataset.listId;
                });
            };
            for (var i = 0; i < _this.removeListButtons.length; i++) {
                _loop_1(i);
            }
            _this.removeListCancelButton.addEventListener('click', function (e) {
                e.preventDefault();
                _this.removeListModal.close();
            });
            _this.createListCancelButton.addEventListener('click', function (e) {
                e.preventDefault();
                _this.createListModal.close();
            });
            _this.removeListConfirmButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                var listId, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            listId = this.removeListConfirmButton.dataset.listId;
                            if (!(this.session_id && listId)) return [3 /*break*/, 2];
                            return [4 /*yield*/, ListService.removeList(this.session_id, listId)];
                        case 1:
                            resp = _a.sent();
                            this.removeListModal.close();
                            navigateTo(currentURL(), true);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
            _this.createListConfirmButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                var list, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            list = {
                                name: this.createListName,
                                description: this.createListDescription
                            };
                            if (!(this.session_id && this.createListName && this.createListDescription)) return [3 /*break*/, 2];
                            return [4 /*yield*/, ListService.createList(this.session_id, list)];
                        case 1:
                            resp = _a.sent();
                            this.createListModal.close();
                            navigateTo(currentURL(), true);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
            _this.createListNameInput.addEventListener('input', _this.changeValueCreateListName);
            _this.createListDescriptionInput.addEventListener('input', _this.changeValueCreateListDescription);
            _this.createListConfirmButton.disabled = true;
        };
        _this.onLoad = function () {
            var _a;
            _this.content = document.getElementById('my-page-content');
            _this.navButtons = document.getElementsByClassName('user-navigation');
            var tab = (_a = _this.params.get('tab')) !== null && _a !== void 0 ? _a : 'lists';
            _this.updateContent(tab);
            for (var i = 0; i < _this.navButtons.length; i++) {
                _this.navButtons[i].addEventListener('click', _this.handleNavButtonClick);
            }
        };
        _this.onCloseRemoveModal = function (e) {
        };
        _this.onCloseCreateModal = function (e) {
        };
        _this.handleNavButtonClick = function (event) {
            for (var i = 0; i < _this.navButtons.length; i++) {
                var el = event.currentTarget;
                if (_this.navButtons[i].id !== el.id) {
                    _this.navButtons[i].classList.remove('active');
                }
                else {
                    var button = _this.navButtons[i];
                    navigatePush("/?show=user&tab=".concat(button.dataset.id));
                    _this.navButtons[i].classList.add('active');
                    _this.updateContent(button.dataset.id);
                }
            }
        };
        _this.myPageHeader = function () {
            var _a;
            var tab = (_a = _this.params.get('tab')) !== null && _a !== void 0 ? _a : 'lists';
            var html = "";
            var image = '';
            if (_this.user) {
                if (_this.user.avatar.tmdb.avatar_path) {
                    image = "<img class='user-image' src=\"https://www.themoviedb.org/t/p/w300_and_h300_face/".concat(_this.user.avatar.tmdb.avatar_path, "\">");
                }
                else {
                    image = "<div  class='user-image' ></div>";
                }
                html = "\n                <div class='user-header'>\n                    ".concat(image, "\n                    <h2>").concat(_this.user.name !== '' ? _this.user.name : _this.user.username, "</h2>\n                </div>\n                <nav>\n                    \n                    <div class='").concat(tab === 'lists' ? 'active ' : '', " user-navigation' id=\"user-lists-button\" data-id=\"lists\">\n                        <p>Listas</p>\n                    </div>\n                    <div class='").concat(tab === 'favorites' ? 'active ' : '', "user-navigation' id=\"user-favorites-button\" data-id=\"favorites\">\n                        <p>Favoritos</p>\n                    </div>\n                    <div class='").concat(tab === 'watchlist' ? 'active ' : '', "user-navigation'  id=\"user-watchlist-button\"  data-id=\"watchlist\">\n                        <p>Interesses</p>\n                    </div>\n                    <div class='").concat(tab === 'rates' ? 'active ' : '', "user-navigation'  id=\"user-rates-button\"  data-id=\"rates\">\n                        <p>Avalia\u00E7\u00F5es</p>\n                    </div>\n                    \n                </nav>\n            ");
            }
            return html;
        };
        _this.listsContent = function () { return __awaiter(_this, void 0, void 0, function () {
            var userId, lists, listsHtml, _i, lists_1, list, movies, moviesHtml, moviesList, html, _a, _b, _c, _d;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        userId = String((_e = this.user) === null || _e === void 0 ? void 0 : _e.id);
                        if (!this.user || !this.session_id) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, ListService.getLists(userId, this.session_id)];
                    case 1:
                        lists = _f.sent();
                        listsHtml = '';
                        if (!lists) return [3 /*break*/, 5];
                        _i = 0, lists_1 = lists;
                        _f.label = 2;
                    case 2:
                        if (!(_i < lists_1.length)) return [3 /*break*/, 5];
                        list = lists_1[_i];
                        return [4 /*yield*/, ListService.getListDetails(list.id)];
                    case 3:
                        movies = _f.sent();
                        moviesHtml = "";
                        if (movies && list.list_type === 'movie') {
                            moviesList = MoviesHorizontal.create(movies);
                            moviesHtml = moviesList.load();
                            this.moviesListBox.push(moviesList);
                        }
                        listsHtml += "\n                    <div class=\"content-main-wrapper\">\n                        <h2 class=\"lists-title\">\n                            <div>\n                                <i class=\"fa-solid fa-list\"></i> ".concat(list.name, " \n                            </div>\n                            <div>\n                                <button data-list-id=\"").concat(list.id, "\" class=\"remove-list-button button-alert rounded\"><i class=\"fa-solid fa-trash\"></i></button>\n                                \n                            </div>\n                        </h2>\n                        <p class=\"text\">").concat(list.description, "</p>\n                        <ul class=\"suggestions-list\" id=\"movies-list\">\n                            ").concat(moviesHtml, "\n                        </ul>\n                    </div>\n                ");
                        _f.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        _c = (_b = "\n            <div  class='user-content' id=\"user-lists\" >\n                <div class=\"create-list-button\">\n                    <button class=\"button\"><i class=\"fa fa-plus\"></i> Criar uma nova Lista</button>\n                </div>\n                ".concat(listsHtml, "\n                <div class=\"create-list-button\">\n                    <button class=\"button\"><i class=\"fa fa-plus\"></i> Criar uma nova Lista</button>\n                </div>\n                ")).concat;
                        return [4 /*yield*/, this.removeListModal.load()];
                    case 6:
                        _d = (_a = _c.apply(_b, [_f.sent(), "\n                "])).concat;
                        return [4 /*yield*/, this.createListModal.load()];
                    case 7:
                        html = _d.apply(_a, [_f.sent(), "\n            </div>\n        "]);
                        return [2 /*return*/, html];
                }
            });
        }); };
        _this.ratesContent = function () { return __awaiter(_this, void 0, void 0, function () {
            var userId, movies, moviesHtml, moviesList, html;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = String((_a = this.user) === null || _a === void 0 ? void 0 : _a.id);
                        if (!this.user || !this.session_id) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, MovieService.getRatedMovies(userId, this.session_id)];
                    case 1:
                        movies = _b.sent();
                        moviesHtml = "";
                        if (movies) {
                            moviesList = MoviesHorizontal.create(movies);
                            moviesHtml = moviesList.load();
                            this.moviesListBox.push(moviesList);
                        }
                        html = "\n            <div class=\"content-main-wrapper\">\n                <h2><i class=\"fa-solid fa-star\"></i> Minhas Avalia\u00E7\u00F5es</h2>\n                <ul class=\"suggestions-list\" id=\"movies-list\">\n                    ".concat(moviesHtml, "\n                </ul>\n            </div>\n        ");
                        return [2 /*return*/, html];
                }
            });
        }); };
        _this.watchlistContent = function () { return __awaiter(_this, void 0, void 0, function () {
            var userId, movies, moviesHtml, moviesList, html;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = String((_a = this.user) === null || _a === void 0 ? void 0 : _a.id);
                        if (!this.user || !this.session_id) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, MovieService.getWatchlistMovies(userId, this.session_id)];
                    case 1:
                        movies = _b.sent();
                        moviesHtml = "";
                        if (movies) {
                            moviesList = MoviesHorizontal.create(movies);
                            moviesHtml = moviesList.load();
                            this.moviesListBox.push(moviesList);
                        }
                        html = "\n            <div class=\"content-main-wrapper\">\n                <h2><i class=\"fa-solid fa-bookmark\"></i> Meus Interesses</h2>\n                <ul class=\"suggestions-list\" id=\"movies-list\">\n                    ".concat(moviesHtml, "\n                </ul>\n            </div>\n        ");
                        return [2 /*return*/, html];
                }
            });
        }); };
        _this.favoritesContent = function () { return __awaiter(_this, void 0, void 0, function () {
            var userId, movies, moviesHtml, moviesList, html;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = String((_a = this.user) === null || _a === void 0 ? void 0 : _a.id);
                        if (!this.user || !this.session_id) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, MovieService.getFavoritesMovies(userId, this.session_id)];
                    case 1:
                        movies = _b.sent();
                        moviesHtml = "";
                        if (movies) {
                            moviesList = MoviesHorizontal.create(movies);
                            moviesHtml = moviesList.load();
                            this.moviesListBox.push(moviesList);
                        }
                        html = "\n            <div class=\"content-main-wrapper\">\n                <h2><i class=\"fa-solid fa-heart\"></i> Meus Favoritos</h2>\n                <ul class=\"suggestions-list\" id=\"movies-list\">\n                    ".concat(moviesHtml, "\n                </ul>\n            </div>\n        ");
                        return [2 /*return*/, html];
                }
            });
        }); };
        _this.changeValueCreateListName = function () {
            _this.createListName = _this.createListNameInput.value;
            _this.validateCreateListButton();
        };
        _this.changeValueCreateListDescription = function () {
            _this.createListDescription = _this.createListDescriptionInput.value;
            _this.validateCreateListButton();
        };
        _this.moviesPopUp = MoviePopup.create(appProps, _this.onClosePopUp);
        return _this;
    }
    MyPage.prototype.validateCreateListButton = function () {
        if (this.createListName && this.createListDescription) {
            this.createListConfirmButton.disabled = false;
        }
        else {
            this.createListConfirmButton.disabled = true;
        }
    };
    MyPage.create = function (props) {
        if (!props.session_id || !props.user) {
            navigateTo("/?show=login");
        }
        return new MyPage(props);
    };
    return MyPage;
}(AbstractPage));
export default MyPage;
//# sourceMappingURL=MyPage.js.map