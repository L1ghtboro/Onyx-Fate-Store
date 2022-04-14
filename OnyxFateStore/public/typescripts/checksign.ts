import validator from 'validator';

export function validation(UserEmail, UserPass, UserConf) {
    return (validator.isEmail(UserEmail) && (UserPass === UserConf));
}