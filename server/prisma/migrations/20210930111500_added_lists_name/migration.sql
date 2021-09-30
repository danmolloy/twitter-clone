-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_List" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'My List',
    "picture" TEXT NOT NULL DEFAULT 'bgPic.jpg',
    "description" TEXT NOT NULL DEFAULT 'My list of musicians',
    "private" BOOLEAN NOT NULL DEFAULT true,
    "authorHandle" TEXT NOT NULL,
    CONSTRAINT "List_authorHandle_fkey" FOREIGN KEY ("authorHandle") REFERENCES "User" ("handle") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_List" ("authorHandle", "description", "id", "picture", "private") SELECT "authorHandle", "description", "id", "picture", "private" FROM "List";
DROP TABLE "List";
ALTER TABLE "new_List" RENAME TO "List";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
