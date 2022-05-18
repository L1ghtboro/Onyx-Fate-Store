CREATE TABLE SellingHistory(
    sell_id INT IDENTITY,
    model_name VARCHAR(128),
    user_paid FLOAT,
    transaction_date DATE NOT NULL,
    user_login VARCHAR(128) NOT NULL, 
    PRIMARY KEY(sell_id, model_name, user_paid, transaction_date, user_login)
)