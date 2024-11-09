import { mysqlTable, int, varchar, timestamp,text } from "drizzle-orm/mysql-core"

export const users = mysqlTable('users', {
  id: int().primaryKey().autoincrement(),
  name: varchar('name',{length:100}).notNull(),
  email: varchar('email',{length:100}).notNull().unique(),
  create_at: timestamp('create_at').notNull().defaultNow(),
});

export const posts = mysqlTable('posts', {
  id: int().primaryKey().autoincrement(),
  title: varchar('title', {length:200}).notNull(),
  content: text('content').notNull(),
  user_id: int('user_id').references(()=> users.id),
  create_at: timestamp('create_at').notNull().defaultNow(),
})