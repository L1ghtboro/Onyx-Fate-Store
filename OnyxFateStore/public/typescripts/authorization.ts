import express = require('express');

const jwt = require('jsonwebtoken');

import validator from 'validator';

import { config } from '../../connection/config';

const { Connection, Request } = require('tedious');

let nonFuncCol: any;

export class Authorize {
    receivedCol: any;
    user_token: any;
    async makeQueryToCheck(dataToProcess) {
        const makeQuery = async (query) => {
            return new Promise((resolve, reject) => {
                let connection = new Connection(config);
                connection.connect((err) => {
                    if (err)
                        reject(err);
                    else {
                        const request = new Request(query, (err: any, rowCount: any, rows: any) => {
                            connection.close();
                            if (err)
                                reject(err)
                            else
                                resolve({ rowCount, rows });
                        });
                        connection.execSql(request);
                        request.on('row', function (columns) { nonFuncCol = columns; });
                    }
                    
                });
            });
        };

        try {
           await makeQuery(`SELECT *
                FROM LoginInfo
                WHERE  '${dataToProcess.userEmailLogin}' in (user_email);`);
            this.receivedCol = nonFuncCol;

            return validator.isEmail(dataToProcess.userEmailLogin);
        } catch (err) {
            console.error(err);
            return false;
        }
        
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

export const authorization = new Authorize();