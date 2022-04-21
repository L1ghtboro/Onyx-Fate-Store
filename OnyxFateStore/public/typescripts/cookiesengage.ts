import express = require('express');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM('/').window.document;



export class Cookie {
    setCookie(name: any, val: any, res: express.Response) {
        res.cookie(name, val, {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: true,
            path: '/'
        });
    }

    getCookie(name: any, req: express.Request) {
        return req.cookies;
    }

    deleteCookie(name: any, res: express.Response) {
        res.clearCookie(name);
    }
}

let Cookies = new Cookie();

export default Cookies
