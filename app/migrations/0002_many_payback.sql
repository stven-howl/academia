CREATE TABLE "article_author" (
	"article_id" bigint,
	"author_id" bigint,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "article_author_article_id_author_id_pk" PRIMARY KEY("article_id","author_id")
);
--> statement-breakpoint
CREATE TABLE "author" (
	"author_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "author_author_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"author_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "article_author" ADD CONSTRAINT "article_author_article_id_all_articles_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."all_articles"("article_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "article_author" ADD CONSTRAINT "article_author_author_id_author_author_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."author"("author_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "all_articles" DROP COLUMN "author";