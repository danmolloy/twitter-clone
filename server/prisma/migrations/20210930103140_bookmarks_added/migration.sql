-- CreateTable
CREATE TABLE "_Bookmarks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("handle") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_Bookmarks_AB_unique" ON "_Bookmarks"("A", "B");

-- CreateIndex
CREATE INDEX "_Bookmarks_B_index" ON "_Bookmarks"("B");
