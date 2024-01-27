/*
  Warnings:

  - Added the required column `codename` to the `tools` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "app"."tools" ADD COLUMN     "codename" VARCHAR(50) NOT NULL;
