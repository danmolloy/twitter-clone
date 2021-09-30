-- CreateTable
CREATE TABLE "List" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "picture" TEXT NOT NULL DEFAULT 'bgPic.jpg',
    "description" TEXT NOT NULL DEFAULT 'My list',
    "private" BOOLEAN NOT NULL DEFAULT true,
    "authorHandle" TEXT NOT NULL,
    CONSTRAINT "List_authorHandle_fkey" FOREIGN KEY ("authorHandle") REFERENCES "User" ("handle") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ListFollowers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "List" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("handle") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ListMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "List" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("handle") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ListFollowers_AB_unique" ON "_ListFollowers"("A", "B");

-- CreateIndex
CREATE INDEX "_ListFollowers_B_index" ON "_ListFollowers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ListMember_AB_unique" ON "_ListMember"("A", "B");

-- CreateIndex
CREATE INDEX "_ListMember_B_index" ON "_ListMember"("B");
