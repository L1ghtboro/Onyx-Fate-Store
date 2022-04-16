import validator from 'validator';

import { makeQuery } from '../../connection/createconnection';
const { Connection, Request } = require('tedious');

let findEmail, findLogins;

export function validation(toValid) {
    makeQuery(`SELECT *
        FROM LoginInfo
        WHERE  '${toValid.userEmail}' in (UserEmail);`, (err: any, data: { rowCount: any; }) => {
        if (err)
            console.error(err);
        findEmail = data.rowCount;
    });

    makeQuery(`SELECT *
        FROM LoginInfo
        WHERE  '${toValid.userLogin}' in (UserLogin);`, (err: any, data: { rowCount: any; }) => {
        if (err)
            console.error(err);
        findLogins = data.rowCount;
    });
    
    if (!findEmail && !findLogins && (toValid.userPassword === toValid.userConfirmations) && ((validator.isEmail(toValid.userEmail)) && (toValid.userPassword.length > 7) && (toValid.userLogin.length > 5)))
        return true;
    return false;
}