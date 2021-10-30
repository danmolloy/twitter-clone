-- RedefineTables
PRAGMA foreign_keys=OFF;
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
