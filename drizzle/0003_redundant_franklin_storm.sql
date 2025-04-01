CREATE TABLE "payrate" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "payrate_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"rate" varchar(10) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "FK_payrate_ID" integer;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_FK_payrate_ID_payrate_id_fk" FOREIGN KEY ("FK_payrate_ID") REFERENCES "public"."payrate"("id") ON DELETE no action ON UPDATE no action;