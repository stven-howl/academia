CREATE TYPE "degree" AS ENUM('On Bachelor Course', 'Bachelor', 'On Master Course', 'Master', 'On PhD Course', 'PhD', 'N/A');
--> statement-breakpoint
CREATE TABLE "profile_save_article" (
	"profile_id" uuid,
	"article_id" bigint,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profile_save_article_profile_id_article_id_pk" PRIMARY KEY("profile_id","article_id")
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"profile_id" uuid PRIMARY KEY NOT NULL,
	"avatar" text,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"username" text NOT NULL,
	"major" text,
	"university" text,
	"degree" "degree" DEFAULT 'N/A' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "profile_save_article" ADD CONSTRAINT "profile_save_article_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "profile_save_article" ADD CONSTRAINT "profile_save_article_article_id_all_articles_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."all_articles"("article_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_profile_id_users_id_fk" FOREIGN KEY ("profile_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;