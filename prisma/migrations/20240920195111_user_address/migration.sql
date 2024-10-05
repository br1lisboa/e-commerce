-- DropIndex
DROP INDEX "Countries_id_key";

-- AlterTable
ALTER TABLE "Countries" ADD CONSTRAINT "Countries_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "UserAddress" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "direction2" TEXT,
    "cp" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "countriesId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAddress_userId_key" ON "UserAddress"("userId");

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_countriesId_fkey" FOREIGN KEY ("countriesId") REFERENCES "Countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
