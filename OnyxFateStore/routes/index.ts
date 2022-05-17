import express = require('express');
const router = express.Router();

import { makeQuery } from '../connection/createconnection';

let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true })); 

import { validation } from '../public/typescripts/check-sign';

import { createSignUpDTO, decrypSignInDTO, cryptSignInDTO } from '../public/typescripts/login-dto';

import cookies from '../public/typescripts/cookies-engage';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM('/').window.document;

import { Authorize } from '../public/typescripts/authorization';

const jwt = require('jsonwebtoken');
let currentUser = null;

router.get('/', (req: express.Request, res: express.Response) => {
    if (currentUser === null) {
        res.render('index', {
            title: 'Main Page', signedStatus: 'Sign Up', signedText: 'Sign Up', signURL: '/login'
        });
    }
    else {
        console.log(currentUser);
        res.render('index', {
            title: 'Main Page', signedStatus: 'Signed In', signedText: '', signURL: '/profile'
        });
    }
});

router.get('/login', (req: express.Request, res: express.Response) => {
    res.render('login', { title: 'Login Page' });
  
});

router.get('/model', (req: express.Request, res: express.Response) => {
    res.render('model-page', { title: 'Model Page', model: "undefined" });
});

router.get('/profile', (req: express.Request, res: express.Response) => {
    res.send('Profile page');
});

router.post('/signinform', (req: express.Request, res: express.Response) => {
    const authorization = new Authorize();
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
            cryptSignInDTO(req.body, loginData.userLogin);
            if (loginData.userPassword === req.body.userPasswordLogin) {
                //user_token = authorization.createJwt(req.body);
                currentUser = loginData.userLogin
                cookies.setCookie(loginData.userLogin, authorization.createJwt(req.body), res);
                res.redirect('/');
            } else {
                res.render('error', {
                    message: 'You may entered a non existing login or email',
                    error: 'If you forgot password'
                });
            }
        } else {
            res.send('2');
        }
    }, 3000)
});

router.post('/signupform', (req, res) => {

    validation(req.body)

    setTimeout(function () {
        if (validation(req.body)) {
            req.body = createSignUpDTO(req.body);
            req.body.userRole = 'User';

            makeQuery(`INSERT INTO LoginInfo(user_login, user_email, user_password, user_name, user_lastname, user_role) 
            VALUES('${req.body.userLogin}', '${req.body.userEmail}', '${req.body.userPassword}', '${req.body.userName}', '${req.body.userLastname}', '${req.body.userRole}'); `, (err: any) => {
                if (err)
                    console.error(err);
                console.log('Data Inserted - new user ' + req.body.userLogin);
            });

            //Up here we need to stay logged 

            res.redirect('/');
        } else {
            res.render('error', {
                message: 'You may entered an existing login or email',
                error: 'An error occurred'
            });
        }
    }, 3000);
});

export default router;

function alert(arg0: string): any {
    throw new Error('Function not implemented.');
}
