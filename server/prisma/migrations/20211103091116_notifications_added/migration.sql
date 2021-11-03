-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "tweetId" TEXT NOT NULL DEFAULT '',
    "notifiedUserHandle" TEXT NOT NULL,
    "sentFromUser" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Notification_notifiedUserHandle_fkey" FOREIGN KEY ("notifiedUserHandle") REFERENCES "User" ("handle") ON DELETE RESTRICT ON UPDATE CASCADE
);
