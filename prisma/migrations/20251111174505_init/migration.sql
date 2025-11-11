/*
  Warnings:

  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "autoFileAssignation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "multipleFileAssignation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "priority" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Configuration" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FileToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FileToProject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ConfigurationToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ConfigurationToProject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FileToProject_B_index" ON "_FileToProject"("B");

-- CreateIndex
CREATE INDEX "_ConfigurationToProject_B_index" ON "_ConfigurationToProject"("B");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToProject" ADD CONSTRAINT "_FileToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToProject" ADD CONSTRAINT "_FileToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConfigurationToProject" ADD CONSTRAINT "_ConfigurationToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConfigurationToProject" ADD CONSTRAINT "_ConfigurationToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
