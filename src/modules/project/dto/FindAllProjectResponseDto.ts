import { ApiProperty } from "@nestjs/swagger";
import { ProjectEntity } from "../entities/project.entity";
import { Type } from "class-transformer";

export class FindAllProjectResponseDto {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty({ type: ProjectEntity, isArray: true })
  @Type(() => ProjectEntity)
  data: ProjectEntity[];
}