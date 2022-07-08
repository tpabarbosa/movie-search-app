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
import { AbstractComponent } from "../../interfaces.js";
var RatingStars = /** @class */ (function (_super) {
    __extends(RatingStars, _super);
    function RatingStars() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.load = function () {
            var html = "\n            <div id=\"rating-starts\" class=\"hidden\">\n            <fieldset class=\"rate\">\n                <input type=\"radio\" id=\"rating10\" name=\"rating\" value=\"10\" /><label for=\"rating10\" title=\"5 stars\"></label>\n                <input type=\"radio\" id=\"rating9\" name=\"rating\" value=\"9\" /><label class=\"half\" for=\"rating9\" title=\"4 1/2 stars\"></label>\n                <input type=\"radio\" id=\"rating8\" name=\"rating\" value=\"8\" /><label for=\"rating8\" title=\"4 stars\"></label>\n                <input type=\"radio\" id=\"rating7\" name=\"rating\" value=\"7\" /><label class=\"half\" for=\"rating7\" title=\"3 1/2 stars\"></label>\n                <input type=\"radio\" id=\"rating6\" name=\"rating\" value=\"6\" /><label for=\"rating6\" title=\"3 stars\"></label>\n                <input type=\"radio\" id=\"rating5\" name=\"rating\" value=\"5\" /><label class=\"half\" for=\"rating5\" title=\"2 1/2 stars\"></label>\n                <input type=\"radio\" id=\"rating4\" name=\"rating\" value=\"4\" /><label for=\"rating4\" title=\"2 stars\"></label>\n                <input type=\"radio\" id=\"rating3\" name=\"rating\" value=\"3\" /><label class=\"half\" for=\"rating3\" title=\"1 1/2 stars\"></label>\n                <input type=\"radio\" id=\"rating2\" name=\"rating\" value=\"2\" /><label for=\"rating2\" title=\"1 star\"></label>\n                <input type=\"radio\" id=\"rating1\" name=\"rating\" value=\"1\" /><label class=\"half\" for=\"rating1\" title=\"1/2 star\"></label>\n            </fieldset>\n            </div>\n        ";
            return html;
        };
        _this.onLoad = function () {
            _this.container = document.getElementById('rating-starts');
        };
        _this.setRate = function (rated) {
        };
        _this.open = function () {
            _this.container.classList.remove('hidden');
        };
        return _this;
    }
    RatingStars.create = function () {
        return new RatingStars();
    };
    return RatingStars;
}(AbstractComponent));
export default RatingStars;
//# sourceMappingURL=RatingStarts.js.map