import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginCidadaoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    description: 'Nome do cidadão',
    example: 'João da Silva',
    minLength: 3,
  })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'E-mail do cidadão',
    example: 'joao.silva@example.com',
  })
  email: string;
}
