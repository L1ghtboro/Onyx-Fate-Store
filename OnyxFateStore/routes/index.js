"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const { Request } = require('tedious');
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
const checksign_1 = require("../public/typescripts/checksign");
//Environment Variable?
//interface
//UTF-8
router.get('/', (req, res) => {
    res.render('index', { title: 'Main Page' });
});
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});
router.get('/browsing', (req, res) => {
    res.render('preloaderloop', { title: 'Browsing' });
});
router.post('/signupform', (req, res) => {
    (0, checksign_1.validation)(req.body);
    res.send(`<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Onyx Fate | Browsing</title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
    <script src="/javascripts/preloaderloop.js" type="text/javascript"></script>
    <link rel="stylesheet" href="/stylesheets/preloader.css">
</head>

<body>
    <div class="preloader">
        <div class="loader"></div>
    </div>
</body>

</html>`);
    setTimeout(function () {
        if ((0, checksign_1.validation)(req.body)) {
            res.redirect('/');
        }
        else {
            res.redirect('/error');
        }
    }, 3000);
    //Service validate if Email. Password == Password. UserLogin unique. Login >= 3. Password >= 8. UTF-8. Lib validation?
    //Hash Password -> DB
    //req.body -> LoginDTO
    //const NewRequest = new Request(
    //    //req.body -> read JSON info into object
    //    //UserLogin -> userLogin
    //    //DB UserLogin -> user_login
    //    //SQL query -> find dependency query?
    //    //Prepare Statement
    //    `INSERT INTO LoginInfo(UserLogin, UserEmail, UserPassword, UserName, UserLastName) VALUES('${req.body.UserLogin}', '${req.body.UserEmail}', '${req.body.UserPassword}', '${req.body.UserName}', '${req.body.UserLastname}'); `,
    //    (err, rowCount) => {
    //        if (err) {
    //            console.error(err.message);
    //        } else {
    //            console.log('Inserted data');
    //        }
    //    });
    //Connection.execSql(NewRequest);
});
exports.default = router;
function alert(arg0) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=index.js.map