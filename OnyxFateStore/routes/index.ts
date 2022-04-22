import express = require('express');
const router = express.Router();

import { makeQuery } from '../connection/createconnection';

let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true })); 

import { validation } from '../public/typescripts/checksign';

import { createSignUpDTO } from '../public/typescripts/logindto';

import cookies  from '../public/typescripts/cookiesengage';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM('/').window.document;

import { Authorize } from '../public/typescripts/authorization';

const jwt = require('jsonwebtoken');

router.get('/', (req: express.Request, res: express.Response) => {
    res.render('index', { title: 'Main Page', signedStatus: 'Sign Up'});
});

router.get('/login', (req: express.Request, res: express.Response) => {
    res.render('login', {title: 'Login Page'});
});

router.get('/model', (req: express.Request, res: express.Response) => {
    //Figure how to browse model#id
});

router.get('/profile', (req: express.Request, res: express.Response) => {
    //browse user profile
});

router.post('/signinform', (req: express.Request, res: express.Response) => {
    const authorization = new Authorize();
    authorization.makeQueryToCheck(req.body);
    setTimeout(function () {
        if (authorization.makeQueryToCheck(req.body)) {
            console.log(authorization.receivedCol);
            res.send('1');
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
