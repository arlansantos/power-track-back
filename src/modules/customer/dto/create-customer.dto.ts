import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateCustomerDto {

  @ApiPropertyOptional({
    description: 'CPF do cliente (somente números, 11 dígitos)',
    example: '12345678901',
  })
  @IsOptional()
  @IsString()
  @Length(11, 11, { message: 'CPF deve ter exatamente 11 dígitos' })
  cpf?: string;

  @ApiPropertyOptional({
    description: 'CNPJ do cliente (somente números, 14 dígitos)',
    example: '12345678000199',
  })
  @IsOptional()
  @IsString()
  @Length(14, 14, { message: 'CNPJ deve ter exatamente 14 dígitos' })
  cnpj?: string;

  @ApiProperty({
    description: 'Nome completo do cliente',
    example: 'João da Silva',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Segmento do cliente',
    example: 'Varejo',
  })
  @IsOptional()
  segment?: string;

  @ApiPropertyOptional({
    description: 'Público-alvo do cliente',
  })
  @IsOptional()
  targetAudience?: string;

  @ApiPropertyOptional({
    description: 'E-mail do cliente',
    example: 'joao.silva@email.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Número de telefone com DDD (formato internacional)',
    example: '+5511999999999',
  })
  @IsOptional()
  @IsPhoneNumber('BR', { message: 'Número de telefone inválido' })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Cidade do cliente',
    example: 'São Paulo',
  })
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({
    description: 'Estado do cliente',
    example: 'SP',
  })
  @IsOptional()
  state?: string;
}
