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
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal(innerComponent, id, onClose) {
        var _this = _super.call(this) || this;
        _this.id = '';
        _this.onClose = function () { };
        _this.body = document.getElementsByTagName('body')[0];
        _this.scroll = 0;
        _this.load = function () {
            var html = "\n            <aside id=\"".concat(_this.id, "-modal\" class=\"modal-wrapper hidden\">\n                <div id=\"").concat(_this.id, "-modal-background\" class=\"modal-background\"></div>\n                <div id=\"").concat(_this.id, "-modal-content\" class=\"modal-content\">\n                    ").concat(_this.innerComponent, "\n                </div>\n            </aside>\n        ");
            return html;
        };
        _this.onLoad = function () {
            _this.container = document.getElementById("".concat(_this.id, "-modal"));
            _this.background = document.getElementById("".concat(_this.id, "-modal-background"));
            _this.content = document.getElementById("".concat(_this.id, "-modal-content"));
            _this.background.addEventListener('click', _this.close);
        };
        _this.open = function (e) {
            _this.container.classList.remove('hidden');
            _this.scroll = window.scrollY;
            _this.body.style.top = -_this.scroll + 'px';
            _this.lockScroll(_this.body);
            if (e) {
                var x = e.clientX - _this.content.clientLeft - _this.content.clientWidth;
                var y = e.clientY - _this.content.clientTop;
                _this.content.style.top = y + 160 + _this.content.clientHeight < window.innerHeight ? y + 'px' : window.innerHeight - _this.content.clientHeight - 160 + 'px';
                _this.content.style.left = x > 0 ? x + 'px' : 0 + 'px';
            }
        };
        _this.close = function (e) {
            _this.container.classList.add('hidden');
            _this.body.classList.remove('no-scroll');
            window.scroll(0, _this.scroll);
            _this.scroll = 0;
            _this.onClose(e);
        };
        _this.lockScroll = function (body) {
            if (document.documentElement.scrollHeight > window.innerHeight) {
                body.classList.add('no-scroll');
            }
        };
        _this.innerComponent = innerComponent;
        _this.id = id;
        _this.onClose = onClose;
        return _this;
    }
    return Modal;
}(AbstractComponent));
export default Modal;
//# sourceMappingURL=Modal.js.map