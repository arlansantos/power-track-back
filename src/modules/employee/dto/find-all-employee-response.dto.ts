import { ApiProperty } from "@nestjs/swagger";
import { EmployeeEntity } from "../entities/employee.entity";
import { Type } from "class-transformer";

export class FindAllEmployeeResponseDto {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty({ type: EmployeeEntity, isArray: true })
  @Type(() => EmployeeEntity)
  data: EmployeeEntity[];
}