/*
  Warnings:

  - Changed the type of `svg` on the `tools` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "app"."tools" DROP COLUMN "svg",
ADD COLUMN     "svg" XML NOT NULL;
