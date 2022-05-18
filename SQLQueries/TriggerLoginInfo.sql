CREATE TRIGGER InsertPictureandRole AFTER INSERT ON LoginInfo
FOR user_picture, user_role
BEGIN
    INSERT INTO (user_picture, user_role)
    VALUES('https://www.meme-arsenal.com/memes/fefac21eda463aa9a307c7cfdbea1bee.jpg', 'User')
END ;;