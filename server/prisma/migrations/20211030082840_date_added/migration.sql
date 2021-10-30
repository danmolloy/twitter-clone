/*
  Warnings:

  - You are about to drop the `List` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ListFollowers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ListMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `joinDate` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `postDate` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- DropIndex
DROP INDEX "_ListFollowers_B_index";

-- DropIndex
DROP INDEX "_ListFollowers_AB_unique";

-- DropIndex
DROP INDEX "_ListMember_B_index";

-- DropIndex
DROP INDEX "_ListMember_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "List";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ListFollowers";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ListMember";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT 'password',
    "handle" TEXT NOT NULL PRIMARY KEY,
    "blurb" TEXT NOT NULL DEFAULT 'Click edit profile!',
    "joinDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bgPic" TEXT NOT NULL DEFAULT 'bgPic.jpg',
    "profilePic" TEXT NOT NULL DEFAULT 'profilePic.jpg'
);
INSERT INTO "new_User" ("bgPic", "blurb", "handle", "joinDate", "name", "password", "profilePic") SELECT "bgPic", "blurb", "handle", "joinDate", "name", "password", "profilePic" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL DEFAULT 'Hello world',
    "postDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorHandle" TEXT NOT NULL,
    CONSTRAINT "Post_authorHandle_fkey" FOREIGN KEY ("authorHandle") REFERENCES "User" ("handle") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("authorHandle", "content", "id", "postDate") SELECT "authorHandle", "content", "id", "postDate" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
