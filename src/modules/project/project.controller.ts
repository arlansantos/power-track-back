import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProjectEntity } from './entities/project.entity';
import { PaginationQuery } from 'src/decorators/pagination-query.decorator';
import { PageDto } from 'src/utils/dto/page.dto';
import { IPaginateResult } from 'src/utils/helpers/paginate-result.interface';
import { FindAllProjectResponseDto } from './dto/FindAllProjectResponseDto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um projeto' })
  @ApiResponse({ status: 201,
    description: 'Projeto criado com sucesso' ,
    type: ProjectEntity
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Request() req,
  ): Promise<ProjectEntity> {
    const traceId = req.traceId;
    return await this.projectService.create(createProjectDto, traceId);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os projetos' })
  @ApiResponse({ status: 200,
    description: 'Lista de projetos',
    type: FindAllProjectResponseDto,
    })
  @PaginationQuery()
  async findAll(@Query() pageDto: PageDto, @Request() req): Promise<IPaginateResult<ProjectEntity>> {
    const traceId = req.traceId;
    return await this.projectService.findAll(pageDto, traceId);
  }

  @Get('total')
  @ApiOperation({ summary: 'Buscar total de projetos' })
  @ApiResponse({ status: 200,
    description: 'Total de projetos',
    type: Number
  })
  async getTotal(@Request() req): Promise<number> {
    const traceId = req.traceId;
    return await this.projectService.getTotal(traceId);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Buscar um projeto pelo ID' })
  @ApiResponse({ status: 200,
    description: 'Projeto encontrado',
    type: ProjectEntity
  })
  @ApiResponse({ status: 400, description: 'ID inválido (não é um UUID)' })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado' })
  async findOne(@Param('id') id: string, @Request() req) {
    const traceId = req.traceId;
    return await this.projectService.findOne(id, traceId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um projeto' })
  @ApiResponse({ status: 204, description: 'Projeto removido com sucesso' })
  @ApiResponse({ status: 400, description: 'ID inválido (não é um UUID)' })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado' })
  async remove(@Param('id') id: string, @Request() req) {
    const traceId = req.traceId;
    await this.projectService.remove(id, traceId);
  }
  
}
