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
var RatingStars = /** @class */ (function (_super) {
    __extends(RatingStars, _super);
    function RatingStars(id, session_id) {
        var _this = _super.call(this) || this;
        _this.id = '';
        _this.load = function () {
            var html = "\n            <div id=\"rating-stars-".concat(_this.id, "\" class=\"rating-stars\" class=\"hidden\">\n                <span class=\"remove-rate hidden\"  id=\"remove-rate-").concat(_this.id, "\">\n                    <span class=\"fa-stack\">\n                        <i class=\"fa-solid fa-star fa-stack-2x\"></i>\n                        <i class=\"fa-solid fa-slash fa-stack-2x\" style=\"color:Tomato\"></i>\n                    </span>\n                </span>\n                <fieldset class=\"rate rate-").concat(_this.id, "\">\n                    <input type=\"radio\" id=\"rating10-").concat(_this.id, "\" name=\"rating-").concat(_this.id, "\" value=\"10\" /><label for=\"rating10-").concat(_this.id, "\" title=\"5 stars\"></label>\n                    <input type=\"radio\" id=\"rating9-").concat(_this.id, "\" name=\"rating-").concat(_this.id, "\" value=\"9\" /><label class=\"half\" for=\"rating9-").concat(_this.id, "\" title=\"4 1/2 stars\"></label>\n                    <input type=\"radio\" id=\"rating8-").concat(_this.id, "\" name=\"rating-").concat(_this.id, "\" value=\"8\" /><label for=\"rating8-").concat(_this.id, "\" title=\"4 stars\"></label>\n                    <input type=\"radio\" id=\"rating7-").concat(_this.id, "\" name=\"rating-").concat(_this.id, "\" value=\"7\" /><label class=\"half\" for=\"rating7-").concat(_this.id, "\" title=\"3 1/2 stars\"></label>\n                    <input type=\"radio\" id=\"rating6-").concat(_this.id, "\" name=\"rating-").concat(_this.id, "\" value=\"6\" /><label for=\"rating6-").concat(_this.id, "\" title=\"3 stars\"></label>\n                    <input type=\"radio\" id=\"rating5-").concat(_this.id, "\" name=\"rating-").concat(_this.id, "\" value=\"5\" /><label class=\"half\" for=\"rating5-").concat(_this.id, "\" title=\"2 1/2 stars\"></label>\n                    <input type=\"radio\" id=\"rating4-").concat(_this.id, "\" name=\"rating-").concat(_this.id, "\" value=\"4\" /><label for=\"rating4-").concat(_this.id, "\" title=\"2 stars\"></label>\n                    <input type=\"radio\" id=\"rating3-").concat(_this.id, "\" name=\"rating-").concat(_this.id, "\" value=\"3\" /><label class=\"half\" for=\"rating3-").concat(_this.id, "\" title=\"1 1/2 stars\"></label>\n                    <input type=\"radio\" id=\"rating2-").concat(_this.id, "\" name=\"rating-").concat(_this.id, "\" value=\"2\" /><label for=\"rating2-").concat(_this.id, "\" title=\"1 star\"></label>\n                    <input type=\"radio\" id=\"rating1-").concat(_this.id, "\" name=\"rating-").concat(_this.id, "\" value=\"1\" /><label class=\"half\" for=\"rating1-").concat(_this.id, "\" title=\"1/2 star\"></label>\n\n                </fieldset>\n                \n                \n            </div>\n            \n        ");
            return html;
        };
        _this.onLoad = function () {
            _this.inputs = document.querySelectorAll(".rate-".concat(_this.id, " input[type=\"radio\"]"));
            _this.removeRate = document.getElementById("remove-rate-".concat(_this.id));
            _this.apiMessage = document.getElementById("api-message-".concat(_this.id));
            _this.removeRate.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                var resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, MovieService.deleteRateMovie(this.movieId, this.session_id)];
                        case 1:
                            resp = _a.sent();
                            if (resp && resp.status_code === 13) {
                                this.setValues(this.movieId, false);
                                this.apiMessage.classList.remove('hidden');
                                this.apiMessage.innerText = 'Avaliação apagada com sucesso!';
                                this.startCountdown();
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            var _loop_1 = function (i) {
                _this.inputs[i].addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                    var input, resp;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                input = this.inputs[i];
                                return [4 /*yield*/, MovieService.rateMovie(this.movieId, this.session_id, input.value)];
                            case 1:
                                resp = _a.sent();
                                if (resp && (resp.status_code === 1 || resp.status_code === 12)) {
                                    this.apiMessage.classList.remove('hidden');
                                    this.apiMessage.innerText = 'Avaliação salva com sucesso!';
                                    this.startCountdown();
                                    this.setValues(this.movieId, { value: parseInt(input.value) });
                                }
                                this.removeRate.classList.remove('hidden');
                                return [2 /*return*/];
                        }
                    });
                }); });
            };
            for (var i = 0; i < _this.inputs.length; i++) {
                _loop_1(i);
            }
        };
        _this.setValues = function (movieId, value) {
            _this.movieId = movieId;
            _this.apiMessage.innerText = '';
            _this.apiMessage.classList.add('hidden');
            if (typeof value !== 'boolean') {
                var v = value.value;
                var input = _this.inputs[10 - v];
                input.checked = true;
                _this.removeRate.classList.remove('hidden');
            }
            else {
                for (var i = 0; i < _this.inputs.length; i++) {
                    var input = _this.inputs[i];
                    input.checked = false;
                    input.dataset.movieId = movieId;
                }
                _this.removeRate.classList.add('hidden');
            }
        };
        _this.session_id = session_id !== null && session_id !== void 0 ? session_id : '';
        _this.id = id;
        return _this;
    }
    RatingStars.prototype.startCountdown = function () {
        var _this = this;
        setTimeout(function () {
            _this.apiMessage.classList.add('hidden');
            _this.apiMessage.innerText = '';
        }, 3000);
    };
    RatingStars.create = function (id, session_id) {
        return new RatingStars(id, session_id);
    };
    return RatingStars;
}(AbstractComponent));
export default RatingStars;
//# sourceMappingURL=RatingStars.js.map