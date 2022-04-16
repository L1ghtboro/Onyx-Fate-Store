import validator from 'validator';

import { makeQuery } from '../../connection/createconnection';

interface toValid {
    userEmail: string,
    userLogin: string,
    userPassword: string,
    userConfirmations: string,
    userName: string,
    userLastName: string
}

let findEmail, findLogins;

export function validation(toValid) {
    var latin = /^[A-Za-z0-9]*$/;

    makeQuery(`SELECT *
        FROM LoginInfo
        WHERE  '${toValid.userEmail}' in (user_email);`, (err: any, data: { rowCount: any; }) => {
        if (err)
            console.error(err);
        findEmail = data.rowCount;
    });

    makeQuery(`SELECT *
        FROM LoginInfo
        WHERE  '${toValid.userLogin}' in (user_login);`, (err: any, data: { rowCount: any; }) => {
        if (err)
            console.error(err);
        findLogins = data.rowCount;
    });

    console.log('Emails - ' + findEmail, 'Logins - ' + findLogins);

    if (!findEmail && !findLogins && (toValid.userPassword === toValid.userConfirmations) && ((validator.isEmail(toValid.userEmail)) && (toValid.userPassword.length > 7) && (toValid.userLogin.length > 5)))
        if (latin.test(toValid.userPassword) && latin.test(toValid.userName) && latin.test(toValid.userLastname) && latin.test(toValid.userLogin))
            return true;
    return false;
}