import { Module } from '@nestjs/common';
import { AnexoService } from './anexo.service';
import { AnexoController } from './anexo.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AnexoController],
  providers: [AnexoService],
})
export class AnexoModule {}
