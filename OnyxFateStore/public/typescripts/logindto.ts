const crypto = require("crypto");

interface toSignUp {
    userEmail: string,
    userLogin: string,
    userPassword: string,
    userConfirmations: string,
    userName: string,
    userLastName: string
}

class Encryption {
    publickey: any;
    constructor(keyLowlevel, keyHighLevel, keyBias) {
        let keyLowlevelArr = this.getCharCodes(keyLowlevel);
        let keyHighLevelArr = this.getCharCodes(keyHighLevel);
        let keyBiasArr = this.getCharCodes(keyBias);
        keyLowlevel = keyLowlevelArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        keyHighLevel = keyHighLevelArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        keyBias = keyBiasArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

        this.publickey = (Math.floor((keyLowlevel + keyHighLevel)/* / keyBias*/));
    }
    crypt(password) {
        let crypted = '';
        for (let i = 0; i < password.length; i++) {
            let code = password.charCodeAt(i);
            //code = code * (this.publickey - this.privatekey);
            code = code + this.publickey;
            crypted += String.fromCharCode(code);
        }
        return crypted;
    }
    decrypt(password) {
        let decrypted = '';
        for (let i = 0; i < password.length; i++) {
            let code = password.charCodeAt(i);
            //code = code / (this.publickey - this.privatekey);
            code = code - this.publickey
            decrypted += String.fromCharCode(code);
        }
        return decrypted;
    }
    getCharCodes(str) {
        let asciiArray = [];
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            asciiArray.push(code);
        }
        return asciiArray;
    }
}
const crypt = (salt, text) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

    return text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("");
};

const decrypt = (salt, encoded) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

    return encoded.match(/.{1,2}/g).map((hex) => parseInt(hex, 16)).map(applySaltToChar).map((charCode) => String.fromCharCode(charCode)).join("");
};

export function createSignUpDTO(toSignUp) {
    toSignUp.userPassword = crypt(toSignUp.userLogin, toSignUp.userPassword);
    return toSignUp;
}

export function decrypSignInDTO(toSignIn) {
    toSignIn.userPassword = decrypt(toSignIn.userLogin, toSignIn.userPassword);
    return toSignIn;
}

export function cryptSignInDTO(toSignIn, nickname) {
    toSignIn.userPasswordLogin = crypt(nickname, toSignIn.userPasswordLogin);
    return toSignIn;
}