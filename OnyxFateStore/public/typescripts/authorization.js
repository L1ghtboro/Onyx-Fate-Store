"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = exports.Authorize = void 0;
const jwt = require('jsonwebtoken');
const validator_1 = require("validator");
const config_1 = require("../../connection/config");
const { Connection, Request } = require('tedious');
let nonFuncCol, exist;
exist = false;
class Authorize {
    makeQueryToCheck(dataToProcess) {
        const makeQuery = (query, _callback) => {
            let connection = new Connection(config_1.config);
            connection.connect((err) => {
                if (err)
                    return _callback(err, null);
                const request = new Request(query, (err, rowCount, rows) => {
                    connection.close();
                    if (err)
                        return _callback(err, null);
                    _callback(null, { rowCount, rows });
                });
                connection.execSql(request);
                request.on('row', function (columns) { nonFuncCol = columns; });
            });
        };
        makeQuery(`SELECT *
        FROM LoginInfo
        WHERE  '${dataToProcess.userEmailLogin}' in (user_email);`, (err, data) => {
            if (err)
                console.error(err);
            exist = true;
        });
        this.receivedCol = nonFuncCol;
        if (validator_1.default.isEmail(dataToProcess.userEmailLogin) && exist)
            return true;
        return false;
    }
    createJwt(dataToProcess) {
        this.user_token = jwt.sign({
            user_email: dataToProcess.userEmailLogin,
            user_password: dataToProcess.userPasswordLogin
        }, 'shhhhh');
        return this.user_token;
    }
    getToken() {
        return this.user_token;
    }
}
exports.Authorize = Authorize;
exports.authorization = new Authorize();
//# sourceMappingURL=authorization.js.map