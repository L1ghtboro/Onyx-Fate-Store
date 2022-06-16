import express = require('express');

import { makeQuery } from '../../connection/createconnection';
import { config } from '../../connection/config';

const { Connection, Request } = require('tedious');

let retrieveData = [];
let newStorage;
let history = [];
let income = [];
let admin = [];

export class OnyxQuery {
    receivedCol: any;
    recieveData: any;
    historyData: any;
    incomeData: any;
    adminData: any;
    queryToSignUp(req: express.Request) {
        makeQuery(`INSERT INTO LoginInfo(user_login, user_email, user_password, user_name, user_lastname, user_picture, user_role) 
            VALUES('${req.body.userLogin}', '${req.body.userEmail}', '${req.body.userPassword}', '${req.body.userName}', '${req.body.userLastname}', '\https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w'\,'${req.body.userRole}'); `, (err: any) => {
            if (err)
                console.error(err);
        });
    }

    queryToChangePic(pictureurl, user) {
        makeQuery(`SELECT user_picture FROM LoginInfo
                UPDATE LoginInfo SET user_picture = '${pictureurl}'
                WHERE user_login = '${user}'`, (err: any) => {
            if (err)
                console.error(err);
            console.log('Image changed for ' + user);
        });
    }

    queryToGetGrave() {
        const makeQueryl = (query, _callback) => {
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
                request.on('row', function (rows) {
                    newStorage = {
                        model_id: rows[0].value,
                        model_package: rows[1].value,
                        model_name: rows[2].value,
                        model_description: rows[3].value,
                        model_price: rows[4].value,
                        model_picture: rows[5].value,
                        author_info: rows[6].value
                    };
                });
            });
        };

        makeQueryl(`SELECT * FROM ProductInfo  
                WHERE model_package = 'stylized-graveyard.zip' `, (err: any, data: { rowCount: number, rows: any }) => {
            if (err)
                console.error(err);
        });

        this.recieveData = newStorage;

        return retrieveData;
    }

    queryToTakePackages() {
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
                request.on('row', function (rows) {
                    let temp = {
                        model_id: rows[0].value,
                        model_package: rows[1].value,
                        model_name: rows[2].value,
                        model_description: rows[3].value,
                        model_price: rows[4].value,
                        model_picture: rows[5].value,
                        author_info: rows[6].value
                    };  retrieveData.push(temp); });
            });
        };

        makeQuery(`SELECT TOP 6 * FROM ProductInfo  
                ORDER BY NEWID() `, (err: any, data: { rowCount: number, rows: any }) => {
            if (err)
                console.error(err);
        });

        this.receivedCol = retrieveData;

        return retrieveData;
    }

    queryToAddToQueue(data, author) {
        makeQuery(`INSERT INTO PendingRequest(pr_link, pr_name, pr_description, pr_price, pr_picture, pr_author) 
            VALUES('${data.model_file}', '${data.model_name}', '${data.model_desc}', '${data.model_price}', '${data.model_pic}', '${author}') `, (err: any, data: { rowCount: number, rows: any }) => {
            if (err)
                console.error(err);
        });
    }

    queryToTakehistory(user) {
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
                request.on('row', function (rows) {
                    let temp = {
                        sell_id: rows[0].value,
                        model_name: rows[1].value,
                        user_paid: rows[2].value,
                        transaction_date: rows[3].value,
                        user_login: rows[4].value,
                    }; history.push(temp);
                });
            });
        };

        makeQuery(`SELECT * FROM SellingHistory
                WHERE user_login = '${user}'`, (err: any, data: { rowCount: number, rows: any }) => {
            if (err)
                console.error(err);
        });

        this.historyData = history;

        return history;
    }

    queryToTakeincome(user) {
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
                request.on('row', function (rows) {
                    let temp = {
                        income_id: rows[0].value,
                        order_id: rows[1].value,
                        art_income: rows[2].value,
                        date_trans: rows[3].value,
                        author_info: rows[4].value,
                    }; income.push(temp);
                });
            });
        };

        makeQuery(`SELECT * FROM IncomeHistory
                WHERE author_info = '${user}'`, (err: any, data: { rowCount: number, rows: any }) => {
            if (err)
                console.error(err);
        });

        this.incomeData = income;

        return income;
    }

    queryToTakeadmin(user) {
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
                request.on('row', function (rows) {
                    let temp = {
                        pr_id: rows[0].value,
                        pr_link: rows[1].value,
                        pr_name: rows[2].value,
                        pr_description: rows[3].value,
                        pr_price: rows[4].value,
                        pr_picture: rows[5].value,
                        pr_author: rows[6].value,
                    }; admin.push(temp);
                });
            });
        };

        makeQuery(`SELECT * FROM PendingRequest
                `, (err: any, data: { rowCount: number, rows: any }) => {
            if (err)
                console.error(err);
        });

        this.adminData = admin;

        return admin;
    }

    queryMoveToProduct() {
        makeQuery(`INSERT INTO ProductInfo (model_package, model_name, model_description, model_price, model_picture, author_info)
                SELECT [pr_link]
                    ,[pr_name]
                    ,[pr_description]
                    ,[pr_price]
                    ,[pr_picture]
                    ,[pr_author] FROM PendingRequest
                DELETE FROM PendingRequest
                `, (err: any, data: { rowCount: number, rows: any }) => {
            if (err)
                console.error(err);
        });
    }
}