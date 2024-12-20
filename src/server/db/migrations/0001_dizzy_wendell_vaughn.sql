DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('admin', 'owner', 'user', 'investigator', 'staff', 'paid', 'blocked');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "trpc-test_user" ADD COLUMN "roles" user_role[] DEFAULT '{"user"}' NOT NULL;