import { StatusManifestacao } from "@prisma/client";

import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Res,
  UseGuards,
  Req,
} from "@nestjs/common";
import { Response, Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "./admin.service";
import { AdminAuthGuard } from "./auth/admin-auth.guard";
import { RolesGuard } from "./auth/roles.guard";
import { Roles } from "./decorators/roles.decorator";
import { UpdateStatusDto } from "./dto/update-status.dto";

@Controller("admin")
export class AdminController {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService
  ) {}

  @Post("login")
  async login(
    @Body() body: { email: string; senha: string },
    @Res({ passthrough: true }) res: Response
  ) {
    const admin = await this.adminService.login(body.email, body.senha);

    const token = this.jwtService.sign({
      sub: admin.id,
      role: admin.role,
      nome: admin.nome,
    });

    res.cookie("admin_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true somente em HTTPS
      path: "/",
    });

    return {
      id: admin.id,
      nome: admin.nome,
      email: admin.email,
      role: admin.role,
    };
  }

  @UseGuards(AdminAuthGuard)
  @Post("manifestacoes/:id/responder")
  async responderManifestacao(
    @Param("id") id: string,
    @Body("conteudo") conteudo: string,
    @Req() req: Request,
  ) {
    return this.adminService.responderManifestacao(
      id,
      conteudo,
      req.user['id'],
    );
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("admin_token");
    return { success: true };
  }

  @UseGuards(AdminAuthGuard)
  @Get("me")
  getMe(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(AdminAuthGuard)
  @Get("manifestacoes")
  listar() {
    return this.adminService.listarManifestacoes();
  }

  @UseGuards(AdminAuthGuard, RolesGuard)
  @Roles("admin")
  @Patch("manifestacoes/:id/status")
  atualizarStatus(
    @Param("id") id: string,
    @Body() dto: UpdateStatusDto,
    @Req() req: Request,
  ) {
    return this.adminService.atualizarStatus(
      id,
      dto.status,
      req.user['id'],
    );
  }
}
