export var oneDay = 1000 * 60 * 60 * 24;
export var isDateOlderThan = function (date, elapsaded) {
    return new Date().getTime() - elapsaded > new Date(date).getTime();
};
export var yMMd = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
export var dateToLocal = function (date, format) {
    return new Date(date).toLocaleDateString('pt-BR', format);
};
export var convertMinutesToHours = function (min) {
    var hours = Math.floor(min / 60);
    var minutes = min % 60;
    return { hours: hours, minutes: minutes };
};
//# sourceMappingURL=dateHelper.js.map