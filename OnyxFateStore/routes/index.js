"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
const { Connection, Request } = require('tedious');
const config = {
    server: "onyx-fate-store.database.windows.net",
    options: {
        database: "Onyx-Assets",
        encrypt: true
    },
    authentication: {
        type: "default",
        options: {
            userName: "Lightboro",
            password: "gamegaydev2Q3050",
        }
    }
};
const NewConnection = new Connection(config);
NewConnection.on("connect", err => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log("Success");
    }
});
NewConnection.connect();
router.get('/', (req, res) => {
    res.render('index', { title: 'Main Page' });
});
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});
router.post('/singinform', (req, res) => {
    res.redirect('/');
    console.log("Start writing...");
    const NewRequest = new Request(`INSERT INTO LoginInfo(UserLogin, UserEmail, UserPassword, UserName, UserLastName) VALUES('${req.body.UserLogin}', '${req.body.UserEmail}', '${req.body.UserPassword}', '${req.body.UserName}', '${req.body.UserLastname}'); `, (err, rowCount) => {
        if (err) {
            console.error(err.message);
        }
        else {
            console.log('Inserted data');
        }
    });
    NewConnection.execSql(NewRequest);
});
exports.default = router;
//# sourceMappingURL=index.js.map