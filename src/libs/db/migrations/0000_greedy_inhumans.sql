CREATE TABLE "Campaign" (
	"id" serial PRIMARY KEY NOT NULL,
	"lastModifiedDate" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"requirements" jsonb NOT NULL,
	"status" text DEFAULT 'inactive' NOT NULL,
	"triggers" jsonb NOT NULL,
	"variations" jsonb NOT NULL
);
