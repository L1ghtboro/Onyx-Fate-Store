import validator from 'validator';

import { executeSQL } from '../../connection/createconnection';
const { Connection, Request } = require('tedious');

let findEmail, findLogins;

export function validation(toValid) {
    executeSQL(`SELECT *
        FROM LoginInfo
        WHERE  '${toValid.UserEmail}' in (UserEmail);`, (err: any, data: { rowCount: any; }) => {
        if (err)
            console.error(err);
        findEmail = data.rowCount;
    });

    executeSQL(`SELECT *
        FROM LoginInfo
        WHERE  '${toValid.UserLogin}' in (UserLogin);`, (err: any, data: { rowCount: any; }) => {
        if (err)
            console.error(err);
        findLogins = data.rowCount;
    });
    
    if (!findEmail && !findLogins && (toValid.UserPassword === toValid.UserConfirmations) && ((validator.isEmail(toValid.UserEmail)) && (toValid.UserPassword.length > 7) && (toValid.UserLogin.length > 5)))
        return true;
    return false;
}