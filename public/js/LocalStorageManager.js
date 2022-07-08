var LocalStorageManager = /** @class */ (function () {
    function LocalStorageManager() {
    }
    LocalStorageManager.save = function (key, data) {
        var item = LocalStorageManager.getKey(key);
        window.localStorage.setItem(item, JSON.stringify(data));
    };
    LocalStorageManager.getKey = function (key) {
        return "".concat(key, "@MovieApp");
    };
    LocalStorageManager.setUser = function (user) {
        LocalStorageManager.save('user', user);
    };
    LocalStorageManager.getUser = function () {
        return LocalStorageManager.get('user');
    };
    LocalStorageManager.setSuggestions = function (movies) {
        var data = { date: new Date(Date.now()), movies: movies };
        LocalStorageManager.save('suggestions', data);
    };
    LocalStorageManager.getSuggestions = function () {
        return LocalStorageManager.get('suggestions');
    };
    LocalStorageManager.get = function (key) {
        var item = LocalStorageManager.getKey(key);
        var data = window.localStorage.getItem(item);
        if (data) {
            return JSON.parse(data);
        }
        return;
    };
    return LocalStorageManager;
}());
export default LocalStorageManager;
//# sourceMappingURL=LocalStorageManager.js.map