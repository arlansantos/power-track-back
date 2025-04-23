import { ApiProperty } from "@nestjs/swagger";
import { ServiceEntity } from "../entities/service.entity";
import { Type } from "class-transformer";

export class FindAllServiceResponseDto {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty({ type: ServiceEntity, isArray: true })
  @Type(() => ServiceEntity)
  data: ServiceEntity[];
}