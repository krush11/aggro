/*
  Warnings:

  - You are about to drop the column `title` on the `todos` table. All the data in the column will be lost.
  - Added the required column `task` to the `todos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todo"."todos" DROP COLUMN "title",
ADD COLUMN     "task" VARCHAR NOT NULL;
