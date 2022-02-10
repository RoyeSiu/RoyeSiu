--@block
-- test add user
INSERT INTO users_data (user_name, nickname, user_password)
VALUES (
        'chuen',
        'chuen',
        '$2a$10$5A/hkP8Z13U7NR54a18XjuU/42jdAalz1ta9ktAI/bktQxVoyFQ1K'
    );

INSERT INTO users_data (user_name, nickname, user_password)
VALUES (
        'roye',
        'roye',
        '$2a$10$Wb9ZG8JUlU4cEu6XSDuxR.b5nWYlUelqbviu2XmEQYqp7EGDX.jYy'
    );

INSERT INTO users_data (user_name, nickname, user_password)
VALUES (
        'tony',
        'tony',
        '$2a$10$T0EL2QzYPyaQnkcs3w8m6.M1JRT6CZvKF.xo5x7nzns/Fpi6YFfM6'
    );

INSERT INTO users_data (user_name, nickname, user_password)
VALUES (
        'chuen2',
        'chuen2',
        '$2a$10$WB8Vfc5xZGAjwlMLi0jt.Oy1o/HoADQ0lAeaGSYXsVbHkUAl.py.O'
    );

INSERT INTO users_data (user_name, nickname, user_password)
VALUES (
        'roye2',
        'roye2',
        '$2a$10$.YJNCAOs5NBKRDOm4U80mOFzRljVeH4kZBy4IDGh.Wx7Zua8bdh2O'
    );

INSERT INTO users_data (user_name, nickname, user_password)
VALUES (
        'tony2',
        'tony2',
        '$2a$10$1q9jBHoCAy7OW4IfTXYV9O8eQvtLYX8PkKmBsuwhzUEKHIiHm/y6.'
    );

INSERT INTO users_data (user_name, nickname, user_password)
VALUES (
        'chuen3',
        'chuen3',
        '$2a$10$Xuo8mc2Kga2PnxkrnzC/s.dodM4usi3Maqpql2Of04EzfI5je5Dla'
    );

INSERT INTO users_data (user_name, nickname, user_password)
VALUES (
        'roye3',
        'roye3',
        '$2a$10$dKA4l3GSiWNzEa9hsTPFeucClRxlHHUbO0K7EOOrUEif0EI48DLxC'
    );

INSERT INTO users_data (user_name, nickname, user_password)
VALUES (
        'tony3',
        'tony3',
        '$2a$10$Ubzsz3eVodwjxhnp1.QjlOIRcLykYMJZmK.cjDTrz8Ng7dW0txUh6'
    );

INSERT INTO users_data (user_name, nickname, user_password)
VALUES (
        'chuen4',
        'chuen4',
        '$2a$10$f6Gio1Pi5V06FXxp9eHKUe1RPSpJqKaaRdHDRD2AONNb1cIuaDpYK'
    );

INSERT INTO users_data (user_name, nickname, user_password)
VALUES (
        'roye4',
        'roye4',
        '$2a$10$CKXR7TemZkB2Sk5v/iGbzelTN.Zt/O9AYAvnTf4W7KyLkjV9pGeyy'
    );

INSERT INTO users_data (user_name, nickname, user_password)
VALUES (
        'tony4',
        'tony4',
        '$2a$10$cQguwpOBEWhHvmxJNq8OWepRhCmN4H4IebAoT1bdf1XN7lfgGD6mG'
    );
--@block
-- test add chatroom
INSERT INTO chatroom (chatroom_name, created_by_user_id)
VALUES ('test room 1', '1');

INSERT INTO chatroom (chatroom_name, created_by_user_id)
VALUES ('test room 4', '1');

INSERT INTO chatroom (chatroom_name, created_by_user_id)
VALUES ('test room 5', '1');

INSERT INTO chatroom (chatroom_name, created_by_user_id)
VALUES ('test room 6', '1');

INSERT INTO chatroom (chatroom_name, created_by_user_id)
VALUES ('test room 8', '1');

INSERT INTO chatroom (chatroom_name, created_by_user_id)
VALUES ('test room 2', '2');

INSERT INTO chatroom (chatroom_name, created_by_user_id)
VALUES ('test room 3', '3');

INSERT INTO chatroom (chatroom_name, created_by_user_id)
VALUES ('test room 4', '4');

-- test add chatroom_users
INSERT INTO chatroom_users (chatroom_id, user_id)
VALUES ('1', '1');

INSERT INTO chatroom_users (chatroom_id, user_id)
VALUES ('1', '2');

INSERT INTO chatroom_users (chatroom_id, user_id)
VALUES ('1', '3');

INSERT INTO chatroom_users (chatroom_id, user_id)
VALUES ('1', '4');

INSERT INTO chatroom_users (chatroom_id, user_id)
VALUES ('2', '5');

INSERT INTO chatroom_users (chatroom_id, user_id)
VALUES ('2', '6');

INSERT INTO chatroom_users (chatroom_id, user_id)
VALUES ('2', '7');

INSERT INTO chatroom_users (chatroom_id, user_id)
VALUES ('2', '8');

