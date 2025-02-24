import { pgSchema, pgTable, timestamp, uuid, text, unique, bigint, primaryKey, pgEnum } from "drizzle-orm/pg-core";

export const users = pgSchema("auth").table("users", {
    id: uuid().primaryKey(),
});

export const degreeEnum = pgEnum("degree", ["On Bachelor Course", "Bachelor", "On Master Course", "Master", "On PhD Course", "PhD", "N/A"]);

export const profile_table = pgTable("profiles", {
    profile_id: uuid().primaryKey().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    avatar: text(),
    first_name: text().notNull(),
    last_name: text().notNull(),
    username: text().notNull(),
    major: text(),
    university: text(),
    degree: degreeEnum().default("N/A").notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
}, (table) => [
    unique("username_unique").on(table.username),
]);

