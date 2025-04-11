import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  clienteId: number;

  @ApiProperty()
  @IsNotEmpty()
  cpfCnpj: string;

  @ApiProperty()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  segmento: string;

  @ApiPropertyOptional()
  @IsOptional()
  publicoAlvo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  rua?: string;

  @ApiPropertyOptional()
  @IsOptional()
  numero?: number;

  @ApiPropertyOptional()
  @IsOptional()
  cidade?: string;

  @ApiPropertyOptional()
  @IsOptional()
  estado?: string;
}
