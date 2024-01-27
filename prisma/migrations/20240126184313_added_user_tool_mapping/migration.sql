/*
  Warnings:

  - You are about to drop the column `userId` on the `tool` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "app"."tool" DROP CONSTRAINT "tool_userId_fkey";

-- AlterTable
ALTER TABLE "app"."tool" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "app"."tooluser" (
    "userID" VARCHAR(50) NOT NULL,
    "toolID" VARCHAR(50) NOT NULL,

    CONSTRAINT "tooluser_pkey" PRIMARY KEY ("userID","toolID")
);

-- AddForeignKey
ALTER TABLE "app"."tooluser" ADD CONSTRAINT "tooluser_userID_fkey" FOREIGN KEY ("userID") REFERENCES "app"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app"."tooluser" ADD CONSTRAINT "tooluser_toolID_fkey" FOREIGN KEY ("toolID") REFERENCES "app"."tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
