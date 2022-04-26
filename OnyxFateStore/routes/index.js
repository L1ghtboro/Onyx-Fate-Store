"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const createconnection_1 = require("../connection/createconnection");
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
const checksign_1 = require("../public/typescripts/checksign");
const logindto_1 = require("../public/typescripts/logindto");
const cookiesengage_1 = require("../public/typescripts/cookiesengage");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM('/').window.document;
const authorization_1 = require("../public/typescripts/authorization");
const jwt = require('jsonwebtoken');
let user_token = null;
router.get('/', (req, res) => {
    if (user_token === null)
        res.render('index', {
            title: 'Main Page', signedStatus: 'Sign Up', signedText: 'Sign Up', signURL: '/login'
        });
    else
        res.render('index', {
            title: 'Main Page', signedStatus: 'Signed In', signedText: '', signURL: '/profile'
        });
});
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});
router.get('/model', (req, res) => {
    //Figure how to browse model#id
});
router.get('/profile', (req, res) => {
    res.send('Profile page');
});
router.post('/signinform', (req, res) => {
    const authorization = new authorization_1.Authorize();
    authorization.makeQueryToCheck(req.body);
    setTimeout(function () {
        if (authorization.makeQueryToCheck(req.body)) {
            let loginData = {
                userID: authorization.receivedCol[0].value,
                userLogin: authorization.receivedCol[1].value,
                userPassword: authorization.receivedCol[2].value,
                userName: authorization.receivedCol[3].value,
                userLastname: authorization.receivedCol[4].value,
                userEmail: authorization.receivedCol[5].value,
                userPic: authorization.receivedCol[6].value,
                userRole: authorization.receivedCol[7].value
            };
            (0, logindto_1.cryptSignInDTO)(req.body, loginData.userLogin);
            if (loginData.userPassword === req.body.userPasswordLogin) {
                user_token = authorization.createJwt(req.body);
                cookiesengage_1.default.setCookie(loginData.userLogin, user_token, res);
                res.redirect('/');
            }
            else {
                res.render('error', {
                    message: 'You may entered a non existing login or email',
                    error: 'If you forgot password'
                });
            }
        }
        else {
            res.send('2');
        }
    }, 3000);
});
router.post('/signupform', (req, res) => {
    (0, checksign_1.validation)(req.body);
    setTimeout(function () {
        if ((0, checksign_1.validation)(req.body)) {
            req.body = (0, logindto_1.createSignUpDTO)(req.body);
            req.body.userRole = 'User';
            (0, createconnection_1.makeQuery)(`INSERT INTO LoginInfo(user_login, user_email, user_password, user_name, user_lastname, user_role) 
            VALUES('${req.body.userLogin}', '${req.body.userEmail}', '${req.body.userPassword}', '${req.body.userName}', '${req.body.userLastname}', '${req.body.userRole}'); `, (err) => {
                if (err)
                    console.error(err);
                console.log('Data Inserted - new user ' + req.body.userLogin);
            });
            //Up here we need to stay logged 
            res.redirect('/');
        }
        else {
            res.render('error', {
                message: 'You may entered an existing login or email',
                error: 'An error occurred'
            });
        }
    }, 3000);
});
exports.default = router;
function alert(arg0) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=index.js.map