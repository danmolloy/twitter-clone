-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "name" TEXT NOT NULL,
    "handle" TEXT NOT NULL PRIMARY KEY,
    "blurb" TEXT NOT NULL DEFAULT 'hello',
    "joinDate" TEXT NOT NULL DEFAULT '21 Sept 2021',
    "bgPic" TEXT NOT NULL DEFAULT 'bgPic.jpg',
    "profilePic" TEXT NOT NULL DEFAULT 'profilePic.jpg'
);
INSERT INTO "new_User" ("blurb", "handle", "name") SELECT "blurb", "handle", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
