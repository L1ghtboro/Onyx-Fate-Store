"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validator_1 = require("validator");
function validation(UserEmail, UserPass, UserConf) {
    return (validator_1.default.isEmail(UserEmail) && (UserPass === UserConf));
}
exports.validation = validation;
//# sourceMappingURL=checksign.js.map