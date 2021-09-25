-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "name" TEXT NOT NULL,
    "handle" TEXT NOT NULL PRIMARY KEY,
    "blurb" TEXT NOT NULL DEFAULT 'hello'
);
INSERT INTO "new_User" ("handle", "name") SELECT "handle", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
