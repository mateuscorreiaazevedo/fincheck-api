ALTER TABLE "bank_accounts" ALTER COLUMN "account_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."account_type";--> statement-breakpoint
CREATE TYPE "public"."account_type" AS ENUM('CHECKING', 'INVESTMENT', 'CASH');--> statement-breakpoint
ALTER TABLE "bank_accounts" ALTER COLUMN "account_type" SET DATA TYPE "public"."account_type" USING "account_type"::"public"."account_type";