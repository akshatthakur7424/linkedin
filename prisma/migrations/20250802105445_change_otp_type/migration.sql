/*
  Warnings:

  - The `otp` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "otp",
ADD COLUMN     "otp" INTEGER;
