DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('in_stock', 'out_of_stock', 'in_transit');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "motorcycle" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar NOT NULL,
	"model" varchar NOT NULL,
	"price" integer NOT NULL,
	"color" varchar NOT NULL,
	"status" "status" NOT NULL,
	CONSTRAINT "motorcycle_code_unique" UNIQUE("code")
);
