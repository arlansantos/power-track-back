import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CustomerEntity } from "../entities/customer.entity";
export class FindAllCustomerResponseDto {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty({ type: CustomerEntity, isArray: true })
  @Type(() => CustomerEntity)
  data: CustomerEntity[];
}