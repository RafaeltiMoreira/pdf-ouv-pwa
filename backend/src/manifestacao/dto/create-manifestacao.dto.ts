import {
  IsString,
  IsBoolean,
  IsOptional,
  MinLength,
  MaxLength,
  IsEmail,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CidadaoDataDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  @MinLength(3)
  nome: string;

  @ApiProperty({ example: 'joao.silva@email.com' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;
}

export class CreateManifestacaoDto {
  @ApiProperty({
    description: 'Assunto da manifestação (resumo curto)',
    example: 'Problema no atendimento da UBS',
    minLength: 3,
    maxLength: 120,
  })
  @IsString()
  @MinLength(3, { message: 'Assunto deve ter no mínimo 3 caracteres' })
  @MaxLength(120, { message: 'Assunto deve ter no máximo 120 caracteres' })
  assunto: string;

  @ApiProperty({
    description: 'Descrição completa da manifestação',
    example: 'Fui até a UBS na segunda-feira e não fui atendido...',
    minLength: 5,
  })
  @IsString()
  @MinLength(5, { message: 'Conteúdo deve ter no mínimo 5 caracteres' })
  conteudo: string;

  @ApiProperty({
    description: 'Se a manifestação deve ser anônima',
    example: false,
    default: false,
  })
  @IsBoolean()
  anonimo: boolean;

  @ApiPropertyOptional({
    description: 'Dados do cidadão (obrigatório se não for anônimo)',
    type: 'object',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CidadaoDataDto)
  cidadao?: CidadaoDataDto;

  @ApiPropertyOptional({
    description: 'Latitude da localização do ocorrido',
    example: '-15.7942',
  })
  @IsOptional()
  @IsString()
  latitude?: string;

  @ApiPropertyOptional({
    description: 'Longitude da localização do ocorrido',
    example: '-47.8825',
  })
  @IsOptional()
  @IsString()
  longitude?: string;
}

export class ManifestacaoResponseDto {
  @ApiProperty({ example: 'uuid-v4' })
  id: string;

  @ApiProperty({ example: 'OUV-2024-ABC123' })
  protocolo: string;

  @ApiProperty({ example: 'RECEBIDA' })
  status: string;

  @ApiProperty({ example: 'Problema no atendimento da UBS' })
  assunto: string;

  @ApiProperty({ example: 'Fui até a UBS...' })
  conteudo: string;

  @ApiProperty({ example: false })
  anonimo: boolean;

  @ApiProperty({ example: 2 })
  quantidadeAnexos: number;

  @ApiProperty({ example: true })
  possuiAudio: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional()
  prazoResposta?: Date;
}

export class ListManifestacaoDto {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, default: 10 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional({ example: 'RECEBIDA' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: 'OUV-2024-ABC123' })
  @IsOptional()
  @IsString()
  protocolo?: string;
}
