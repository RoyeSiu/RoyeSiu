--@block
INSERT INTO chatroom_users (chatroom_id, user_id)
VALUES ('3', '1');

SELECT chatroom.chatroom_id,
    chatroom_name
FROM chatroom_users
    INNER JOIN chatroom ON chatroom_users.chatroom_id = chatroom.chatroom_id
WHERE user_id = 1
ORDER BY time_of_logout DESC;

--@block
SELECT chatroom.chatroom_id,
    chatroom_name
FROM chatroom_users
    INNER JOIN chatroom ON chatroom_users.chatroom_id = chatroom.chatroom_id
    INNER JOIN message_data ON chatroom.chatroom_id = message_data.chatroom_id
WHERE chatroom_id.user_id = 1
ORDER BY cteated_at DESC;

--@block
INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
VALUES ('1', '2', 'roye said yoyoyo test room 1', false);

SELECT *
FROM message_data
    INNER JOIN users_data ON message_data.user_id = users_data.user_id
WHERE chatroom_id = 1
ORDER BY created_at;

SELECT chatroom.chatroom_id,
    chatroom_name
FROM chatroom_users
    INNER JOIN chatroom ON chatroom_users.chatroom_id = chatroom.chatroom_id
    INNER JOIN message_data ON chatroom.chatroom_id = message_data.chatroom_id
WHERE chatroom_id.user_id = 1
ORDER BY created_at DESC;

--@block
-- insert into message_data (chatroom_id, user_id, message_content, is_code)
-- VALUES ('1', '2', 'roye said yoyoyo test room 1', false);
-- select * from message_data inner join users_data on message_data.user_id = users_data.user_id where chatroom_id = 1 order by created_at;
SELECT message_id,
    chatroom_id,
    created_at,
    users_data.user_id,
    message_content,
    is_code,
    message_data.image,
    attachment,
    users_data.user_name,
    nickname
FROM message_data
    INNER JOIN users_data ON message_data.user_id = users_data.user_id
WHERE chatroom_id = 1
ORDER BY created_at;

--@block
-- select * from users_data where user_name in ('chuen', 'roye', 'tony');
-- select * from users_data where user_name in ('123','4343');
<< << << < HEAD --@block
SELECT chatroom_name,
    user_name,
    nickname,
    message_content
FROM chatroom_users
    INNER JOIN chatroom ON chatroom_users.chatroom_id = chatroom.chatroom_id
    INNER JOIN users_data ON chatroom_users.user_id = users_data.user_id
    INNER JOIN message_data ON chatroom_users.user_id = message_data.user_id;

--@block
SELECT *
FROM chatroom_users
WHERE user_id = 1;

--@block
SELECT *
FROM message_data
    INNER JOIN users_data ON message_data.user_id = users_data.user_id
WHERE chatroom_id = 1;

--@block
SELECT chatroom.chatroom_id,
    chatroom_name
FROM chatroom_users
    INNER JOIN chatroom ON chatroom_users.chatroom_id = chatroom.chatroom_id
WHERE user_id = 1
ORDER BY time_of_logout DESC;

== == == = --@block
SELECT user_id
FROM users_data
WHERE user_name IN ('roye', 'roye2', 'roye3');

-- select user_id from users_data where user_name in ('roye')  ;
/*---------------------新增房間資料，一間房1個用戶--------------*/
--@block
-- select chatroom_id from chatroom (insert into chatroom (chatroom_name, created_by_user_id) values (1, 2) RETURNING chatroom_id);
WITH id AS (
    INSERT INTO chatroom (chatroom_name, created_by_user_id)
    VALUES (1, 2)
    RETURNING chatroom_id
)
SELECT chatroom_id
FROM id;

--@block
SELECT string_to_array('xx~^~yy~^~zz', '~^~', 'yy');

--@block
SELECT user_id
FROM users_data
WHERE user_name IN ('roye', 'roye2');

--@block
SELECT aeroplane_game_record.*,
    users_data_1.user_name AS player_1_user_name,
    users_data_2.user_name AS player_2_user_name,
    users_data_3.user_name AS player_3_user_name,
    users_data_4.user_name AS player_4_user_name,
    users_data_1.nickname AS player_1_nickname,
    users_data_2.nickname AS player_2_nickname,
    users_data_3.nickname AS player_3_nickname,
    users_data_4.nickname AS player_4_nickname
