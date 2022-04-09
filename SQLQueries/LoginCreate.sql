CREATE TABLE LoginInfo(
    UserID INT IDENTITY,
    UserLogin VARCHAR(16) NOT NULL,
    UserPassword VARCHAR(24) NOT NULL,
    UserName VARCHAR(24) NOT NULL,
    UserLastName VARCHAR(32) NOT NULL,
    PRIMARY KEY(UserID, UserLogin)
)