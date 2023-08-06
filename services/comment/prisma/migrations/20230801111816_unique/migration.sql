/*
  Warnings:

  - A unique constraint covering the columns `[comment_id]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Comment_post_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Comment_comment_id_key" ON "Comment"("comment_id");
