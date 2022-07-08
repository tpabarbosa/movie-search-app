var createImage = function (_a, options) {
    var src = _a.src, alt = _a.alt;
    var image = createElement('img', options);
    image.setAttribute('src', src);
    image.setAttribute('alt', alt);
    return image;
};
var createAnchor = function (href, options) {
    var anchor = createElement('a', options);
    anchor.setAttribute('href', href);
    return anchor;
};
var createInput = function (_a, options) {
    var type = _a.type, placeholder = _a.placeholder;
    var input = createElement('input', options);
    if (placeholder) {
        input.setAttribute('placeholder', placeholder);
    }
    if (type) {
        input.setAttribute('type', type);
    }
    return input;
};
var createElement = function (tag, options) {
    var element = document.createElement(tag);
    if (options === null || options === void 0 ? void 0 : options.id) {
        element.setAttribute('id', options.id);
    }
    if (options === null || options === void 0 ? void 0 : options.className) {
        if (typeof options.className === 'string') {
            element.classList.add(options.className);
        }
        else {
            options.className.forEach(function (className) {
                className && element.classList.add(className);
            });
        }
    }
    if (options === null || options === void 0 ? void 0 : options.innerHTML) {
        element.innerHTML = options.innerHTML;
    }
    if (options === null || options === void 0 ? void 0 : options.disabled) {
        element.setAttribute('disabled', options.disabled.toString());
    }
    return element;
};
export { createElement, createInput, createAnchor, createImage };
//# sourceMappingURL=DOMHelper.js.map