-- CreateTable
CREATE TABLE "SuperAdmin" (
    "id" UUID NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mobileNumber" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "profilePicture" TEXT,
    "role" TEXT NOT NULL DEFAULT 'superAdmin',
    "otp" TEXT,
    "otpExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_email_key" ON "SuperAdmin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_mobileNumber_key" ON "SuperAdmin"("mobileNumber");
