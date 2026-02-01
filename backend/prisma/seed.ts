import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco...');

  // ===============================
  // LIMPEZA (ordem correta por FK)
  // ===============================
  await prisma.logAcesso.deleteMany();
  await prisma.classificacaoIA.deleteMany();
  await prisma.interacao.deleteMany();
  await prisma.resposta.deleteMany();
  await prisma.tramitacao.deleteMany();
  await prisma.anexo.deleteMany();
  await prisma.manifestacao.deleteMany();
  await prisma.cidadao.deleteMany();
  await prisma.adminUser.deleteMany();

  console.log('✅ Dados antigos removidos');

  // Criar usuários do sistema
  const senhaHash = await bcrypt.hash('admin123', 10);

  // ===============================
  // ADMIN USERS (Ouvidoria)
  // ===============================
  const admin = await prisma.adminUser.create({
    data: {
      nome: 'Administrador Geral',
      email: 'admin@participa.df.gov.br',
      senhaHash: senhaHash,
      role: 'admin',
      ativo: true,
    },
  });

  const colaborador = await prisma.adminUser.create({
    data: {
      nome: 'Servidor Ouvidoria',
      email: 'ouvidoria@participa.df.gov.br',
      senhaHash: senhaHash,
      role: 'colaborador',
      ativo: true,
    },
  });

  console.log('✅ Usuários criados');

  // ===============================
  // CIDADÃO
  // ===============================
  const cidadao = await prisma.cidadao.create({
    data: {
      nome: 'João da Silva',
      email: 'joao.silva@email.com',
      cpf: '000.000.000-00', // dado sintético
      telefone: '(61) 99999-9999',
      cidade: 'Brasília',
      estado: 'DF',
    },
  });

  console.log('✅ Cidadão criado');

  // ===============================
  // MANIFESTAÇÃO
  // ===============================
  const manifestacao = await prisma.manifestacao.create({
    data: {
      protocolo: 'DF-2026-000001',
      assunto: 'Iluminação pública',
      conteudo: 'Poste apagado há mais de uma semana.',
      tipo: 'RECLAMACAO',
      prioridade: 'MEDIA',
      status: 'RECEBIDA',
      anonimo: false,

      cidadao: {
        connect: { id: cidadao.id },
      },
    },
  });

  // ===============================
  // TRAMITAÇÃO (ADMIN USER)
  // ===============================
  await prisma.tramitacao.create({
    data: {
      statusAnterior: 'RECEBIDA',
      statusNovo: 'EM_ANALISE',
      observacao: 'Encaminhada para análise técnica',

      adminUser: {
        connect: { id: colaborador.id },
      },

      manifestacao: {
        connect: { id: manifestacao.id },
      },
    },
  });

  // ===============================
  // RESPOSTA (ADMIN USER)
  // ===============================
  await prisma.resposta.create({
    data: {
      conteudo: 'A demanda foi encaminhada à companhia responsável.',
      publico: true,

      adminUser: {
        connect: { id: admin.id },
      },

      manifestacao: {
        connect: { id: manifestacao.id },
      },
    },
  });

  // ===============================
  // INTERAÇÃO DO CIDADÃO
  // ===============================
  await prisma.interacao.create({
    data: {
      tipo: 'comentario',
      conteudo: 'Obrigado pelo retorno.',

      cidadao: {
        connect: { id: cidadao.id },
      },

      manifestacao: {
        connect: { id: manifestacao.id },
      },
    },
  });

  console.log('✅ Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
