import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsUUID } from "class-validator";
import { ContractStatus } from "../enum/contract-status.enum";

export class CreateContractDto {

  @ApiProperty({
    description: 'Data de inicío do contrato. Formato: YYYY-MM-DD',
    example: '2025-04-01',
  })
  @IsDateString(
    {},
    { message: 'startDate deve ser uma data válida (YYYY-MM-DD)' },
  )
  startDate: Date;

  @ApiProperty({
    description: 'Valor total do contrato. Formato: 99999.99',
    example: 1000.00,
  })
  totalValue: number;

  @ApiProperty({
    description: 'Prazo total do contrato em meses. Formato: 12',
    example: 12,
  })
  totalHours: number;


  @ApiProperty({
    description: 'Status do contrato',
    example: ContractStatus.PENDING,
    enum: ContractStatus,
  })
  @IsEnum(ContractStatus, {
    message: `status deve ser um dos seguintes valores: ${Object.values(ContractStatus).join(', ')}`,
  })
  status: ContractStatus;

  @ApiProperty({
    description: 'ID do produtor dono da fazenda',
    example: 'f6df9021-1f29-4e42-bf0e-255aa7d14c18',
  })
  @IsUUID(4, { message: 'ID do contrato inválido' })
  customerId: string;
}
