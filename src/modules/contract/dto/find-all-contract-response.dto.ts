import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ContractEntity } from "../entities/contract.entity";

export class FindAllContractResponseDto {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty({ type: ContractEntity, isArray: true })
  @Type(() => ContractEntity)
  data: ContractEntity[];
}