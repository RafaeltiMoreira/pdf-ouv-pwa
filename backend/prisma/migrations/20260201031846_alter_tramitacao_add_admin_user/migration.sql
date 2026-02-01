/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `respostas` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `tramitacoes` table. All the data in the column will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adminUserId` to the `respostas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "respostas" DROP CONSTRAINT "respostas_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "tramitacoes" DROP CONSTRAINT "tramitacoes_usuarioId_fkey";

-- AlterTable
ALTER TABLE "respostas" DROP COLUMN "usuarioId",
ADD COLUMN     "adminUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tramitacoes" DROP COLUMN "usuarioId",
ADD COLUMN     "adminUserId" TEXT;

-- DropTable
DROP TABLE "usuarios";

-- AddForeignKey
ALTER TABLE "tramitacoes" ADD CONSTRAINT "tramitacoes_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "AdminUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
