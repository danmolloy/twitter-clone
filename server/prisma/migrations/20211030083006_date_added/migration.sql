-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL DEFAULT 'Hello world',
    "postDate" TEXT NOT NULL DEFAULT '21 Sept 2021',
    "authorHandle" TEXT NOT NULL,
    CONSTRAINT "Post_authorHandle_fkey" FOREIGN KEY ("authorHandle") REFERENCES "User" ("handle") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("authorHandle", "content", "id", "postDate") SELECT "authorHandle", "content", "id", "postDate" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE TABLE "new_User" (
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT 'password',
    "handle" TEXT NOT NULL PRIMARY KEY,
    "blurb" TEXT NOT NULL DEFAULT 'Click edit profile!',
    "joinDate" TEXT NOT NULL DEFAULT '21 Sept 2021',
    "bgPic" TEXT NOT NULL DEFAULT 'bgPic.jpg',
    "profilePic" TEXT NOT NULL DEFAULT 'profilePic.jpg'
);
INSERT INTO "new_User" ("bgPic", "blurb", "handle", "joinDate", "name", "password", "profilePic") SELECT "bgPic", "blurb", "handle", "joinDate", "name", "password", "profilePic" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
