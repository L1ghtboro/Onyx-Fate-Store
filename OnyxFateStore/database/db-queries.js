"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const createconnection_1 = require("../connection/createconnection");
class UserRepository {
    getUserById(currentUser, pictureUrl) {
        (0, createconnection_1.makeQuery)(`SELECT user_picture FROM LoginInfo
                UPDATE LoginInfo SET user_picture = '${pictureUrl}'
                WHERE user_login = '${currentUser.userLogin}'`, (err) => {
            if (err)
                console.error(err);
        });
    }
}
exports.UserRepository = UserRepository;
;
//# sourceMappingURL=db-queries.js.map