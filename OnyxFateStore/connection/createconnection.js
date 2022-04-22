"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeQuery = void 0;
const { Connection, Request } = require('tedious');
const config_1 = require("./config");
const NewConnection = new Connection(config_1.config);
NewConnection.on("connect", err => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log("Success");
    }
});
NewConnection.connect();
exports.default = NewConnection;
const makeQuery = (query, _callback) => {
    let connection = new Connection(config_1.config);
    connection.connect((err) => {
        if (err)
            return _callback(err, null);
        const request = new Request(query, (err, rowCount, rows) => {
            connection.close();
            if (err)
                return _callback(err, null);
            console.log(rows);
            _callback(null, { rowCount, rows });
        });
        connection.execSql(request);
    });
};
exports.makeQuery = makeQuery;
//# sourceMappingURL=createconnection.js.map