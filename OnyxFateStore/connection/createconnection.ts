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

export const makeQuery = (query, _callback) => {
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
    });
};