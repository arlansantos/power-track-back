import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateEmployeeDto {

  @ApiProperty({
    description: 'Nome completo do funcionário',
    example: 'Marcos da Silva',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'E-mail do funcionário',
    example: 'marcos.silva@email.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Horas trabalhadas com clientes',
    example: 40,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  hoursWithClients?: number = 0;

  @ApiPropertyOptional({
    description: 'Horas de estudo do funcionário',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  studyHours?: number = 0;
}
