/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Configuration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Configuration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `Configuration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Configuration" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "roleId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Threshold" (
    "id" TEXT NOT NULL,
    "complexity" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "hours" INTEGER NOT NULL,
    "configurationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Threshold_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Configuration_name_key" ON "Configuration"("name");

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Threshold" ADD CONSTRAINT "Threshold_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "Configuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
