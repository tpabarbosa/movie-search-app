import CookieManager from "../../CookieManager.js";
import { createElement } from "../../helpers/DOMHelper.js";
var LayoutHeader = function () {
    // const body = document.getElementsByTagName('body')[0];
    var header = createElement('header', { className: 'layout-header' });
    var session = CookieManager.get('session_id');
    var link = '';
    if (!session) {
        link = "<a href=\"/?show=login\" class='right-button'>Login</a>";
    }
    else {
        link = "<a href=\"/?show=user\" class='right-button'>Minha P\u00E1gina</a>";
    }
    header.innerHTML = "\n        <div class=\"header-logos\">\n            <h1><a href=\"/\">Movie App</a></h1>\n            <a href=\"https://www.themoviedb.org/\"><img src=\"images/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg\" alt=\"TMDB logo\"></a>\n        </div>\n        ".concat(link, "\n    ");
    // body.prepend(header);
    return header;
};
export default Header;
//# sourceMappingURL=Header.js.map