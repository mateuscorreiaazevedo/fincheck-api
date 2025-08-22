DROP INDEX "refresh_tokens_token_idx";--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD COLUMN "expires_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD COLUMN "issued_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "refresh_tokens" DROP COLUMN "token";