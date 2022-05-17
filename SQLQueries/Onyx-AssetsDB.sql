USE master;  
GO  
CREATE DATABASE Onyx_Assets  
ON   
( NAME = Onyx_Assets_dat,  
    FILENAME = 'D:\University\CourseWork\OnyxFateStore\SQL\onyxassetsdat.mdf',  
    SIZE = 10,  
    MAXSIZE = 50,  
    FILEGROWTH = 5 )  
LOG ON  
( NAME = Onyx_Assets_log,  
    FILENAME = 'D:\University\CourseWork\OnyxFateStore\SQL\onyxassetslog.ldf',  
    SIZE = 5MB,  
    MAXSIZE = 25MB,  
    FILEGROWTH = 5MB );  
GO  