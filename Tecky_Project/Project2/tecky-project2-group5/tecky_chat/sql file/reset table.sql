--@block
DROP TABLE pre_game_room_user;

DROP TABLE pre_game_room_data;

DROP TABLE aeroplane_game_move_record;

DROP TABLE aeroplane_game_record;

DROP TABLE chatroom_users;

DROP TABLE message_data;

DROP TABLE chatroom;

DROP TABLE users_data;

--@block
CREATE TABLE "users_data"(
    "user_id" SERIAL PRIMARY KEY,
    "user_name" TEXT UNIQUE NOT NULL,
    "nickname" TEXT,
    "user_password" VARCHAR(255),
    "user_profilepic" TEXT
);

CREATE TABLE "chatroom"(
    "chatroom_id" SERIAL PRIMARY KEY,
    "chatroom_name" TEXT NOT NULL,
    "created_by_user_id" INTEGER NOT NULL
);

CREATE TABLE "message_data"(
    "message_id" SERIAL PRIMARY KEY,
    "chatroom_id" INTEGER NOT NULL,
    "created_at" timestamp WITH time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "message_content" TEXT,
    "is_code" BOOLEAN,
    "image" TEXT,
    "attachment" TEXT,
    FOREIGN KEY (chatroom_id) REFERENCES chatroom(chatroom_id),
    FOREIGN KEY (user_id) REFERENCES users_data(user_id)
);

CREATE TABLE "chatroom_users"(
    "chatroom_users_id" SERIAL PRIMARY KEY,
    "chatroom_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "time_of_login" TIMESTAMP WITH time zone,
    "time_of_logout" TIMESTAMP WITH time zone,
    "unread_msg" INTEGER,
    UNIQUE (chatroom_id, user_id),
    FOREIGN KEY (chatroom_id) REFERENCES chatroom(chatroom_id),
    FOREIGN KEY (user_id) REFERENCES users_data(user_id)
);

CREATE TABLE "aeroplane_game_record"(
    "game_id" SERIAL PRIMARY KEY,
    "player_1_user_id" INTEGER,
    "player_2_user_id" INTEGER,
    "player_3_user_id" INTEGER,
    "player_4_user_id" INTEGER,
    "create_at" timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP,
    "winner_user_id" INTEGER,
    FOREIGN KEY (player_1_user_id) REFERENCES users_data(user_id),
    FOREIGN KEY (player_2_user_id) REFERENCES users_data(user_id),
    FOREIGN KEY (player_3_user_id) REFERENCES users_data(user_id),
    FOREIGN KEY (player_4_user_id) REFERENCES users_data(user_id),
    FOREIGN KEY (winner_user_id) REFERENCES users_data(user_id)
);

CREATE TABLE "aeroplane_game_move_record"(
    "id" SERIAL PRIMARY KEY,
    "game_id" INTEGER NOT NULL,
    "turn" INTEGER NOT NULL,
    "roll_time" SMALLINT NOT NULL,
    "colour_code" SMALLINT NOT NULL,
    "roll_num" SMALLINT NOT NULL,
    "chess_id" SMALLINT,
    FOREIGN KEY (game_id) REFERENCES aeroplane_game_record(game_id)
);

--@block
CREATE TABLE pre_game_room_data(
    game_table_id SERIAL PRIMARY KEY,
    chatroom_id INTEGER NOT NULL,
    game_type SMALLINT NOT NULL,
    game_status VARCHAR NOT NULL,
    FOREIGN KEY (chatroom_id) REFERENCES chatroom(chatroom_id)
);

--@block
CREATE TABLE pre_game_room_user(
    game_table_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    UNIQUE (game_table_id, user_id),
    FOREIGN KEY (game_table_id) REFERENCES pre_game_room_data(game_table_id),
    FOREIGN KEY (user_id) REFERENCES users_data(user_id)
)