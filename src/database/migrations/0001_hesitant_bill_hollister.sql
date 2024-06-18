ALTER TABLE "motorcycle" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "motorcycle" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;