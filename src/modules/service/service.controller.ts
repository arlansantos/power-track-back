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

  @Get('/total')
  @ApiOperation({ summary: 'Buscar o total de serviços' })
  @ApiResponse({ status: 200, description: 'Total de serviços' })
  async getTotal(@Request() req) {
    const traceId = req.traceId;
    return await this.serviceService.getTotal(traceId);
  }

  @Get('/top-rating')
  @ApiOperation({ summary: 'Buscar os serviços com melhor avaliação' })
  @ApiResponse({ status: 200, description: 'Serviços com melhor avaliação' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  async getTopRating(@Request() req) {
    const traceId = req.traceId;
    return await this.serviceService.getTopRating(traceId);
  }

  @Get('/by-niche')
  @ApiOperation({ summary: 'Buscar serviços por nicho' })
  @ApiResponse({ status: 200, description: 'Serviços encontrados' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  async getByNiche(@Query('niche') niche: string, @Request() req) {
    const traceId = req.traceId;
    return await this.serviceService.getByNiche(niche, traceId);
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
