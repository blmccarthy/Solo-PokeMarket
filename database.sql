
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
    "first_name" VARCHAR(80),
    "last_name" VARCHAR(80),
    "city" VARCHAR(80),
    "state" VARCHAR(2),
    "profile_pic" VARCHAR(1000);
);

CREATE TABLE "listing" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user" NOT NULL,
    "card_name" VARCHAR (100),
    "set" VARCHAR(100),
    "condition" VARCHAR(3),
    "graded" BOOLEAN,
    "asking_price" DECIMAL(12,2),
    "notes" VARCHAR(1000),
    "offer_eligible" BOOLEAN,
    "trade_eligible" BOOLEAN,
    "tcg_mkt_price" DECIMAL(12,2),
    "ebay_mkt_price" DECIMAL(12,2)
);