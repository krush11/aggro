/*
  Warnings:

  - The primary key for the `tools` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tooluser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `todos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `completed` on the `todos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "app"."tooluser" DROP CONSTRAINT "tooluser_toolID_fkey";

-- DropForeignKey
ALTER TABLE "app"."tooluser" DROP CONSTRAINT "tooluser_userID_fkey";

-- DropForeignKey
ALTER TABLE "todo"."todos" DROP CONSTRAINT "todos_userID_fkey";

-- AlterTable
ALTER TABLE "app"."tools" DROP CONSTRAINT "tools_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "description" SET DATA TYPE TEXT,
ALTER COLUMN "url" SET DATA TYPE TEXT,
ALTER COLUMN "category" SET DATA TYPE TEXT,
ALTER COLUMN "tags" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "tags" SET DATA TYPE TEXT[],
ALTER COLUMN "codename" SET DATA TYPE TEXT,
ALTER COLUMN "primaryColor" SET DATA TYPE TEXT,
ALTER COLUMN "secondaryColor" SET DATA TYPE TEXT,
ALTER COLUMN "tertiaryColor" SET DATA TYPE TEXT,
ADD CONSTRAINT "tools_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "app"."tooluser" DROP CONSTRAINT "tooluser_pkey",
ALTER COLUMN "userID" SET DATA TYPE TEXT,
ALTER COLUMN "toolID" SET DATA TYPE TEXT,
ADD CONSTRAINT "tooluser_pkey" PRIMARY KEY ("userID", "toolID");

-- AlterTable
ALTER TABLE "app"."users" ALTER COLUMN "firstName" SET DATA TYPE TEXT,
ALTER COLUMN "lastName" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "todo"."todos" DROP CONSTRAINT "todos_pkey",
DROP COLUMN "completed",
ADD COLUMN     "completedOn" TIMESTAMP(3),
ADD COLUMN     "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userID" SET DATA TYPE TEXT,
ALTER COLUMN "task" SET DATA TYPE TEXT,
ADD CONSTRAINT "todos_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "app"."tooluser" ADD CONSTRAINT "tooluser_userID_fkey" FOREIGN KEY ("userID") REFERENCES "app"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app"."tooluser" ADD CONSTRAINT "tooluser_toolID_fkey" FOREIGN KEY ("toolID") REFERENCES "app"."tools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo"."todos" ADD CONSTRAINT "todos_userID_fkey" FOREIGN KEY ("userID") REFERENCES "app"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
