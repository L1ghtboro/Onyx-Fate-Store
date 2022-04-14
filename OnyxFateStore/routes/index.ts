import express = require('express');
const router = express.Router();

import Connection from '../connection/createconnection';
const { Request } = require('tedious');

let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true })); 

//Environment Variable?

//interface

//UTF-8

router.get('/', (req: express.Request, res: express.Response) => {
    res.render('index', { title: 'Main Page'});
});

router.get('/login', (req: express.Request, res: express.Response) => {
    res.render('login', {title: 'Login Page'});
});

router.post('/singinform', (req, res) => {
    res.redirect('/')
    console.log("Start writing...");

    //Service validate if Email. Password == Password. UserLogin unique. Login >= 3. Password >= 8. UTF-8. Lib validation?

    //Hash Password -> DB

    //req.body -> LoginDTO
    const NewRequest = new Request(
        
        //req.body -> read JSON info into object
        //UserLogin -> userLogin
        //DB UserLogin -> user_login

        //SQL query -> find dependency query?
        //Prepare Statement
        `INSERT INTO LoginInfo(UserLogin, UserEmail, UserPassword, UserName, UserLastName) VALUES('${req.body.UserLogin}', '${req.body.UserEmail}', '${req.body.UserPassword}', '${req.body.UserName}', '${req.body.UserLastname}'); `,
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Inserted data');
            }
        });

    Connection.execSql(NewRequest);
});

export default router;