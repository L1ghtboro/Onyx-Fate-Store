"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeSQL = void 0;
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
const executeSQL = (sql, callback) => {
    let connection = new Connection(config_1.config);
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
exports.executeSQL = executeSQL;
//# sourceMappingURL=createconnection.js.map