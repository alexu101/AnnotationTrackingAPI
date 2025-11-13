/*
  Warnings:

  - You are about to drop the column `name` on the `Task` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Task_name_key";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "name";
