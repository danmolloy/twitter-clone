-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "tweetId" TEXT,
    "time" TEXT NOT NULL DEFAULT '1634217714',
    "notifiedUserHandle" TEXT NOT NULL,
    "sentFromUser" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Notification_notifiedUserHandle_fkey" FOREIGN KEY ("notifiedUserHandle") REFERENCES "User" ("handle") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Notification" ("id", "notifiedUserHandle", "read", "sentFromUser", "text", "time", "tweetId") SELECT "id", "notifiedUserHandle", "read", "sentFromUser", "text", coalesce("time", '1634217714') AS "time", "tweetId" FROM "Notification";
DROP TABLE "Notification";
ALTER TABLE "new_Notification" RENAME TO "Notification";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
