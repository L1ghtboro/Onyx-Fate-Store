import express = require('express');

const jwt = require('jsonwebtoken');

import validator from 'validator';

import { config } from '../../connection/config';

const { Connection, Request } = require('tedious');

let nonFuncCol: any, exist: boolean;
exist = false;

export class Authorize {
    receivedCol: any;
    createJwt(dataToProcess) {
        let user_token = jwt.sign({
            user_email: dataToProcess.userEmail,
            user_password: dataToProcess.userPassword
        }, 'shhhhh');
        return user_token;
    }

    makeQueryToCheck(dataToProcess) {
        const makeQuery = (query, _callback) => {
            let connection = new Connection(config);
            connection.connect((err) => {
                if (err)
                    return _callback(err, null);
                const request = new Request(query, (err: any, rowCount: any, rows: any) => {
                    connection.close();
                    if (err)
                        return _callback(err, null);
                    _callback(null, { rowCount, rows });
                });
                connection.execSql(request);
                request.on('row', function (columns) { nonFuncCol = columns; });
            });
        };

        makeQuery(`SELECT *
        FROM LoginInfo
        WHERE  '${dataToProcess.userEmailLogin}' in (user_email);`, (err: any, data: { rowCount: any, rows: any }) => {
            if (err)
                console.error(err);
            exist = true;
        });

        this.receivedCol = nonFuncCol;

        if (validator.isEmail(dataToProcess.userEmailLogin) && exist)
            return true;
        return false; 
    }
}