import express = require('express');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM('/').window.document;



export class Cookie {
    setCookie(name: any, val: any, res: express.Response) {
        res.cookie(name, val, {
            //expires: new Date(Date.now() + 60 * 60) ,
            maxAge: 60 * 60 * 24, 
            httpOnly: true,
            secure: true,
            path: '/'
        });
    }

    getAllCookie(req: express.Request) {
        return req.headers.cookie;
    }

    getCookie(name: any, req: express.Request) {
        return req.cookies;
    }

    deleteCookie(name: any, res: express.Response) {
        res.clearCookie(name);
    }
}

let cookies = new Cookie();

export default cookies
