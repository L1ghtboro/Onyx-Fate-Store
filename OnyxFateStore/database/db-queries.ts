import { makeQuery } from '../connection/createconnection';

export class UserRepository {
    getUserById(currentUser, pictureUrl) {
        makeQuery(`SELECT user_picture FROM LoginInfo
                UPDATE LoginInfo SET user_picture = '${pictureUrl}'
                WHERE user_login = '${currentUser.userLogin}'`, (err: any) => {
            if (err)
                console.error(err);
        });
    }
};