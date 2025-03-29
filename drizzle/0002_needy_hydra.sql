CREATE TABLE "sections" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sections_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "FK_section_ID" integer;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_FK_section_ID_sections_id_fk" FOREIGN KEY ("FK_section_ID") REFERENCES "public"."sections"("id") ON DELETE no action ON UPDATE no action;