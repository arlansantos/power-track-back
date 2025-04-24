import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CreateProjectDto {
  @ApiProperty({
    description: 'ID do produtor dono da fazenda',
    example: '7e48ac88-ee8d-4399-8c03-1ddfa5557527',
  })
  @IsUUID(4, { message: 'ID do funcionário inválido' })
  employeeId: string;

  @ApiProperty({
    description: 'ID do serviço',
    example: '7e48ac88-ee8d-4399-8c03-1ddfa5557527',
  })
  @IsUUID(4, { message: 'ID do serviço inválido' })
  serviceId: string;

  @ApiProperty({
    description: 'ID do contrato',
    example: '7e48ac88-ee8d-4399-8c03-1ddfa5557527',
  })
  @IsUUID(4, { message: 'ID do contrato inválido' })
  contractId: string;
}
