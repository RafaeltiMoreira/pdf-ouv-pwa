-- CreateEnum
CREATE TYPE "TipoManifestacao" AS ENUM ('DENUNCIA', 'RECLAMACAO', 'SUGESTAO', 'ELOGIO', 'SOLICITACAO', 'INFORMACAO');

-- CreateEnum
CREATE TYPE "StatusManifestacao" AS ENUM ('RECEBIDA', 'EM_ANALISE', 'RESPONDIDA', 'CONCLUIDA', 'ARQUIVADA');

-- CreateEnum
CREATE TYPE "PrioridadeManifestacao" AS ENUM ('BAIXA', 'MEDIA', 'ALTA', 'URGENTE');

-- CreateEnum
CREATE TYPE "TipoAnexo" AS ENUM ('DOCUMENTO', 'IMAGEM', 'AUDIO', 'VIDEO', 'OUTRO');

-- CreateTable
CREATE TABLE "manifestacoes" (
    "id" TEXT NOT NULL,
    "protocolo" TEXT NOT NULL,
    "assunto" VARCHAR(120) NOT NULL,
    "conteudo" TEXT NOT NULL,
    "anonimo" BOOLEAN NOT NULL DEFAULT false,
    "tipo" "TipoManifestacao",
    "prioridade" "PrioridadeManifestacao" NOT NULL DEFAULT 'MEDIA',
    "status" "StatusManifestacao" NOT NULL DEFAULT 'RECEBIDA',
    "orgaoResponsavel" VARCHAR(255),
    "categoria" VARCHAR(100),
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cidadaoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "prazoResposta" TIMESTAMP(3),
    "respondidaEm" TIMESTAMP(3),

    CONSTRAINT "manifestacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cidadaos" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(14),
    "email" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(20),
    "endereco" VARCHAR(255),
    "cidade" VARCHAR(100),
    "estado" VARCHAR(2),
    "cep" VARCHAR(9),
    "senha" VARCHAR(255),
    "emailVerificado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "cidadaos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anexos" (
    "id" TEXT NOT NULL,
    "nomeOriginal" VARCHAR(255) NOT NULL,
    "nomeArmazenado" VARCHAR(255) NOT NULL,
    "caminho" VARCHAR(500) NOT NULL,
    "tipo" "TipoAnexo" NOT NULL,
    "mimeType" VARCHAR(100) NOT NULL,
    "tamanho" INTEGER NOT NULL,
    "descricao" TEXT,
    "manifestacaoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "anexos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tramitacoes" (
    "id" TEXT NOT NULL,
    "statusAnterior" "StatusManifestacao" NOT NULL,
    "statusNovo" "StatusManifestacao" NOT NULL,
    "observacao" TEXT,
    "usuarioId" TEXT,
    "manifestacaoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tramitacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "respostas" (
    "id" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "publico" BOOLEAN NOT NULL DEFAULT true,
    "usuarioId" TEXT NOT NULL,
    "manifestacaoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "respostas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interacoes" (
    "id" TEXT NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,
    "conteudo" TEXT NOT NULL,
    "avaliacao" INTEGER,
    "manifestacaoId" TEXT NOT NULL,
    "cidadaoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classificacoes_ia" (
    "id" TEXT NOT NULL,
    "tipoSugerido" "TipoManifestacao" NOT NULL,
    "prioridadeSugerida" "PrioridadeManifestacao" NOT NULL,
    "orgaoSugerido" VARCHAR(255),
    "categoriaSugerida" VARCHAR(100),
    "tagsSugeridas" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "confianca" DOUBLE PRECISION NOT NULL,
    "modeloUtilizado" VARCHAR(100) NOT NULL,
    "versaoModelo" VARCHAR(50) NOT NULL,
    "manifestacaoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classificacoes_ia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "perfil" VARCHAR(50) NOT NULL,
    "orgao" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs_acesso" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT,
    "ip" VARCHAR(45) NOT NULL,
    "userAgent" TEXT NOT NULL,
    "rota" VARCHAR(255) NOT NULL,
    "metodo" VARCHAR(10) NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "tempoResposta" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_acesso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "manifestacoes_protocolo_key" ON "manifestacoes"("protocolo");

-- CreateIndex
CREATE INDEX "manifestacoes_protocolo_idx" ON "manifestacoes"("protocolo");

-- CreateIndex
CREATE INDEX "manifestacoes_status_idx" ON "manifestacoes"("status");

-- CreateIndex
CREATE INDEX "manifestacoes_tipo_idx" ON "manifestacoes"("tipo");

-- CreateIndex
CREATE INDEX "manifestacoes_cidadaoId_idx" ON "manifestacoes"("cidadaoId");

-- CreateIndex
CREATE INDEX "manifestacoes_createdAt_idx" ON "manifestacoes"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "cidadaos_cpf_key" ON "cidadaos"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "cidadaos_email_key" ON "cidadaos"("email");

-- CreateIndex
CREATE INDEX "cidadaos_email_idx" ON "cidadaos"("email");

-- CreateIndex
CREATE INDEX "cidadaos_cpf_idx" ON "cidadaos"("cpf");

-- CreateIndex
CREATE INDEX "anexos_manifestacaoId_idx" ON "anexos"("manifestacaoId");

-- CreateIndex
CREATE INDEX "tramitacoes_manifestacaoId_idx" ON "tramitacoes"("manifestacaoId");

-- CreateIndex
CREATE INDEX "tramitacoes_createdAt_idx" ON "tramitacoes"("createdAt");

-- CreateIndex
CREATE INDEX "respostas_manifestacaoId_idx" ON "respostas"("manifestacaoId");

-- CreateIndex
CREATE INDEX "interacoes_manifestacaoId_idx" ON "interacoes"("manifestacaoId");

-- CreateIndex
CREATE UNIQUE INDEX "classificacoes_ia_manifestacaoId_key" ON "classificacoes_ia"("manifestacaoId");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");

-- CreateIndex
CREATE INDEX "usuarios_email_idx" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "logs_acesso_createdAt_idx" ON "logs_acesso"("createdAt");

-- CreateIndex
CREATE INDEX "logs_acesso_usuarioId_idx" ON "logs_acesso"("usuarioId");

-- AddForeignKey
ALTER TABLE "manifestacoes" ADD CONSTRAINT "manifestacoes_cidadaoId_fkey" FOREIGN KEY ("cidadaoId") REFERENCES "cidadaos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anexos" ADD CONSTRAINT "anexos_manifestacaoId_fkey" FOREIGN KEY ("manifestacaoId") REFERENCES "manifestacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tramitacoes" ADD CONSTRAINT "tramitacoes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tramitacoes" ADD CONSTRAINT "tramitacoes_manifestacaoId_fkey" FOREIGN KEY ("manifestacaoId") REFERENCES "manifestacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_manifestacaoId_fkey" FOREIGN KEY ("manifestacaoId") REFERENCES "manifestacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interacoes" ADD CONSTRAINT "interacoes_manifestacaoId_fkey" FOREIGN KEY ("manifestacaoId") REFERENCES "manifestacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interacoes" ADD CONSTRAINT "interacoes_cidadaoId_fkey" FOREIGN KEY ("cidadaoId") REFERENCES "cidadaos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classificacoes_ia" ADD CONSTRAINT "classificacoes_ia_manifestacaoId_fkey" FOREIGN KEY ("manifestacaoId") REFERENCES "manifestacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
