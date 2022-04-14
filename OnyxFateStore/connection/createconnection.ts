const { Connection } = require('tedious');

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