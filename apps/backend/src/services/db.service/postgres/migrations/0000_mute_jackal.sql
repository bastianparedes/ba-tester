CREATE TYPE "public"."status_enum" AS ENUM('inactive', 'active', 'deleted');--> statement-breakpoint
CREATE TABLE "campaigns" (
	"id" serial PRIMARY KEY NOT NULL,
	"tenant_id" integer NOT NULL,
	"name" varchar(255) DEFAULT '' NOT NULL,
	"requirements" jsonb NOT NULL,
	"status" "status_enum" DEFAULT 'inactive' NOT NULL,
	"triggers" jsonb NOT NULL,
	"variations" jsonb NOT NULL,
	CONSTRAINT "campaigns_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(1024) NOT NULL,
	"domain" varchar(255) NOT NULL,
	CONSTRAINT "tenants_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE cascade;