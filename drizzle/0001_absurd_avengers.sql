ALTER TABLE "categories" DROP CONSTRAINT "categories_FK_user_ID_users_id_fk";
--> statement-breakpoint
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_FK_category_ID_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_FK_user_ID_users_id_fk" FOREIGN KEY ("FK_user_ID") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_FK_category_ID_categories_id_fk" FOREIGN KEY ("FK_category_ID") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;