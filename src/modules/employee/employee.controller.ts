import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmployeeEntity } from './entities/employee.entity';
import { IPaginateResult } from 'src/utils/helpers/paginate-result.interface';
import { PaginationQuery } from 'src/decorators/pagination-query.decorator';
import { PageDto } from 'src/utils/dto/page.dto';
import { FindAllEmployeeResponseDto } from './dto/find-all-employee-response.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um funcionario' })
  @ApiResponse({ status: 201,
    description: 'Funcionario criado com sucesso' ,
    type: EmployeeEntity
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @Request() req,
  ): Promise<EmployeeEntity> {
    const traceId = req.traceId;
    return await this.employeeService.create(createEmployeeDto, traceId);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os funcionarios' })
  @ApiResponse({ status: 200,
    description: 'Lista de funcionarios',
    type: FindAllEmployeeResponseDto
   })
  @PaginationQuery()
  async findAll(@Query() pageDto: PageDto, @Request() req): Promise<IPaginateResult<EmployeeEntity>> {
    const traceId = req.traceId;
    return await this.employeeService.findAll(pageDto, traceId);
  }

  @Get('total')
  @ApiOperation({ summary: 'Buscar total de funcionarios' })
  @ApiResponse({ status: 200,
    description: 'Total de funcionarios',
    type: Number
  })
  async getTotal(@Request() req): Promise<number> {
    const traceId = req.traceId;
    return await this.employeeService.getTotal(traceId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um funcionario pelo ID' })
  @ApiResponse({ status: 200,
    description: 'Funcionario encontrado',
    type: EmployeeEntity
  })
  @ApiResponse({ status: 400, description: 'ID inválido (não é um UUID)' })
  @ApiResponse({ status: 404, description: 'Funcionario não encontrado' })
  async findOne(@Param('id') id: string, @Request() req) {
    const traceId = req.traceId;
    return await this.employeeService.findOne(id, traceId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um funcionario' })
  @ApiResponse({ status: 200, description: 'Funcionario atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  @ApiResponse({ status: 404, description: 'Funcionario não encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Request() req,
  ) {
    const traceId = req.traceId;
    return await this.employeeService.update(id, updateEmployeeDto, traceId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um funcionario' })
  @ApiResponse({ status: 204, description: 'Funcionario removido com sucesso' })
  @ApiResponse({ status: 400, description: 'ID inválido (não é um UUID)' })
  @ApiResponse({ status: 404, description: 'Funcionario não encontrado' })
  async remove(@Param('id') id: string, @Request() req) {
    const traceId = req.traceId;
    await this.employeeService.remove(id, traceId);
  }
}
