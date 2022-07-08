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
import { navigateTo } from "../../helpers/navigation.js";
import { AbstractComponent } from "../../interfaces.js";
var SearchBox = /** @class */ (function (_super) {
    __extends(SearchBox, _super);
    function SearchBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.load = function () {
            var html = "\n            <div class=\"box flex-container rounded\">\n                <input type=\"text\" placeholder=\"Escreva...\" class=\"input\" id=\"search-input\"/>\n                <button class=\"button\" id=\"search-button\" disabled>\n                    Buscar\n                </button>\n            </div>\n        ";
            return html;
        };
        _this.onLoad = function () {
            _this.searchButton = document.getElementById('search-button');
            _this.searchInput = document.getElementById('search-input');
            _this.searchButton.addEventListener('click', function () {
                var search = _this.searchInput.value;
                if (search) {
                    navigateTo("?show=search&query=".concat(search));
                }
            });
            _this.searchInput.addEventListener('input', function () {
                if (_this.searchInput.value) {
                    _this.searchButton.disabled = false;
                }
                else {
                    _this.searchButton.disabled = true;
                }
            });
        };
        return _this;
    }
    SearchBox.create = function () {
        return new SearchBox();
    };
    return SearchBox;
}(AbstractComponent));
export default SearchBox;
//# sourceMappingURL=SearchBox.js.map