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
var api_key = config.TMDB.API_KEY_V3;
var api_url = config.TMDB.API_URL;
var language = config.TMDB.LANGUAGE;
var ListService = /** @class */ (function () {
    function ListService() {
    }
    var _a;
    _a = ListService;
    ListService.getLists = function (account_id, session_id, page) {
        if (page === void 0) { page = 1; }
        return __awaiter(void 0, void 0, void 0, function () {
            var lists;
            return __generator(_a, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, HttpClient.request({
                            url: "".concat(api_url, "/account/").concat(account_id, "/lists"),
                            query: {
                                api_key: api_key,
                                language: language,
                                session_id: session_id,
                                page: page
                            },
                            method: Method.GET
                        })];
                    case 1:
                        lists = _b.sent();
                        if (!lists) {
                            return [2 /*return*/, lists];
                        }
                        return [2 /*return*/, lists.results];
                }
            });
        });
    };
    ListService.getListDetails = function (listId) { return __awaiter(void 0, void 0, void 0, function () {
        var movies;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, HttpClient.request({
                        url: "".concat(api_url, "/list/").concat(listId),
                        query: {
                            api_key: api_key,
                            language: language,
                        },
                        method: Method.GET
                    })];
                case 1:
                    movies = _b.sent();
                    if (!movies) {
                        return [2 /*return*/, movies];
                    }
                    return [2 /*return*/, movies.items];
            }
        });
    }); };
    ListService.checkItemStatus = function (listId, movie_id) { return __awaiter(void 0, void 0, void 0, function () {
        var status;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, HttpClient.request({
                        url: "".concat(api_url, "/list/").concat(listId, "/item_status"),
                        query: {
                            api_key: api_key,
                            movie_id: movie_id
                        },
                        method: Method.GET
                    })];
                case 1:
                    status = _b.sent();
                    return [2 /*return*/, status];
            }
        });
    }); };
    ListService.createList = function (session_id, list) { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, HttpClient.request({
                        url: "".concat(api_url, "/list"),
                        query: {
                            api_key: api_key,
                            session_id: session_id
                        },
                        body: {
                            name: list.name,
                            language: language,
                            description: list.description
                        },
                        method: Method.POST
                    })];
                case 1:
                    resp = _b.sent();
                    return [2 /*return*/, resp];
            }
        });
    }); };
    ListService.removeList = function (session_id, listId) { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, HttpClient.request({
                        url: "".concat(api_url, "/list/").concat(listId),
                        query: {
                            api_key: api_key,
                            session_id: session_id
                        },
                        method: Method.DELETE
                    })];
                case 1:
                    resp = _b.sent();
                    return [2 /*return*/, resp];
            }
        });
    }); };
    ListService.addMovie = function (media_id, session_id, listId) { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, HttpClient.request({
                        url: "".concat(api_url, "/list/").concat(listId, "/add_item"),
                        query: {
                            api_key: api_key,
                            session_id: session_id
                        },
                        body: {
                            media_id: media_id
                        },
                        method: Method.POST
                    })];
                case 1:
                    resp = _b.sent();
                    return [2 /*return*/, resp];
            }
        });
    }); };
    ListService.removeMovie = function (media_id, session_id, listId) { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, HttpClient.request({
                        url: "".concat(api_url, "/list/").concat(listId, "/remove_item"),
                        query: {
                            api_key: api_key,
                            session_id: session_id
                        },
                        body: {
                            media_id: media_id
                        },
                        method: Method.POST
                    })];
                case 1:
                    resp = _b.sent();
                    return [2 /*return*/, resp];
            }
        });
    }); };
    return ListService;
}());
export default ListService;
//# sourceMappingURL=ListService.js.map