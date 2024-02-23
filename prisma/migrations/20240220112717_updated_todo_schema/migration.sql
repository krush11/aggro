/*
  Warnings:

  - You are about to drop the `todos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "todo"."todos" DROP CONSTRAINT "todos_userID_fkey";

-- DropTable
DROP TABLE "todo"."todos";

-- CreateTable
CREATE TABLE "todo"."tasks" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedOn" TIMESTAMP(3),
    "userID" TEXT NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tasks_id_key" ON "todo"."tasks"("id");

-- AddForeignKey
ALTER TABLE "todo"."tasks" ADD CONSTRAINT "tasks_userID_fkey" FOREIGN KEY ("userID") REFERENCES "app"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
