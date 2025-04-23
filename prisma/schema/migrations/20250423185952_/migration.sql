/*
  Warnings:

  - You are about to drop the column `place_id` on the `Location` table. All the data in the column will be lost.
  - Added the required column `placeId` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Location" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "placeId" TEXT NOT NULL
);
INSERT INTO "new_Location" ("address", "id", "name") SELECT "address", "id", "name" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
