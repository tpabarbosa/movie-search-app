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
import MoviePopup from "../components/MoviePopup.js";
import SearchBox from "../components/SearchBox.js";
import MoviesWithOverview from "../components/MoviesWithOverview.js";
import MovieService from "../../services/MovieService.js";
import { navigateTo } from "../../helpers/navigation.js";
var SearchPage = /** @class */ (function (_super) {
    __extends(SearchPage, _super);
    function SearchPage(props, movies) {
        var _this = _super.call(this, props) || this;
        _this.load = function () { return __awaiter(_this, void 0, void 0, function () {
            var html, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _d = "\n            <section id=\"search-page\" class=\"page-wrapper\">\n                <header class=\"content-header-wrapper\">\n                    ".concat;
                        return [4 /*yield*/, this.searchBox.load()];
                    case 1:
                        _e = (_c = _d.apply("\n            <section id=\"search-page\" class=\"page-wrapper\">\n                <header class=\"content-header-wrapper\">\n                    ", [_g.sent(), "\n                </header>\n                <div class=\"content-main-wrapper\">\n                    <h2>Resultados da busca por: \""]).concat(this.params.get('query'), "\"</h2>\n                    ")).concat;
                        return [4 /*yield*/, this.moviesBox.load()];
                    case 2:
                        _f = (_b = _e.apply(_c, [_g.sent(), "\n                </div>\n                "])).concat;
                        return [4 /*yield*/, this.moviesPopUp.load()];
                    case 3:
                        html = _f.apply(_b, [_g.sent(), "\n            </section>\n        "]);
                        return [2 /*return*/, html];
                }
            });
        }); };
        _this.onLoad = function () {
            _this.searchBox.onLoad();
            _this.moviesBox.onLoad();
            _this.moviesPopUp.onLoad();
        };
        _this.searchBox = SearchBox.create();
        _this.moviesBox = MoviesWithOverview.create(movies);
        _this.moviesPopUp = MoviePopup.create(props);
        return _this;
    }
    var _a;
    _a = SearchPage;
    SearchPage.create = function (props) { return __awaiter(void 0, void 0, void 0, function () {
        var query, movies;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!props.query_params.has('query')) {
                        navigateTo("/");
                        return [2 /*return*/];
                    }
                    query = props.query_params.get('query');
                    return [4 /*yield*/, MovieService.searchMovies(query)];
                case 1:
                    movies = _b.sent();
                    return [2 /*return*/, new SearchPage(props, movies)];
            }
        });
    }); };
    return SearchPage;
}(AbstractPage));
export default SearchPage;
//# sourceMappingURL=SearchPage.js.map