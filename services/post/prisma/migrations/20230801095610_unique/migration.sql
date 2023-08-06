/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[post_id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_user_id_key" ON "Post"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Post_post_id_key" ON "Post"("post_id");
