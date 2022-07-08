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
import MovieService from "../../services/MovieService.js";
var AddToWatchlist = /** @class */ (function (_super) {
    __extends(AddToWatchlist, _super);
    function AddToWatchlist(appProps, opt) {
        var _this = this;
        var _a;
        _this = _super.call(this) || this;
        _this.session_id = '';
        _this.watchlist = false;
        _this.id = '';
        _this.load = function () {
            var html = "\n            <div id=\"add-to-watchlist-".concat(_this.id, "\" class=\"add-to-watchlist\">\n                \n            </div>\n            \n        ");
            return html;
        };
        _this.onLoad = function () {
            _this.container = document.getElementById("add-to-watchlist-".concat(_this.id));
            _this.apiMessage = document.getElementById("api-message-".concat(_this.id));
            _this.container.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                var userId, resp;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            userId = String((_a = this.user) === null || _a === void 0 ? void 0 : _a.id);
                            return [4 /*yield*/, MovieService.addToWatchlist(userId, this.session_id, this.movieId, !this.watchlist)];
                        case 1:
                            resp = _b.sent();
                            if (resp && (resp.success === true)) {
                                this.setValues(this.movieId, !this.watchlist);
                                this.apiMessage.classList.remove('hidden');
                                this.apiMessage.innerText = 'Operação realizada com sucesso!';
                                this.startCountdown();
                            }
                            else {
                                this.apiMessage.classList.remove('hidden');
                                this.apiMessage.innerText = 'Erro ao realizar a operação!';
                                this.startCountdown();
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        _this.setValues = function (movieId, value) {
            _this.movieId = movieId;
            _this.watchlist = !!value;
            if (value) {
                _this.container.classList.add('added');
                _this.container.innerHTML = "\n                <span class=\"fa-stack\">\n                    <i class=\"fa-solid fa-bookmark fa-stack-2x\" style=\"color:blue\"></i>\n                    \n                </span>\n                ".concat(_this.hideText ? '' : "Remover dos interesses", "\n            ");
            }
            else {
                _this.container.classList.remove('added');
                _this.container.innerHTML = "\n                <span class=\"fa-stack\">\n                    <i class=\"fa-solid fa-bookmark fa-stack-2x\" style=\"color:gray\"></i>\n                    \n                </span>\n                ".concat(_this.hideText ? '' : "Adicionar os interesses", "\n            ");
            }
            _this.apiMessage.innerText = '';
            _this.apiMessage.classList.add('hidden');
        };
        _this.user = appProps.user;
        _this.session_id = (_a = appProps.session_id) !== null && _a !== void 0 ? _a : '';
        _this.hideText = opt.hideText;
        _this.id = opt.id;
        return _this;
    }
    AddToWatchlist.prototype.startCountdown = function () {
        var _this = this;
        setTimeout(function () {
            _this.apiMessage.classList.add('hidden');
            _this.apiMessage.innerText = '';
        }, 3000);
    };
    AddToWatchlist.create = function (appProps, opt) {
        return new AddToWatchlist(appProps, opt);
    };
    return AddToWatchlist;
}(AbstractComponent));
export default AddToWatchlist;
//# sourceMappingURL=AddToWatchlist.js.map