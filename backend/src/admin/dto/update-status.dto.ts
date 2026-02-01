import { IsEnum } from "class-validator";
import { StatusManifestacao } from "@prisma/client";

export class UpdateStatusDto {
  @IsEnum(StatusManifestacao, {
    message: 'Status da manifestação inválido',
  })
  status: StatusManifestacao;
}