FROM aeroplane_game_record
    JOIN users_data users_data_1 ON aeroplane_game_record.player_1_user_id = users_data_1.user_id
    JOIN users_data users_data_2 ON aeroplane_game_record.player_2_user_id = users_data_2.user_id
    JOIN users_data users_data_3 ON aeroplane_game_record.player_3_user_id = users_data_3.user_id
    JOIN users_data users_data_4 ON aeroplane_game_record.player_4_user_id = users_data_4.user_id
WHERE game_id = 6;

--@block
SELECT *
FROM users_data --@block
INSERT INTO message_data (chatroom_id, user_id, message_content)
VALUES (10, 1, 'line 1\n line2');

--@block
SELECT message_content
FROM message_data
WHERE chatroom_id = 10;

--@block
SELECT $$123 456 789 $$ AS str \ gset
    /*搜尋兩個有指定數值 column 及 一個數值為 NULL 的 column*/
    --@block
SELECT chatroom_login_id
FROM chatroom_login
WHERE (chatroom_id, user_id) = ('2', '1')
    AND logout_at IS NULL;

/*根據搜尋結果，更改該結果的指定數值*/
--@block
UPDATE chatroom_login
SET logout_at = CURRENT_TIMESTAMP
WHERE chatroom_login_id = (
        SELECT chatroom_login_id
        FROM chatroom_login
        WHERE (chatroom_id, user_id) = ('1', '1')
    );

--@block
UPDATE chatroom_users
SET (time_of_login, time_of_logout) = (NOW(), NOW())
WHERE (chatroom_id, user_id) =(1, 1);

--@block
UPDATE chatroom_users
SET time_of_logout = NOW()
WHERE (chatroom_id, user_id) =(1, 1);

--@block
UPDATE chatroom_users_id
SET (time_of_logout) VALUE (current_timstamp) --@block
SELECT nickname
FROM users_data
WHERE user_id = 1;

--@block
SELECT game_table_id
FROM pre_game_room_data
WHERE chatroom_id = 38
ORDER BY game_table_id;

--@block
SELECT pre_game_room_user.*,
    users_data.nickname
FROM pre_game_room_user
    INNER JOIN users_data ON pre_game_room_user.user_id = users_data.user_id
WHERE game_table_id = 1
ORDER BY nickname --@block
INSERT INTO pre_game_room_user (game_table_id, user_id)
VALUES (1, 2) --@block
UPDATE aeroplane_game_move_record
SET chess_id = 1
WHERE id = 30;

SELECT *
FROM message_data
WHERE message_content LIKE '%search test%';

--@block
SELECT *
FROM message_data
WHERE message_content LIKE '%search%'
    AND (chatroom_id, user_id) = (4, 2);

--@block
SELECT message_id,
    chatroom_id,
    message_data.user_id,
    users_data.nickname,
    message_content,
    is_code,
    image
FROM message_data
    INNER JOIN users_data ON message_data.user_id = users_data.user_id
WHERE message_content LIKE '%search%'
    AND (chatroom_id) = (4)
ORDER BY created_at DESC;

--@block
UPDATE chatroom_users
SET unread_msg = unread_msg + 1
WHERE time_of_logout < (
        INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
        VALUES (1, 2, 'testestset', 'false')
        RETURNING created_at
    );

--@block
INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
VALUES (1, 2, 'testestset', 'false')
RETURNING created_at;

--@block
SELECT *
FROM chatroom_users
WHERE (chatroom_id, time_of_logout) = ();

--@block
--  UPDATE chatroom_users set unread_msg = +1 where chatroom_users_id = 1
UPDATE chatroom_users
SET unread_msg = unread_msg + 1
WHERE chatroom_users_id = 1
    AND time_of_logout > ();

-- select unread_msg from chatroom_users where chatroom_users_id = 1;
--@block
UPDATE chatroom_users
SET unread_msg = unread_msg + 1
WHERE chatroom_id = 1
    AND time_of_logout < NOW()
    AND user_id != 1;

--@block
SELECT chatroom.chatroom_id,
    chatroom_name,
    unread_msg
FROM chatroom_Users
    INNER JOIN chatroom ON chatroom_users.chatroom_id = chatRoom.chatroom_id
    INNER JOIN message_data ON chatRoom.chatroom_id = message_data.chatroom_id
WHERE chatroom_users.user_id = 1
ORDER BY message_data.created_at DESC;

--@block
SELECT chatroom_id unread_msg
FROM chatroom_users
WHERE (user_id, chatroom_id) = (1, 2) --@block
SELECT *
FROM aeroplane_game_move_record;

SELECT *
FROM chatroom_Users
    INNER JOIN chatroom ON chatroom_users.chatroom_id = chatRoom.chatroom_id;

