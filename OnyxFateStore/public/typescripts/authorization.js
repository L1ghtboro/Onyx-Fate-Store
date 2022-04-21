"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorize = void 0;
const jwt = require('jsonwebtoken');
const validator_1 = require("validator");
class Authorize {
    createJwt(dataToProcess) {
        let user_token = jwt.sign({
            user_email: dataToProcess.userEmail,
            user_password: dataToProcess.userPassword
        }, 'shhhhh');
        return user_token;
    }
    checkIfDateExist(dataToProcess) {
        if (validator_1.default.isEmail(dataToProcess.userEmail))
            return true;
        return false;
    }
}
exports.Authorize = Authorize;
//# sourceMappingURL=authorization.js.map