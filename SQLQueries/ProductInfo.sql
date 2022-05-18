CREATE TABLE ProductInfo(
    model_id INT IDENTITY,
    model_package VARBINARY(max) NOT NULL,
    model_name VARCHAR(128) NOT NULL,
    model_description VARCHAR(128) NOT NULL,
    model_price FLOAT NOT NULL,
    author_info VARCHAR(256) NOT NULL
    PRIMARY KEY(model_id, model_name, model_description, model_price, author_info)
)