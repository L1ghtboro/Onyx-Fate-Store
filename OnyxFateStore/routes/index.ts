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

import { authorization } from '../public/typescripts/authorization';

const jwt = require('jsonwebtoken');
let currentUser = {
    userLogin: null,
    userImage: null
};

router.get('/', (req: express.Request, res: express.Response) => {
    if (currentUser.userLogin === null) {
        res.render('index', {
            title: 'Main Page', signedStatus: 'Sign Up', signedText: 'Sign Up', signURL: '/login'
        });
    }
    else {
        res.render('index', {
            title: 'Main Page', signedStatus: 'Signed In', signedText: '', signURL: '/profile', userImg: currentUser.userImage
        });
    }
});

router.get('/login', (req: express.Request, res: express.Response) => {
    res.render('login', { title: 'Login Page' });
  
});

router.get('/model', (req: express.Request, res: express.Response) => {
    if (currentUser.userLogin === null) {
        res.render('model-page', {
            title: 'Model Page', signedStatus: 'Sign Up', signedText: 'Sign Up', signURL: '/login', model: "undefined"
        });
    }
    else {
        res.render('model-page', {
            title: 'Model Page', signedStatus: 'Signed In', signedText: '', signURL: '/profile', userImg: currentUser.userImage, model: "undefined"
        });
    }
});

router.get('/profile', (req: express.Request, res: express.Response) => {
    if (currentUser.userLogin === null) {
        res.render('error', {
            message: 'To enter this page you must be logged in',
            error: 'Access denied, not enough permissions'
        });
    }
    else {
        res.render('profile-page', {
            title: 'Profle Page', signedStatus: 'Signed In', signedText: '', signURL: '/profile', userImg: currentUser.userImage
        });
    }
});

router.get('/logout', (req: express.Request, res: express.Response) => {
    res.clearCookie(currentUser.userLogin);
    currentUser = null;
    res.redirect('/');
});

router.post('/signinform', (req: express.Request, res: express.Response) => {
    
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
                currentUser.userLogin = loginData.userLogin;
                currentUser.userImage = loginData.userPic;
                cookies.setCookie(loginData.userLogin, authorization.createJwt(req.body), res);
                res.redirect('/');
            } else {
                res.render('error', {
                    message: 'You may entered a non existing login or email',
                    error: 'Login check failed, data doesn\'t match'
                });
            }
        } else {
            res.render('error', {
                message: 'Error in input data',
                error: 'Login incompleted form'
            });
        }
    }, 3000)
});

router.post('/signupform', (req, res) => {

    validation(req.body)

    setTimeout(function () {
        if (validation(req.body)) {
            req.body = createSignUpDTO(req.body);
            req.body.userRole = 'User';

            makeQuery(`INSERT INTO LoginInfo(user_login, user_email, user_password, user_name, user_lastname, user_picture, user_role) 
            VALUES('${req.body.userLogin}', '${req.body.userEmail}', '${req.body.userPassword}', '${req.body.userName}', '${req.body.userLastname}', '\https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w'\,'${req.body.userRole}'); `, (err: any) => {
                if (err)
                    console.error(err);
                console.log('Data Inserted - new user ' + req.body.userLogin);
            });

            currentUser.userLogin = req.body.userLogin;
            currentUser.userImage = 'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w';
            cookies.setCookie(req.body.userLogin, authorization.createJwt(req.body), res);

            //sessionStorage.setItem('Profile Picture', 'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w');

            res.redirect('/');
        } else {
            res.render('error', {
                message: 'You may entered an existing login or email',
                error: 'This user already exists'
            });
        }
    }, 3000);
});

router.post('/profilepicture', (req: express.Request, res: express.Response) => {
    makeQuery(`SELECT user_picture FROM LoginInfo
                UPDATE LoginInfo SET user_picture = '${req.body.pictureurl}'
                WHERE user_login = '${currentUser.userLogin}'`, (err: any) => {
        if (err)
            console.error(err);
        console.log('Image changed for' + currentUser.userLogin);
    });

    currentUser.userImage = req.body.pictureurl;

    res.redirect('/profile')
});

export default router;

function alert(arg0: string): any {
    throw new Error('Function not implemented.');
}
