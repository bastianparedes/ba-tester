CREATE TABLE "track_events" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"get_data" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"multiple_times" boolean NOT NULL,
	"name" varchar(255) NOT NULL,
	"status" "status_enum" DEFAULT 'inactive' NOT NULL,
	"tenant_id" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" integer,
	CONSTRAINT "track_events_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "execution_groups" ADD COLUMN "status" "status_enum" DEFAULT 'inactive' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "status" "status_enum" DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "track_events" ADD CONSTRAINT "track_events_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "track_events" ADD CONSTRAINT "track_events_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "track_events" ADD CONSTRAINT "track_events_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;