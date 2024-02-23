/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "notes"."users";

-- DropTable
DROP TABLE "todo"."users";

-- CreateTable
CREATE TABLE "todo"."todos" (
    "id" VARCHAR(50) NOT NULL,
    "title" VARCHAR NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userID" VARCHAR(50) NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "todos_id_key" ON "todo"."todos"("id");

-- AddForeignKey
ALTER TABLE "todo"."todos" ADD CONSTRAINT "todos_userID_fkey" FOREIGN KEY ("userID") REFERENCES "app"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
