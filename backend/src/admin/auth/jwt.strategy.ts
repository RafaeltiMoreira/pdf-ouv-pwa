import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.admin_token,
      ]),
      secretOrKey: config.get("JWT_SECRET"),
    });
  }

  async validate(payload: { sub: string; role: string; nome: string }) {
    if (!payload || !payload.sub) {
      throw new UnauthorizedException();
    }

    const user = await this.prisma.adminUser.findUnique({
      where: { id: payload.sub },
    });

    if (!user || !user.ativo) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
    };
  }
}
