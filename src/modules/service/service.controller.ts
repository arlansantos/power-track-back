import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ServiceEntity } from './entities/service.entity';
import { FindAllServiceResponseDto } from './dto/find-all-service-response.dto';
import { PaginationQuery } from 'src/decorators/pagination-query.decorator';
import { PageDto } from 'src/utils/dto/page.dto';
import { IPaginateResult } from 'src/utils/helpers/paginate-result.interface';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um serviço' })
  @ApiResponse({ status: 201,
    description: 'Serviço criado com sucesso' ,
    type: ServiceEntity
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @Request() req,
  ): Promise<ServiceEntity> {
    const traceId = req.traceId;
    return await this.serviceService.create(createServiceDto, traceId);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os serviços' })
  @ApiResponse({ status: 200,
    description: 'Lista de serviços',
    type: FindAllServiceResponseDto
    })
  @PaginationQuery()
  async findAll(@Query() pageDto: PageDto, @Request() req): Promise<IPaginateResult<ServiceEntity>> {
    const traceId = req.traceId;
    return await this.serviceService.findAll(pageDto, traceId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um serviço pelo ID' })
  @ApiResponse({ status: 200,
    description: 'Serviço encontrado',
    type: ServiceEntity
  })
  @ApiResponse({ status: 400, description: 'ID inválido (não é um UUID)' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  async findOne(@Param('id') id: string, @Request() req) {
    const traceId = req.traceId;
    return await this.serviceService.findOne(id, traceId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um serviço' })
  @ApiResponse({ status: 200, description: 'Serviço atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @Request() req,
  ) {
    const traceId = req.traceId;
    return await this.serviceService.update(id, updateServiceDto, traceId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um serviço' })
  @ApiResponse({ status: 204, description: 'Serviço removido com sucesso' })
  @ApiResponse({ status: 400, description: 'ID inválido (não é um UUID)' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  async remove(@Param('id') id: string, @Request() req) {
    const traceId = req.traceId;
    await this.serviceService.remove(id, traceId);
  }
}
