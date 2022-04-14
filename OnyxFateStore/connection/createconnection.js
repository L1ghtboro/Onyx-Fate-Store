"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Connection } = require('tedious');
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
//# sourceMappingURL=createconnection.js.map