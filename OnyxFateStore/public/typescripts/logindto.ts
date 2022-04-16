interface toSignUp {
    userEmail: string,
    userLogin: string,
    userPassword: string,
    userConfirmations: string,
    userName: string,
    userLastName: string
}

class Hash {
    publickey: any;
    privatekey = 3924156;
    constructor(keyLowlevel, keyHighLevel, keyBias) {
        let keyLowlevelArr = this.getCharCodes(keyLowlevel);
        let keyHighLevelArr = this.getCharCodes(keyHighLevel);
        let keyBiasArr = this.getCharCodes(keyBias);
        keyLowlevel = keyLowlevelArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        keyHighLevel = keyHighLevelArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        keyBias = keyBiasArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

        this.publickey = (Math.floor((keyLowlevel * keyHighLevel) / keyBias));
    }
    crypt(password) {
        let crypted = '';
        for (let i = 0; i < password.length; i++) {
            let code = password.charCodeAt(i);
            code = code * (this.publickey - this.privatekey);
            crypted += String.fromCharCode(code);
        }
        return crypted;
    }
    decrypt(password) {
        let decrypted = '';
        for (let i = 0; i < password.length; i++) {
            let code = password.charCodeAt(i);
            code = code / (this.publickey - this.privatekey);
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

export function getSingUpDTO(toSignUp) {
    
}