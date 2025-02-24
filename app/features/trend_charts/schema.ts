import { sql } from "drizzle-orm";
import { pgTable, text, bigint, timestamp, integer, primaryKey, check, uuid } from "drizzle-orm/pg-core";
import { profile_table } from "../users/schema";

export const all_articles_table = pgTable("all_articles", {
    article_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    title: text().notNull(),
    abstract: text().notNull(),
    journal_name: text().notNull(),
    journal_volume: text().notNull(),
    journal_pages: text().notNull(),
    journal_year: integer().notNull(),
    journal_month: integer().notNull(),
    article_url: text().notNull(),
    doi: text().notNull(),
    views: integer().notNull().default(0),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
}, (table) => [
    check("check_journal_year", sql`${table.journal_year} > 1900 and ${table.journal_year} < 2100`),
    check("check_journal_month", sql`13 > ${table.journal_month} and ${table.journal_month} > 0`),
]);

export const jel_code_table = pgTable("jel_code", {
    jel_code_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    jel_code: text().notNull(),
    jel_code_name: text().notNull(),
    jel_code_sector1: text().notNull(),
    jel_code_sector1_name: text().notNull(), 
    jel_code_sector2: text().notNull(),
    jel_code_sector2_name: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
});

export const article_jel_code_table = pgTable("article_jel_code", {
    article_id: bigint({ mode: "number" })
        .references(() => all_articles_table.article_id, { onDelete: "cascade", onUpdate: "cascade" }),
    jel_code_id: bigint({ mode: "number" })
        .references(() => jel_code_table.jel_code_id, { onDelete: "cascade", onUpdate: "cascade" }),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
}, (table) => [
    primaryKey({ columns: [table.article_id, table.jel_code_id] })
]);

export const author_table = pgTable("author", {
    author_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    author_name: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
});

export const article_author_table = pgTable("article_author", {
    article_id: bigint({ mode: "number" })
        .references(() => all_articles_table.article_id, { onDelete: "cascade", onUpdate: "cascade" }),
    author_id: bigint({ mode: "number" })
        .references(() => author_table.author_id, { onDelete: "cascade", onUpdate: "cascade" }),
    created_at: timestamp().notNull().defaultNow(),
}, (table) => [
    primaryKey({ columns: [table.article_id, table.author_id] })
]);


export const profile_save_article_table = pgTable("profile_save_article", {
    profile_id: uuid().references(() => profile_table.profile_id, { onDelete: "cascade", onUpdate: "cascade" }),
    article_id: bigint({ mode: "number" }).references(() => all_articles_table.article_id, { onDelete: "cascade", onUpdate: "cascade" }),
    created_at: timestamp().notNull().defaultNow(),
    }, (table) => [
    primaryKey({ columns: [table.profile_id, table.article_id] })
]);
