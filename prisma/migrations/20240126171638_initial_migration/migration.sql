-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "app";

-- CreateTable
CREATE TABLE "app"."user" (
    "id" VARCHAR(50) NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50),
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "tools" VARCHAR(50)[] DEFAULT (ARRAY[]::character varying[])::character varying(50)[],

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "app"."user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "app"."user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "app"."user"("email");