INSERT INTO chatroom_users (chatroom_id, user_id)
VALUES ('3', '9');

INSERT INTO chatroom_users (chatroom_id, user_id)
VALUES ('3', '10');

INSERT INTO chatroom_users (chatroom_id, user_id)
VALUES ('3', '11');

INSERT INTO chatroom_users (chatroom_id, user_id)
VALUES ('3', '12');

INSERT INTO chatroom_users (chatroom_id, user_id)
VALUES ('4', '1');

INSERT INTO chatroom_users (chatroom_id, user_id)
VALUES ('4', '4');

INSERT INTO chatroom_users (chatroom_id, user_id)
VALUES ('4', '7');

INSERT INTO chatroom_users (chatroom_id, user_id)
VALUES ('4', '2');

-- test add message
INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
VALUES ('1', '1', 'chuen said hi test room 1', false);

INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
VALUES ('1', '2', 'roye said hello test room 1', false);

INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
VALUES (
        '1',
        '2',
        'roye said hello x2 test room 1',
        false
    );

INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
VALUES ('2', '5', 'roye2 said hi test room 2', false);

INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
VALUES ('2', '6', 'tony2 said hello test room 2', false);

INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
VALUES ('3', '9', 'tony3 said hi test room 3', false);

INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
VALUES (
        '3',
        '10',
        'chuen4 said hello test room 3',
        false
    );

--@block
-- test add game
INSERT INTO aeroplane_game_record (
        player_1_user_id,
        player_2_user_id,
        player_3_user_id
    )
VALUES ('1', '2', '3');

INSERT INTO aeroplane_game_record (
        player_1_user_id,
        player_2_user_id,
        player_3_user_id,
        player_4_user_id
    )
VALUES ('5', '6', '7', '8');

INSERT INTO aeroplane_game_record (
        player_1_user_id,
        player_2_user_id,
        player_3_user_id,
        player_4_user_id
    )
VALUES ('9', '10', '11', '12');

--@block
-- test update  game
UPDATE aeroplane_game_record
SET winner_user_id = 1
WHERE game_id = 1;

UPDATE aeroplane_game_record
SET player_4_user_id = 4
WHERE game_id = 1;

UPDATE aeroplane_game_record
SET winner_user_id = 5
WHERE game_id = 2;

UPDATE aeroplane_game_record
SET winner_user_id = 9
WHERE game_id = 3;

--@block
-- test add move data
INSERT INTO aeroplane_game_move_record (game_id, turn, roll_time, colour_code, roll_num)
VALUES ('1', '1', '0', '0', '2');

INSERT INTO aeroplane_game_move_record (
        game_id,
        turn,
        roll_time,
        colour_code,
        roll_num,
        chess_id
    )
VALUES ('1', '2', '0', '1', '6', '2');

INSERT INTO aeroplane_game_move_record (
        game_id,
        turn,
        roll_time,
        colour_code,
        roll_num,
        chess_id
    )
VALUES ('1', '2', '1', '1', '2', '2');

--@block
-- test pre game data
INSERT INTO pre_game_room_data (
        chatroom_id,
        game_type,
        game_status
    )
VALUES (38, 0, 'waiting join'),
    (38, 1, 'waiting join'),
    (38, 2, 'waiting join'),
    (38, 3, 'waiting join'),
    (38, 4, 'waiting join'),
    (39, 0, 'waiting join'),
    (39, 1, 'waiting join'),
    (39, 2, 'waiting join'),
    (39, 3, 'waiting join'),
    (39, 4, 'waiting join');

INSERT INTO pre_game_room_user (game_table_id, user_id)
VALUES (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (2, 1),
    (2, 2),
    (2, 3),
    (2, 4),
    (3, 1),
    (3, 2),
    (3, 3),
    (3, 4),
    (4, 1),
    (4, 2),
    (4, 3),
    (4, 4),
    (5, 1),
    (5, 2),
    (5, 3),
    (5, 4),
    (6, 1),
    (6, 2),
    (6, 3),
    (6, 4),
    (7, 1),
    (7, 2),
    (7, 3),
    (7, 4),
    (8, 1),
    (8, 2),
    (8, 3),
    (8, 4),
    (9, 1),
    (9, 2),
    (9, 3),
    (10, 1);


--@block
    INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
VALUES ('4', '2', 'search test message_data message_data', false);
    INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
VALUES ('4', '2', 'message_data search test message_data', false);
    INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
VALUES ('4', '2', 'message_data message_data search test', false);
    INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
VALUES ('4', '2', 'chatroomRouter.post("/searchMessage", searchMessage);', TRUE);
    INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
VALUES ('6', '2', 'search test message_data message_data', false);
    INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
VALUES ('6', '2', 'message_data search test message_data', false);
    INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
VALUES ('4', '4', 'message_data message_data search test', false);
    INSERT INTO message_data (chatroom_id, user_id, message_content, is_code)
VALUES ('4', '4', 'chatroomRouter.post("/searchMessage", searchMessage);', TRUE);