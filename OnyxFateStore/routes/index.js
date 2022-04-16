"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const createconnection_1 = require("../connection/createconnection");
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
const checksign_1 = require("../public/typescripts/checksign");
const logindto_1 = require("../public/typescripts/logindto");
router.get('/', (req, res) => {
    res.render('index', { title: 'Main Page' });
});
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});
router.post('/signupform', (req, res) => {
    (0, checksign_1.validation)(req.body);
    setTimeout(function () {
        if ((0, checksign_1.validation)(req.body)) {
            req.body = (0, logindto_1.createSignUpDTO)(req.body);
            req.body.userRole = 'User';
            console.log(req.body);
            (0, createconnection_1.makeQuery)(`INSERT INTO LoginInfo(user_login, user_email, user_password, user_name, user_lastname, user_role) 
            VALUES('${req.body.userLogin}', '${req.body.userEmail}', '${req.body.userPassword}', '${req.body.userName}', '${req.body.userLastname}', '${req.body.userRole}'); `, (err) => {
                if (err)
                    console.error(err);
                console.log('Data Inserted - new user ' + req.body.userLogin);
            });
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