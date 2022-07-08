var createElement = function (_a) {
    var tag = _a.tag, id = _a.id, className = _a.className, innerHTML = _a.innerHTML;
    var element = document.createElement(tag);
    if (id) {
        element.setAttribute('id', id);
    }
    if (className) {
        if (typeof className === 'string') {
            element.classList.add(className);
        }
        else {
            element.classList.add(className.join());
        }
    }
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    return element;
};
export { createElement };
//# sourceMappingURL=domHelper.js.map