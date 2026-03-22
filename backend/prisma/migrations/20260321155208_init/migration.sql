/*
  Warnings:

  - Changed the type of `avg_daily_income` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "avg_daily_income",
ADD COLUMN     "avg_daily_income" DECIMAL(7,2) NOT NULL;
