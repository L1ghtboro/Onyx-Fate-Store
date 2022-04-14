const { Connection, Request } = require('tedious');
const config = {
    server: "onyx-fate-store.database.windows.net",
    options: {
        database: "Onyx-Assets",
        encrypt: true
    },
    authentication: {
        type: "default",
        options: {
            userName: "Lightboro",
            password: "gamegaydev2Q3050",
        }
    }
};
const NewConnection = new Connection(config);
NewConnection.on("connect", err => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log("Success");
    }
});
NewConnection.connect();
//# sourceMappingURL=dbconnect.js.map