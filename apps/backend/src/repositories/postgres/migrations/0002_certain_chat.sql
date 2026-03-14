ALTER TABLE "campaigns" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "status" SET DEFAULT 'inactive'::text;--> statement-breakpoint
DROP TYPE "public"."status_enum";--> statement-breakpoint
CREATE TYPE "public"."status_enum" AS ENUM('inactive', 'active');--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "status" SET DEFAULT 'inactive'::"public"."status_enum";--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "status" SET DATA TYPE "public"."status_enum" USING "status"::"public"."status_enum";