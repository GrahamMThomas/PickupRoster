/*
  Warnings:

  - You are about to drop the column `city` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `long` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Location` table. All the data in the column will be lost.
  - Added the required column `place_id` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Location" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "place_id" TEXT NOT NULL
);
INSERT INTO "new_Location" ("address", "id", "name") SELECT "address", "id", "name" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
CREATE TABLE "new_Meetup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "splashImage" TEXT,
    "locationId" TEXT,
    "orgId" TEXT NOT NULL,
    "rosterId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Meetup_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Meetup_rosterId_fkey" FOREIGN KEY ("rosterId") REFERENCES "Roster" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Meetup_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Meetup" ("createdAt", "description", "endDate", "id", "locationId", "orgId", "rosterId", "splashImage", "startDate", "title", "updatedAt") SELECT "createdAt", "description", "endDate", "id", "locationId", "orgId", "rosterId", "splashImage", "startDate", "title", "updatedAt" FROM "Meetup";
DROP TABLE "Meetup";
ALTER TABLE "new_Meetup" RENAME TO "Meetup";
CREATE UNIQUE INDEX "Meetup_rosterId_key" ON "Meetup"("rosterId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
