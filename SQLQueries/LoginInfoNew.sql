CREATE TABLE LoginInfo(
    user_id INT IDENTITY NOT NULL,
    user_login VARCHAR(128) NOT NULL,
    user_password VARCHAR(128) NOT NULL,
    user_name VARCHAR(128) NOT NULL,
    user_lastname VARCHAR(128) NOT NULL,
    user_email VARCHAR(128) NOT NULL,
    user_picture VARBINARY(max) NOT NULL,
    user_role VARCHAR(32) NOT NULL
    PRIMARY KEY(user_id, user_login, user_password, user_name, user_lastname, user_email, user_role)
)