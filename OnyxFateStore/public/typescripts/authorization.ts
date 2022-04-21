import express = require('express');

const jwt = require('jsonwebtoken');

import validator from 'validator';

import { makeQuery } from '../../connection/createconnection';

export class Authorize {
    createJwt(dataToProcess) {
        let user_token = jwt.sign({
            user_email: dataToProcess.userEmail,
            user_password: dataToProcess.userPassword
        }, 'shhhhh');
        return user_token;
    }

    checkIfDateExist(dataToProcess) {
        if (validator.isEmail(dataToProcess.userEmail))
            return true;
        return false;
    }
}