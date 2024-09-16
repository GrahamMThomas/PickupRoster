-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME,
    "locationId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "AttendanceLog" (
    "start" DATETIME NOT NULL,
    "end" DATETIME,
    "playerId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,

    PRIMARY KEY ("playerId", "sessionId")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "winningTeam" INTEGER
);

-- CreateTable
CREATE TABLE "GamePlayer" (
    "gameId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "team" INTEGER,

    PRIMARY KEY ("gameId", "playerId"),
    CONSTRAINT "GamePlayer_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");
