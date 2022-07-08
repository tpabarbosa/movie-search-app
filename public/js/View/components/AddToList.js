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
import { AbstractComponent } from "../../interfaces.js";
import ListService from "../../services/ListService.js";
var AddToList = /** @class */ (function (_super) {
    __extends(AddToList, _super);
    function AddToList(appProps, opt) {
        var _this = this;
        var _a;
        _this = _super.call(this) || this;
        _this.session_id = '';
        _this.isOpen = false;
        _this.id = '';
        _this.load = function () {
            var html = "\n            \n                \n                <div id=\"add-to-list-title-".concat(_this.id, "\" class=\"add-to-list-title\">\n                    <div>\n                    <span class=\"fa-stack\">\n                        <i class=\"fa-solid fa-list fa-stack-2x\"></i>\n                    </span>\n                    ").concat(!_this.hideText ? 'Administrar Listas' : '', "\n                    </div>\n                    ").concat(!_this.hideText ? ' <i class="fa-solid fa-caret-down"></i>' : '', "\n                </div>\n                \n            \n            <div id=\"manage-lists-modal-").concat(_this.id, "\" class=\"manage-lists-container hidden\">\n                    Deve abrir uma modal\n\n                </div>\n        ");
            return html;
        };
        _this.updateLists = function () { return __awaiter(_this, void 0, void 0, function () {
            var userId, lists, movieStatus, html, _i, lists_1, list, status_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.modal.innerHTML = 'Carregando...';
                        userId = String((_a = this.user) === null || _a === void 0 ? void 0 : _a.id);
                        return [4 /*yield*/, ListService.getLists(userId, this.session_id)];
                    case 1:
                        lists = _c.sent();
                        movieStatus = [];
                        html = '<ul class="lists">';
                        if (!lists) return [3 /*break*/, 5];
                        _i = 0, lists_1 = lists;
                        _c.label = 2;
                    case 2:
                        if (!(_i < lists_1.length)) return [3 /*break*/, 5];
                        list = lists_1[_i];
                        return [4 /*yield*/, ListService.checkItemStatus(list.id, this.movieId)];
                    case 3:
                        status_1 = _c.sent();
                        movieStatus.push({ list_name: list.name, list_id: list.id, item_present: (_b = status_1 === null || status_1 === void 0 ? void 0 : status_1.item_present) !== null && _b !== void 0 ? _b : false });
                        html += "\n                    <li class='manage-lists-list-item'>\n                        <div class=".concat((status_1 === null || status_1 === void 0 ? void 0 : status_1.item_present) ? 'in-list' : '', ">\n                        ").concat((status_1 === null || status_1 === void 0 ? void 0 : status_1.item_present) ?
                            "<i class=\"fa-solid fa-check\"></i>" : "<i class=\"fa-solid fa-xmark\"></i>", " \n                        ").concat(list.name, "\n                        </div>\n                        <span>\n                        ").concat((status_1 === null || status_1 === void 0 ? void 0 : status_1.item_present) ?
                            "<i id=\"\"  data-list-id=\"".concat(list.id, "\" class=\"fa-solid fa-minus-circle remove-from-list-button\"></i>") : "<i id=\"\"  data-list-id=\"".concat(list.id, "\" class=\"fa-solid fa-plus-circle add-to-list-button\"></i>"), "\n                        </span>    \n                    </li>\n                ");
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        html += "</ul>";
                        this.modal.innerHTML = html;
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onLoad = function () {
            _this.container = document.getElementById("add-to-list-title-".concat(_this.id));
            _this.apiMessage = document.getElementById("api-message-".concat(_this.id));
            _this.modal = document.getElementById("manage-lists-modal-".concat(_this.id));
            _this.container.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                var addBtns, _loop_1, i, removeBtns, _loop_2, i;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.isOpen) {
                                this.modal.classList.add('hidden');
                                this.isOpen = false;
                                return [2 /*return*/];
                            }
                            this.modal.classList.remove('hidden');
                            this.isOpen = true;
                            return [4 /*yield*/, this.updateLists()];
                        case 1:
                            _a.sent();
                            addBtns = document.getElementsByClassName("add-to-list-button");
                            _loop_1 = function (i) {
                                var list = addBtns[i].dataset.listId;
                                addBtns[i].addEventListener('click', function (e) { return __awaiter(_this, void 0, void 0, function () {
                                    var resp;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                e.preventDefault();
                                                return [4 /*yield*/, ListService.addMovie(this.movieId, this.session_id, list)];
                                            case 1:
                                                resp = _a.sent();
                                                this.modal.classList.add('hidden');
                                                this.isOpen = false;
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            };
                            for (i = 0; i < addBtns.length; i++) {
                                _loop_1(i);
                            }
                            removeBtns = document.getElementsByClassName("remove-from-list-button");
                            _loop_2 = function (i) {
                                var list = removeBtns[i].dataset.listId;
                                removeBtns[i].addEventListener('click', function (e) { return __awaiter(_this, void 0, void 0, function () {
                                    var resp;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                e.preventDefault();
                                                return [4 /*yield*/, ListService.removeMovie(this.movieId, this.session_id, list)];
                                            case 1:
                                                resp = _a.sent();
                                                this.modal.classList.add('hidden');
                                                this.isOpen = false;
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            };
                            for (i = 0; i < removeBtns.length; i++) {
                                _loop_2(i);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        _this.setValues = function (movieId, value) {
            _this.movieId = movieId;
            _this.apiMessage.innerText = '';
            _this.apiMessage.classList.add('hidden');
            _this.modal.classList.add('hidden');
            _this.isOpen = false;
        };
        _this.user = appProps.user;
        _this.session_id = (_a = appProps.session_id) !== null && _a !== void 0 ? _a : '';
        _this.hideText = opt.hideText;
        _this.id = opt.id;
        return _this;
    }
    AddToList.prototype.startCountdown = function () {
        var _this = this;
        setTimeout(function () {
            _this.apiMessage.classList.add('hidden');
            _this.apiMessage.innerText = '';
        }, 3000);
    };
    AddToList.create = function (appProps, opt) {
        return new AddToList(appProps, opt);
    };
    return AddToList;
}(AbstractComponent));
export default AddToList;
//# sourceMappingURL=AddToList.js.map