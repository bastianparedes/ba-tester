CREATE TYPE "public"."execution_strategy_enum" AS ENUM('execute_all', 'execute_first', 'execute_random');--> statement-breakpoint
CREATE TABLE "execution_groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"strategy" "execution_strategy_enum" NOT NULL,
	"persist_campaign_across_reloads" boolean DEFAULT true NOT NULL,
	"tenant_id" integer NOT NULL,
	CONSTRAINT "execution_groups_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "campaigns" ADD COLUMN "execution_group_id" integer;--> statement-breakpoint
ALTER TABLE "execution_groups" ADD CONSTRAINT "execution_groups_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_execution_group_id_execution_groups_id_fk" FOREIGN KEY ("execution_group_id") REFERENCES "public"."execution_groups"("id") ON DELETE cascade ON UPDATE cascade;