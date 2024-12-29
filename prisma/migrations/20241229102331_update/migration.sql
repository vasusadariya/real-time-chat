/*
  Warnings:

  - You are about to drop the `Friendship` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FriendshipToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MessageToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "_FriendshipToUser" DROP CONSTRAINT "_FriendshipToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FriendshipToUser" DROP CONSTRAINT "_FriendshipToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_MessageToUser" DROP CONSTRAINT "_MessageToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MessageToUser" DROP CONSTRAINT "_MessageToUser_B_fkey";

-- DropTable
DROP TABLE "Friendship";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "_FriendshipToUser";

-- DropTable
DROP TABLE "_MessageToUser";
