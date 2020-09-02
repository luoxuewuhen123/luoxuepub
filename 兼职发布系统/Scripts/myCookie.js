var myCookie = {
    setCookie: function (name, value, time, path) {
        document.cookie = name + '=' + value + ';Max-Age=' + time + ';path=' + path;
        return this;
    },

    getCookie: function (name, callback) {
        var allCookieArr = document.cookie.split('; ');
        var len = allCookieArr.length;
        for (var i = 0; i < len; i++) {
            var itemCookie = allCookieArr[i].split('=');
            if(name == itemCookie[0]) {
                callback(itemCookie[1]);
                return this;
            }
            callback(undefined);
            return this;
        }
    },

    removeCookie : function(name) {
        return this.setCookie(name, '', -1, '/');
    }
}