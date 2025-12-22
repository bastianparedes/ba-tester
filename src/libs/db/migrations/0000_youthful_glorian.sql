CREATE TYPE "public"."status_enum" AS ENUM('inactive', 'active', 'deleted');--> statement-breakpoint
CREATE TABLE "campaigns" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) DEFAULT '' NOT NULL,
	"requirements" jsonb NOT NULL,
	"status" "status_enum" DEFAULT 'inactive' NOT NULL,
	"triggers" jsonb NOT NULL,
	"variations" jsonb NOT NULL,
	CONSTRAINT "campaigns_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
