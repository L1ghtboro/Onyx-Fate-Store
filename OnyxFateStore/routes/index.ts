//Auto deploy ?

import express = require('express');
const router = express.Router();

let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true })); 

import { validation } from '../public/typescripts/check-sign';

import { createSignUpDTO, decrypSignInDTO, cryptSignInDTO } from '../public/typescripts/login-dto';

import cookies from '../public/typescripts/cookies-engage';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM('/').window.document;

import { authorization } from '../public/typescripts/authorization';

import { OnyxQuery } from '../public/typescripts/onyx-queries';

import { OnyxBlob } from '../connection/blob-connection'

const onyx = new OnyxQuery();

const jwt = require('jsonwebtoken');

let currentUser = { //goes into header or cookies
    userLogin: null,
    userImage: null
};

let DEFAULT_ROLE = 'User';

const onyxBlob = new OnyxBlob();

let upd: {
   metadata: { reviewer: 'Artem', reviewDate: '2022-07-06' },
   tags: {project: 'onyxfate', owner: 'accounts-payable'}
 }

let makeBlobConnection = onyxBlob.blobAccountConnect('onyxfateassets');

router.get('/', (req: express.Request, res: express.Response) => {
    onyx.queryToTakePackages();
    setTimeout(function () {
        onyx.queryToTakePackages();
        if (currentUser.userLogin === null) {
            res.render('index', {
                title: 'Main Page', signedStatus: 'Sign Up', signedText: 'Sign Up', signURL: '/login',
                name1: onyx.receivedCol[0].model_name, pic1: onyx.receivedCol[0].model_picture, price1: onyx.receivedCol[0].model_price, modelLink1: 'model',
                name2: onyx.receivedCol[1].model_name, pic2: onyx.receivedCol[1].model_picture, price2: onyx.receivedCol[1].model_price, modelLink2: 'model',
                name3: onyx.receivedCol[2].model_name, pic3: onyx.receivedCol[2].model_picture, price3: onyx.receivedCol[2].model_price, modelLink3: 'model',
                name4: onyx.receivedCol[3].model_name, pic4: onyx.receivedCol[3].model_picture, price4: onyx.receivedCol[3].model_price, modelLink4: 'model',
                name5: onyx.receivedCol[4].model_name, pic5: onyx.receivedCol[4].model_picture, price5: onyx.receivedCol[4].model_price, modelLink5: 'model',
                name6: onyx.receivedCol[5].model_name, pic6: onyx.receivedCol[5].model_picture, price6: onyx.receivedCol[5].model_price, modelLink6: 'model'
            });
        }
        else {
            res.render('index', {
                title: 'Main Page', signedStatus: 'Signed In', signedText: '', signURL: '/profile', userImg: currentUser.userImage,
                name1: onyx.receivedCol[0].model_name, pic1: onyx.receivedCol[0].model_picture, price1: onyx.receivedCol[0].model_price, modelLink1: 'model' + onyx.receivedCol[0].model_id,
                name2: onyx.receivedCol[1].model_name, pic2: onyx.receivedCol[1].model_picture, price2: onyx.receivedCol[1].model_price, modelLink2: 'model' + onyx.receivedCol[1].model_id,
                name3: onyx.receivedCol[2].model_name, pic3: onyx.receivedCol[2].model_picture, price3: onyx.receivedCol[2].model_price, modelLink3: 'model' + onyx.receivedCol[2].model_id,
                name4: onyx.receivedCol[3].model_name, pic4: onyx.receivedCol[3].model_picture, price4: onyx.receivedCol[3].model_price, modelLink4: 'model' + onyx.receivedCol[3].model_id,
                name5: onyx.receivedCol[4].model_name, pic5: onyx.receivedCol[4].model_picture, price5: onyx.receivedCol[4].model_price, modelLink5: 'model' + onyx.receivedCol[4].model_id,
                name6: onyx.receivedCol[5].model_name, pic6: onyx.receivedCol[5].model_picture, price6: onyx.receivedCol[5].model_price, modelLink6: 'model' + onyx.receivedCol[5].model_id
            });
        }
    }, 3000);

});

router.get('/login', (req: express.Request, res: express.Response) => {
    res.render('login', { title: 'Login Page' });
});

router.get('/uploader', (req: express.Request, res: express.Response) => {
    if (DEFAULT_ROLE === 'Artist') {
        res.render('upload-page', {
            title: 'Upload Page', signedStatus: 'Signed In', signedText: '', signURL: '/profile', userImg: currentUser.userImage, model: "undefined"
        });    
    } else {
        res.render('error', {
            message: 'To enter this page you must be logged in',
            error: 'Access denied, not enough permissions'
        });        
    }
});

