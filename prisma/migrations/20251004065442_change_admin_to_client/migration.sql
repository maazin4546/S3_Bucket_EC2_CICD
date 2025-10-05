/*
  Warnings:

  - You are about to drop the `SuperAdmin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."SuperAdmin";

-- CreateTable
CREATE TABLE "Client" (
    "id" UUID NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mobileNumber" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "profilePicture" TEXT,
    "role" TEXT NOT NULL DEFAULT 'client',
    "otp" TEXT,
    "otpExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_mobileNumber_key" ON "Client"("mobileNumber");
