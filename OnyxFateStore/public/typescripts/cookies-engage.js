"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookie = void 0;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM('/').window.document;
class Cookie {
    setCookie(name, val, res) {
        res.cookie(name, val, {
            //expires: new Date(Date.now() + 60 * 60) ,
            maxAge: 60 * 60 * 24,
            httpOnly: true,
            secure: true,
            path: '/'
        });
    }
    getAllCookie(req) {
        return req.headers.cookie;
    }
    getCookie(name, req) {
        return req.cookies;
    }
    deleteCookie(name, res) {
        res.clearCookie(name);
    }
}
exports.Cookie = Cookie;
let cookies = new Cookie();
exports.default = cookies;
//# sourceMappingURL=cookies-engage.js.map