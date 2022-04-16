"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validator_1 = require("validator");
const createconnection_1 = require("../../connection/createconnection");
const { Connection, Request } = require('tedious');
let findEmail, findLogins;
function validation(toValid) {
    (0, createconnection_1.executeSQL)(`SELECT *
        FROM LoginInfo
        WHERE  '${toValid.UserEmail}' in (UserEmail);`, (err, data) => {
        if (err)
            console.error(err);
        findEmail = data.rowCount;
    });
    (0, createconnection_1.executeSQL)(`SELECT *
        FROM LoginInfo
        WHERE  '${toValid.UserLogin}' in (UserLogin);`, (err, data) => {
        if (err)
            console.error(err);
        findLogins = data.rowCount;
    });
    if (!findEmail && !findLogins && (toValid.UserPassword === toValid.UserConfirmations) && ((validator_1.default.isEmail(toValid.UserEmail)) && (toValid.UserPassword.length > 7) && (toValid.UserLogin.length > 5)))
        return true;
    return false;
}
exports.validation = validation;
//# sourceMappingURL=checksign.js.map