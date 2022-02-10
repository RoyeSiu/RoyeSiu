/*-------------------------Reminder Create DataBase Frist-----------------------*/
/*-----------------------------Create Table-------------------------------------*/
CREATE TABLE "users_data"(
    "user_id" SERIAL  PRIMARY KEY,
    "user_name" TEXT NOT NULL,
    "Nickname" INTEGER NULL,
    "user_password" VARCHAR(255) NOT NULL,
    "user_profilepic" TEXT NULL
);
ALTER TABLE
    "users_data" ADD CONSTRAINT "users_data_user_name_unique" UNIQUE("user_name");
CREATE TABLE "chatroom"(
    "chatroom_id" SERIAL  PRIMARY KEY,
    "chatroom_name" TEXT NOT NULL,
    "create_by_user" INTEGER NOT NULL,
    FOREIGN KEY("create_by_user") REFERENCES "users_data"("user_id")
);
ALTER TABLE
    "chatroom" ADD CONSTRAINT "chatroom_chatroom_name_unique" UNIQUE("chatroom_name");
CREATE TABLE "message_data"(
    "message_id" SERIAL  PRIMARY KEY,
    "chatroom_id" INTEGER NOT NULL,
    FOREIGN KEY("chatroom_id") REFERENCES "chatroom"("chatroom_id"),
    "created_at" TIME(0) WITHOUT TIME ZONE NOT NULL,
    "create_by_user" INTEGER NOT NULL,
    FOREIGN KEY("create_by_user") REFERENCES "users_data"("user_id"),
    "message_content" TEXT NULL,
    "is_code" BOOLEAN NULL,
    "image" TEXT NULL,
    "attachment" TEXT NULL
);
CREATE TABLE "chatroom_users"(
    "chatroom_users_id" SERIAL PRIMARY KEY,
    "chatroom_id" INTEGER NOT NULL,
    FOREIGN KEY("chatroom_id") REFERENCES "chatroom"("chatroom_id"),
    "user_id" INTEGER NOT NULL,
    FOREIGN KEY("user_id") REFERENCES "users_data"("user_id"),
    "time_of_login" TIME(0) WITHOUT TIME ZONE NULL,
    "time_of_logout" TIME(0) WITHOUT TIME ZONE NULL,
    "unread_msg" INTEGER NULL
);
/********************************************************************************************/

