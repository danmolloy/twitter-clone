-- CreateTable
CREATE TABLE "Comment" (
    "commentId" TEXT NOT NULL PRIMARY KEY,
    "postId" TEXT NOT NULL,
    "authorHandle" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_authorHandle_fkey" FOREIGN KEY ("authorHandle") REFERENCES "User" ("handle") ON DELETE RESTRICT ON UPDATE CASCADE
);
