"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCookie = exports.getCookie = exports.setCookie = void 0;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM('/').window.document;
function setCookie(name, val, res) {
    res.cookie(name, val, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true
    });
}
exports.setCookie = setCookie;
function getCookie(name, req) {
    return req.cookies;
}
exports.getCookie = getCookie;
function deleteCookie(name, res) {
    res.clearCookie(name);
}
exports.deleteCookie = deleteCookie;
//# sourceMappingURL=cookiesengage.js.map