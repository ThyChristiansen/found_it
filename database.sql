
CREATE TABLE "user"
(
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR (80) UNIQUE NOT NULL,
        "email" VARCHAR (80) UNIQUE NOT NULL,
        "password" VARCHAR (80) NOT NULL,
        "given_name" VARCHAR (20)
);

CREATE TABLE house
(
        id SERIAL PRIMARY KEY,
        house_name VARCHAR (80) NOT NULL,
        user_id INT NOT NULL
                REFERENCES "user" (id)
        ON DELETE CASCADE
);

CREATE TABLE rooms
(
        id SERIAL PRIMARY KEY,
        room_name VARCHAR(100),
        user_id INT NOT NULL
                REFERENCES "user" (id)
        ON DELETE CASCADE
);
CREATE TABLE boxes
(
        id SERIAL PRIMARY KEY,
        room_id INT NOT NULL
                REFERENCES rooms (id)
        ON DELETE CASCADE,
        box_name int DEFAULT 1,
        qr_code int DEFAULT 1,
        status BOOLEAN DEFAULT FALSE
);
CREATE TABLE items
(
        id SERIAL PRIMARY KEY,
        item VARCHAR (100),
        room_id INT NOT NULL
                REFERENCES rooms (id)
        ON DELETE CASCADE,
        box_id INT NOT NULL
                REFERENCES boxes (id)
        ON DELETE CASCADE,
        user_id integer REFERENCES "user",
        picture VARCHAR(30)
);

