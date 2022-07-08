var CookieManager = /** @class */ (function () {
    function CookieManager() {
    }
    CookieManager.get = function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };
    CookieManager.set = function (_a) {
        var name = _a.name, value = _a.value, expiresIn = _a.expiresIn, _b = _a.path, path = _b === void 0 ? '/' : _b;
        var date = new Date();
        date.setTime(date.getTime() + expiresIn);
        var cookie = "".concat(name, "=").concat(value, "; expires=").concat(date.toUTCString(), "; path=").concat(path);
        document.cookie = cookie;
    };
    return CookieManager;
}());
export default CookieManager;
//# sourceMappingURL=CookieManager.js.map