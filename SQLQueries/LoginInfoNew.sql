CREATE TABLE LoginInfo(
    UserID INT IDENTITY NOT NULL,
    UserLogin VARCHAR(16) NOT NULL,
    UserPassword VARCHAR(24) NOT NULL,
    UserName VARCHAR(24) NOT NULL,
    UserLastName VARCHAR(32) NOT NULL,
    UserPicture VARBINARY(max) NOT NULL,
    UserEmail VARCHAR(128) NOT NULL,
    PRIMARY KEY(UserID, UserLogin, UserPassword, UserName, UserLastName, UserEmail)
)