import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { AnexoService } from './anexo.service';
import type { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('anexos')
@Controller('anexos')
export class AnexoController {
  constructor(private readonly anexoService: AnexoService) {}

  @Get(':id/download')
  @ApiOperation({ summary: 'Baixar um arquivo de anexo' })
  @ApiResponse({ status: 200, description: 'Arquivo do anexo' })
  @ApiResponse({ status: 404, description: 'Anexo não encontrado' })
  async downloadAnexo(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { stream, anexo } = await this.anexoService.getAnexoStream(id);

    res.set({
      'Content-Type': anexo.mimeType,
      'Content-Disposition': `attachment; filename="${anexo.nomeOriginal}"`,
    });

    return new StreamableFile(stream);
  }
}
