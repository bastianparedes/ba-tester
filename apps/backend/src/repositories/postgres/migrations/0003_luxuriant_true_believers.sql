ALTER TABLE "execution_groups" ADD COLUMN "wait_for_every_campaign_to_be_evaluated" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "execution_groups" ADD COLUMN "only_one_campaign_per_page_load" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "execution_groups" ADD COLUMN "only_campaigns_previously_executed" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "execution_groups" DROP COLUMN "persist_campaign_across_reloads";