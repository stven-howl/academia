ALTER TABLE "article_jel_code" ADD CONSTRAINT "article_jel_code_article_id_jel_code_id_pk" PRIMARY KEY("article_id","jel_code_id");--> statement-breakpoint
ALTER TABLE "all_articles" ADD COLUMN "views" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "all_articles" ADD CONSTRAINT "check_journal_year" CHECK ("all_articles"."journal_year" > 1900 and "all_articles"."journal_year" < 2100);--> statement-breakpoint
ALTER TABLE "all_articles" ADD CONSTRAINT "check_journal_month" CHECK (13 > "all_articles"."journal_month" and "all_articles"."journal_month" > 0);