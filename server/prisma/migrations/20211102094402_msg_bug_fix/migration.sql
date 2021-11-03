-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "chatId" TEXT NOT NULL PRIMARY KEY,
    "messageId" TEXT,
    "time" TEXT NOT NULL DEFAULT '21 Sept 2021',
    "authorHandle" TEXT NOT NULL,
    "messageText" TEXT,
    "content" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_authorHandle_fkey" FOREIGN KEY ("authorHandle") REFERENCES "User" ("handle") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("authorHandle", "chatId", "content", "messageId", "read", "time") SELECT "authorHandle", "chatId", "content", "messageId", "read", "time" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