--@block
/*---------------chatroom_users sorting by chatroom_id----------*/
WITH chatroomNum AS (
    SELECT DISTINCT ON (chatroom_Users.chatroom_id) chatroom_Users.chatroom_id
    FROM chatroom_Users
        INNER JOIN chatroom ON chatroom_users.chatroom_id = chatRoom.chatroom_id
    WHERE chatroom_users.user_id = 1
)
SELECT *
FROM chatroomNum;

--@block
/*----------------message sorting by created_at -------------------*/
WITH messagecreatedat AS (
    SELECT *
    FROM message_data
    ORDER BY created_at DESC
),
messageNum AS (
    SELECT *
    FROM (
            SELECT DISTINCT ON (chatroom_id) *
            FROM messagecreatedat
        ) message_data
    ORDER BY created_at DESC
)
SELECT messageNum.chatroom_id,
    created_at
FROM messageNum;

--@block
WITH chatroomNum AS (
    SELECT DISTINCT ON (chatroom_Users.chatroom_id) chatroom.chatroom_name,
        chatroom_Users.chatroom_id,
        chatroom_Users.unread_msg
    FROM chatroom_Users
        INNER JOIN chatroom ON chatroom_users.chatroom_id = chatroom.chatroom_id
    WHERE chatroom_users.user_id = 1
),
messageNum AS (
    SELECT *
    FROM (
            SELECT DISTINCT ON (message_data.chatroom_id) *
            FROM message_data
        ) message_data
)
SELECT chatroomNum.chatroom_id,
    chatroomNum.chatroom_name,
    unread_msg,
    messageNum.created_at
FROM chatroomNum
    LEFT JOIN messageNum ON chatroomNum.chatroom_id = messageNum.chatroom_id
ORDER BY messageNum.created_at DESC nulls LAST;

--@block
SELECT DISTINCT ON (chatroom_Users.chatroom_id) chatroom.chatroom_id,
    chatroom_name,
    unread_msg,
    message_data.created_at
FROM chatroom_Users
    INNER JOIN chatroom ON chatroom_users.chatroom_id = chatRoom.chatroom_id
    INNER JOIN message_data ON chatRoom.chatroom_id = message_data.chatroom_id
WHERE chatroom_users.user_id = 1;

--@block
WITH messagesorting AS (
    SELECT *
    FROM message_data
    ORDER BY created_at DESC
),
result AS (
    SELECT DISTINCT ON (chatroom_Users.chatroom_id) chatroom.chatroom_name,
        chatroom_Users.chatroom_id,
        chatroom_Users.unread_msg,
        messagesorting.created_at
    FROM chatroom_Users
        INNER JOIN chatroom ON chatroom_users.chatroom_id = chatroom.chatroom_id
        LEFT JOIN messagesorting ON chatroom.chatroom_id = messagesorting.chatroom_id
    WHERE chatroom_users.user_id = 1
)
SELECT *
FROM result
ORDER BY created_at DESC nulls LAST;

--@block
WITH messagecreatedat AS (
    SELECT *
    FROM message_data
    ORDER BY created_at DESC
)
SELECT DISTINCT ON (chatroom_id) *
FROM messagecreatedat;

--@block
WITH listresult AS (
    SELECT chatroom_id,
        max(created_at)
    FROM message_data
    GROUP BY chatroom_id
),
result AS (
    SELECT DISTINCT ON (chatroom_Users.chatroom_id) chatroom.chatroom_name,
        chatroom_Users.chatroom_id,
        chatroom_Users.unread_msg,
        listresult.max
    FROM chatroom_Users
        INNER JOIN chatroom ON chatroom_users.chatroom_id = chatroom.chatroom_id
        LEFT JOIN listresult ON chatroom.chatroom_id = listresult.chatroom_id
    WHERE chatroom_users.user_id = 1
)
SELECT *
FROM result
ORDER BY max DESC --@block
SELECT created_at
FROM message_data;

--@block
SELECT *
FROM aeroplane_game_move_record;

SELECT *
FROM aeroplane_game_record;

--@block
SELECT winner_user_id
FROM aeroplane_game_record
WHERE game_id >= 732;

--@block
SELECT game_id,
    u1.user_name,
    u2.user_name
FROM aeroplane_game_record AS a
    INNER JOIN (
        SELECT *
        FROM users_data
    ) AS u1 ON u1.user_id = a.player_1_user_id
    INNER JOIN (
        SELECT *
        FROM users_data
    ) AS u2 ON u2.user_id = a.player_2_user_id;