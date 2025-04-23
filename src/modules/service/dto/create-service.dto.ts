import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreateServiceDto {
    @ApiProperty({
      description: 'Nome completo do serviço',
      example: 'Serviço de Consultoria',
    })
    @IsString()
    name: string;
  
    @ApiProperty({
      description: 'Valor do serviço',
      example: 20000,
    })

    @IsNumber()
    @IsPositive()
    value: number;

    @ApiPropertyOptional({
      description: 'Nicho do serviço',
      example: 'Consultoria em TI',
    })
    @IsString()
    niche: string;

    @ApiPropertyOptional({
      description: 'Avaliação do serviço',
      example: 4.5,
    })
    @IsNumber()
    @IsPositive()
    rating: number;

}
