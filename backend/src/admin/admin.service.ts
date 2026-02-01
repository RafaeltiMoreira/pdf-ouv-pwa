import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { StatusManifestacao } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  /* ============================
   * AUTH
   * ============================ */

  async login(email: string, senha: string) {
    const admin = await this.prisma.adminUser.findUnique({
      where: { email },
    });

    if (!admin || !admin.ativo) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const senhaOk = await bcrypt.compare(senha, admin.senhaHash);
    if (!senhaOk) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    return admin;
  }

  /* ============================
   * MANIFESTAÇÕES
   * ============================ */

  async listarManifestacoes() {
    return this.prisma.manifestacao.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        cidadao: {
          select: { nome: true, email: true },
        },
        anexos: true,
        respostas: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
  }

  async atualizarStatus(
    manifestacaoId: string,
    status: StatusManifestacao,
    adminUserId: string,
  ) {
    if (!status) {
      throw new BadRequestException("Status é obrigatório");
    }

    const manifestacao = await this.prisma.manifestacao.findUnique({
      where: { id: manifestacaoId },
    });

    if (!manifestacao) {
      throw new NotFoundException("Manifestação não encontrada");
    }

    // Transação garante consistência
    await this.prisma.$transaction([
      this.prisma.manifestacao.update({
        where: { id: manifestacaoId },
        data: { status },
      }),
      this.prisma.tramitacao.create({
        data: {
          manifestacaoId,
          statusAnterior: manifestacao.status,
          statusNovo: status,
          observacao: "Status alterado pelo administrador",
          adminUserId,
        },
      }),
    ]);

    return { success: true };
  }

  async responderManifestacao(
    manifestacaoId: string,
    conteudo: string,
    adminUserId: string,
  ) {
    if (!conteudo?.trim()) {
      throw new BadRequestException("Conteúdo da resposta é obrigatório");
    }

    const manifestacao = await this.prisma.manifestacao.findUnique({
      where: { id: manifestacaoId },
    });

    if (!manifestacao) {
      throw new NotFoundException("Manifestação não encontrada");
    }

    await this.prisma.$transaction([
      this.prisma.resposta.create({
        data: {
          manifestacaoId,
          conteudo,
          publico: true,
          adminUserId,
        },
      }),
      this.prisma.manifestacao.update({
        where: { id: manifestacaoId },
        data: {
          status: StatusManifestacao.RESPONDIDA,
        },
      }),
      this.prisma.tramitacao.create({
        data: {
          manifestacaoId,
          statusAnterior: manifestacao.status,
          statusNovo: StatusManifestacao.RESPONDIDA,
          observacao: "Manifestação respondida pelo administrador",
          adminUserId,
        },
      }),
    ]);

    return { success: true };
  }
}