router.post('/uploadform', (req: express.Request, res: express.Response) => {
    onyx.queryToAddToQueue(req.body, currentUser.userLogin);
    res.redirect('/profile');
});

router.get('/model', (req: express.Request, res: express.Response) => {
    onyx.queryToGetGrave();
    setTimeout(function () {
        onyx.queryToGetGrave();
        console.log(onyx.recieveData);
        if (currentUser.userLogin === null) {
            res.render('model-page', {
                title: 'Model Page', signedStatus: 'Sign Up', signedText: 'Sign Up', signURL: '/login', model: onyx.recieveData.model_package, model_desc: onyx.recieveData.model_description, model_price: onyx.recieveData.model_price, model_name: onyx.recieveData.model_name
            });
        }
        else {
            res.render('model-page', {
                title: 'Model Page', signedStatus: 'Signed In', signedText: '', signURL: '/profile', userImg: currentUser.userImage, model: onyx.recieveData.model_package, model_desc: onyx.recieveData.model_description, model_price: onyx.recieveData.model_price, model_name: onyx.recieveData.model_name
            });
        }
    }, 3000);
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
            title: 'Profle Page', signedStatus: 'Signed In', signedText: '', signURL: '/profile', userImg: currentUser.userImage, userRole: DEFAULT_ROLE
        });
    }
});

router.get('/history', (req: express.Request, res: express.Response) => {
    if (currentUser.userLogin !== null) {
        onyx.queryToTakehistory(currentUser.userLogin);
    }
    setTimeout(function () {
        onyx.queryToTakehistory(currentUser.userLogin);
        if (currentUser.userLogin === null) {
            res.render('error', {
                message: 'To enter this page you must be logged in',
                error: 'Access denied, not enough permissions'
            });
        }
        else {
            res.render('history-page', {
                title: 'History Page', signedStatus: 'Signed In', signedText: '', signURL: '/profile', userImg: currentUser.userImage, historyData: onyx.historyData
            });
        }
    }, 3000);
});

router.get('/income', (req: express.Request, res: express.Response) => {
    if (currentUser.userLogin !== null && DEFAULT_ROLE==='Artist') {
        onyx.queryToTakeincome(currentUser.userLogin);
    }
    setTimeout(function () {
        onyx.queryToTakeincome(currentUser.userLogin);
        if (currentUser.userLogin !== null && DEFAULT_ROLE !== 'Artist') {
            res.render('error', {
                message: 'To enter this page you must be logged in',
                error: 'Access denied, not enough permissions'
            });
        }
        else {
            res.render('income-page', {
                title: 'Income Page', signedStatus: 'Signed In', signedText: '', signURL: '/profile', userImg: currentUser.userImage, incomeData: onyx.incomeData
            });
        }
    }, 3000);
});

router.get('/admin', (req: express.Request, res: express.Response) => {
    if (currentUser.userLogin !== null && DEFAULT_ROLE === 'Artist') {
        onyx.queryToTakeadmin(currentUser.userLogin);
    }
    setTimeout(function () {
        onyx.queryToTakeadmin(currentUser.userLogin);
        if (currentUser.userLogin !== null && DEFAULT_ROLE !== 'Admin') {
            res.render('error', {
                message: 'To enter this page you must be logged in',
                error: 'Access denied, not enough permissions'
            });
        }
        else {
            res.render('admin-page', {
                title: 'Admin Page', signedStatus: 'Signed In', signedText: '', signURL: '/profile', userImg: currentUser.userImage, adminData: onyx.adminData
            });
        }
    }, 3000);
});

router.post('/aproveform', (req: express.Request, res: express.Response) => {
    onyx.queryMoveToProduct();
});

router.get('/logout', (req: express.Request, res: express.Response) => {
    res.clearCookie(currentUser.userLogin);
    currentUser.userLogin = null;
    currentUser.userImage = null;
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
            DEFAULT_ROLE = loginData.userRole;
            cryptSignInDTO(req.body, loginData.userLogin);
            if (loginData.userPassword === req.body.userPasswordLogin) {
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
            req.body.userRole = DEFAULT_ROLE; 

            onyx.queryToSignUp(req.body);

            currentUser.userLogin = req.body.userLogin;
            currentUser.userImage = 'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w';
            cookies.setCookie(req.body.userLogin, authorization.createJwt(req.body), res);

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
    onyx.queryToChangePic(req.body.pictureurl, currentUser.userLogin);

    currentUser.userImage = req.body.pictureurl;

    res.redirect('/profile')
});

export default router;

function alert(arg0: string): any {
    throw new Error('Function not implemented.');
}
