-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Create Database named 'prime_app'

---- CREATE TABLES -------------------------------------------------

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
    "graded" BOOLEAN DEFAULT FALSE,
    "grading_service" INT REFERENCES grading_services_library,
    "grade_value" INT,
    "asking_price" DECIMAL(12,2),
    "notes" VARCHAR(1000),
    "offer_eligible" BOOLEAN DEFAULT FALSE,
    "trade_eligible" BOOLEAN DEFAULT FALSE,
    "tcg_mkt_price" DECIMAL(12,2),
    "ebay_mkt_price" DECIMAL(12,2)
    "timestamp_created" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN DEFAULT TRUE;
);

CREATE TABLE "offer" (
	"id" SERIAL PRIMARY KEY,
	"listing_id" INT REFERENCES "listing" NOT NULL,
	"buyer_user_id" INT REFERENCES "user" NOT NULL,
	"seller_user_id" INT REFERENCES "user" NOT NULL,
	"offer_amount" DECIMAL(12,2),
	"trade_desc" VARCHAR(1000),
	"notes" VARCHAR(1000),
	"status" VARCHAR(30),
	"offer_type" VARCHAR(30)
);

CREATE TABLE "condition_library" (
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR(20),
	"code" VARCHAR(3)
);


CREATE TABLE "grading_services_library" (
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR(50),
	"code" VARCHAR(5)
);


CREATE TABLE "image" (
	"id" SERIAL PRIMARY KEY,
	"listing_id" INT REFERENCES "listing" NOT NULL,
	"user_id" INT REFERENCES "user" NOT NULL,
	"url" VARCHAR(1000)
);


---- INSERT DATA FROM CSVs ------------------------------
