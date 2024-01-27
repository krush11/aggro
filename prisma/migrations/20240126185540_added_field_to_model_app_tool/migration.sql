/*
  Warnings:

  - You are about to drop the `tool` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "app"."tooluser" DROP CONSTRAINT "tooluser_toolID_fkey";

-- DropForeignKey
ALTER TABLE "app"."tooluser" DROP CONSTRAINT "tooluser_userID_fkey";

-- DropTable
DROP TABLE "app"."tool";

-- DropTable
DROP TABLE "app"."user";

-- DropTable
DROP TABLE "notes"."user";

-- DropTable
DROP TABLE "todo"."user";

-- CreateTable
CREATE TABLE "app"."users" (
    "id" VARCHAR(50) NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50),
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app"."tools" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "url" VARCHAR(50) NOT NULL,
    "category" VARCHAR(50),
    "svg" VARCHAR(500) NOT NULL,
    "tags" VARCHAR(50)[] DEFAULT (ARRAY[]::character varying[])::character varying(50)[],

    CONSTRAINT "tools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todo"."users" (
    "id" VARCHAR(50) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes"."users" (
    "id" VARCHAR(50) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "app"."users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "app"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "app"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tools_id_key" ON "app"."tools"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "todo"."users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "notes"."users"("id");

-- AddForeignKey
ALTER TABLE "app"."tooluser" ADD CONSTRAINT "tooluser_userID_fkey" FOREIGN KEY ("userID") REFERENCES "app"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app"."tooluser" ADD CONSTRAINT "tooluser_toolID_fkey" FOREIGN KEY ("toolID") REFERENCES "app"."tools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
