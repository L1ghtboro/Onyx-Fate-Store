"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validator_1 = require("validator");
const createconnection_1 = require("../../connection/createconnection");
const { Connection, Request } = require('tedious');
let findEmail, findLogins;
function validation(toValid) {
    (0, createconnection_1.makeQuery)(`SELECT *
        FROM LoginInfo
        WHERE  '${toValid.userEmail}' in (UserEmail);`, (err, data) => {
        if (err)
            console.error(err);
        findEmail = data.rowCount;
    });
    (0, createconnection_1.makeQuery)(`SELECT *
        FROM LoginInfo
        WHERE  '${toValid.userLogin}' in (UserLogin);`, (err, data) => {
        if (err)
            console.error(err);
        findLogins = data.rowCount;
    });
    console.log('Emails - ' + findEmail, 'Logins - ' + findLogins);
    if (!findEmail && !findLogins && (toValid.userPassword === toValid.userConfirmations) && ((validator_1.default.isEmail(toValid.userEmail)) && (toValid.userPassword.length > 7) && (toValid.userLogin.length > 5)))
        return true;
    return false;
}
exports.validation = validation;
//# sourceMappingURL=checksign.js.map