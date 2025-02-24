CREATE TABLE "all_articles" (
	"article_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "all_articles_article_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"author" text NOT NULL,
	"abstract" text NOT NULL,
	"journal_name" text NOT NULL,
	"journal_volume" text NOT NULL,
	"journal_year" integer NOT NULL,
	"journal_month" integer NOT NULL,
	"article_url" text NOT NULL,
	"doi" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "article_jel_code" (
	"article_id" bigint,
	"jel_code_id" bigint,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jel_code" (
	"jel_code_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "jel_code_jel_code_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"jel_code" text NOT NULL,
	"jel_code_name" text NOT NULL,
	"jel_code_sector1" text NOT NULL,
	"jel_code_sector1_name" text NOT NULL,
	"jel_code_sector2" text NOT NULL,
	"jel_code_sector2_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "article_jel_code" ADD CONSTRAINT "article_jel_code_article_id_all_articles_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."all_articles"("article_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "article_jel_code" ADD CONSTRAINT "article_jel_code_jel_code_id_jel_code_jel_code_id_fk" FOREIGN KEY ("jel_code_id") REFERENCES "public"."jel_code"("jel_code_id") ON DELETE cascade ON UPDATE cascade;