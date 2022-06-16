"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = exports.Authorize = void 0;
const jwt = require('jsonwebtoken');
const validator_1 = require("validator");
const config_1 = require("../../connection/config");
const { Connection, Request } = require('tedious');
let nonFuncCol;
class Authorize {
    makeQueryToCheck(dataToProcess) {
        return __awaiter(this, void 0, void 0, function* () {
            const makeQuery = (query) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    let connection = new Connection(config_1.config);
                    connection.connect((err) => {
                        if (err)
                            reject(err);
                        else {
                            const request = new Request(query, (err, rowCount, rows) => {
                                connection.close();
                                if (err)
                                    reject(err);
                                else
                                    resolve({ rowCount, rows });
                            });
                            connection.execSql(request);
                            request.on('row', function (columns) { nonFuncCol = columns; });
                        }
                    });
                });
            });
            try {
                yield makeQuery(`SELECT *
                FROM LoginInfo
                WHERE  '${dataToProcess.userEmailLogin}' in (user_email);`);
                this.receivedCol = nonFuncCol;
                return validator_1.default.isEmail(dataToProcess.userEmailLogin);
            }
            catch (err) {
                console.error(err);
                return false;
            }
        });
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