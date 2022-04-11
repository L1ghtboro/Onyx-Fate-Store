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
}

const NewConnection = new Connection(config);

NewConnection.on("connect", err => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Success");
        queryDatabase();
    }
});

NewConnection.connect();

function queryDatabase() {
    console.log("Start writing...");

    const NewRequest = new Request(
        "SET IDENTITY_INSERT LoginInfo ON INSERT INTO LoginInfo(UserID, UserLogin, UserEmail, UserPassword, UserName, UserLastName) VALUES(3, 'Light', 'tiptemka@gmail.com', 'litterallynotmy123', 'Artem', 'Skoropadskii'); ",
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Inserted data');
            }
        });

    NewConnection.execSql(NewRequest);

    return 0;
}