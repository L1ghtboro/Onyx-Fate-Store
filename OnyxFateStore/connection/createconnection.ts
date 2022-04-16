const { Connection, Request } = require('tedious');

import { config } from './config';

const NewConnection = new Connection(config);

NewConnection.on("connect", err => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Success");
    }
});

NewConnection.connect();

export default NewConnection;   

export const executeSQL = (sql, callback) => {
    let connection = new Connection(config);
    connection.connect((err) => {
        if (err)
            return callback(err, null);
        const request = new Request(sql, (err, rowCount, rows) => {
            connection.close();
            if (err)
                return callback(err, null);
            callback(null, { rowCount, rows });
        });
        connection.execSql(request);
    });
};