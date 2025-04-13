/*
  Warnings:

  - You are about to alter the column `sessionId` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `start` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "winningTeam" INTEGER,
    "start" DATETIME NOT NULL,
    "end" DATETIME,
    "sessionId" INTEGER NOT NULL
);
INSERT INTO "new_Game" ("id", "sessionId", "winningTeam") SELECT "id", "sessionId", "winningTeam" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE TABLE "new_GamePlayer" (
    "gameId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "team" INTEGER,

    PRIMARY KEY ("gameId", "playerId"),
    CONSTRAINT "GamePlayer_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GamePlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GamePlayer" ("gameId", "playerId", "team") SELECT "gameId", "playerId", "team" FROM "GamePlayer";
DROP TABLE "GamePlayer";
ALTER TABLE "new_GamePlayer" RENAME TO "GamePlayer";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
