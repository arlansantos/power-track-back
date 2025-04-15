import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, ParseUUIDPipe, Put } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContractEntity } from './entities/contract.entity';
import { PaginationQuery } from 'src/decorators/pagination-query.decorator';
import { PageDto } from 'src/utils/dto/page.dto';
import { IPaginateResult } from 'src/utils/helpers/paginate-result.interface';
import { FindAllContractResponseDto } from './dto/find-all-contract-response.dto';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo contrato',
  })
  @ApiResponse({
    status: 201,
    description: 'Contrato criado com sucesso',
    type: ContractEntity,
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async create(
    @Body() createContractDto: CreateContractDto,
    @Request() req,
  ): Promise<ContractEntity> {
    const traceId = req.traceId;
    return await this.contractService.create(createContractDto, traceId);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar contratos',
  })
  @ApiResponse({
    status: 200,
    description: 'Contratos listados com sucesso',
    type: FindAllContractResponseDto,
  })
  @PaginationQuery()
  async findAll(@Query() pageDto: PageDto, @Request() req): Promise<IPaginateResult<ContractEntity>> {
    const traceId = req.traceId;
    return await this.contractService.findAll(pageDto, traceId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar contrato por ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Contrato encontrado com sucesso',
    type: ContractEntity,
  })
  @ApiResponse({ status: 400, description: 'ID inválido (não é um UUID)' })
  @ApiResponse({ status: 404, description: 'Contrato não encontrado' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req,
  ): Promise<ContractEntity> {
    const traceId = req.traceId;
    return await this.contractService.findOne(id, traceId);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar Contrato',
  })
  @ApiResponse({
    status: 200,
    description: 'Contrato atualizado com sucesso',
    type: ContractEntity,
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  @ApiResponse({ status: 404, description: 'Contrato não encontrado' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateContractDto: UpdateContractDto,
    @Request() req,
  ): Promise<ContractEntity> {
    const traceId = req.traceId;
    return await this.contractService.update(id, updateContractDto, traceId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover Contrato',
  })
  @ApiResponse({
    status: 204,
    description: 'Contrato removido com sucesso',
  })
  @ApiResponse({ status: 400, description: 'ID inválido (não é um UUID)' })
  @ApiResponse({ status: 404, description: 'Contrato não encontrado' })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req,
  ): Promise<void> {
    const traceId = req.traceId;
    await this.contractService.remove(id, traceId);
  }
}
