/*
  Warnings:

  - You are about to drop the column `tools` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "app"."user" DROP COLUMN "tools";

-- CreateTable
CREATE TABLE "app"."tool" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "url" VARCHAR(50) NOT NULL,
    "image" VARCHAR(50) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "tags" VARCHAR(50)[] DEFAULT (ARRAY[]::character varying[])::character varying(50)[],
    "userId" VARCHAR(50) NOT NULL,

    CONSTRAINT "tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todo"."user" (
    "id" VARCHAR(50) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes"."user" (
    "id" VARCHAR(50) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tool_id_key" ON "app"."tool"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "todo"."user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "notes"."user"("id");

-- AddForeignKey
ALTER TABLE "app"."tool" ADD CONSTRAINT "tool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "app"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
