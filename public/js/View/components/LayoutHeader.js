var LayoutHeader = function (_a) {
    var session_id = _a.session_id;
    var header = document.createElement('header');
    header.classList.add('layout-header');
    var menuButton = "";
    if (!session_id) {
        menuButton = "<a href=\"/?show=login\", class=\"button\"><i class=\"fa-solid fa-right-to-bracket\"></i></a>";
    }
    else {
        menuButton = "<a href=\"/?show=user\", class=\"button\"><i class=\"fa-solid fa-user\"></i></a>";
    }
    var innerHTML = "\n        <div>\n            <h1><a href=\"/\">Movie App</a></h1>\n            <a href=\"https://www.themoviedb.org/\"><img src=\"public/images/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg\" alt=\"TMDB logo\"></a>\n        </div>\n        ".concat(menuButton, "\n    ");
    header.innerHTML = innerHTML;
    return header;
};
export default LayoutHeader;
//# sourceMappingURL=LayoutHeader.js.map