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

let find;

export function validation(toValid) {
    var latin = /^[a-z0-9]*$/i;
    if (!(validator.isEmail(toValid.userEmail) && latin.test(toValid.userName) )) {
        return false;
    }

    if (!(toValid.userPassword === toValid.userConfirmations && toValid.userPassword.length > 7 && toValid.userLogin.length > 5
        && latin.test(toValid.userPassword) && latin.test(toValid.userLastname)
        && latin.test(toValid.userLogin))) {
        return false;
    }

    makeQuery(`SELECT *
        FROM LoginInfo
        WHERE  '${toValid.userEmail}' in (user_email) OR '${toValid.userLogin}' in (user_login);`, (err: any, data: { rowCount: any, rows: any }) => {
        if (err)
            console.error(err);
        find = data.rowCount;
    });

    if (!find)
            return true;
    return false;
}