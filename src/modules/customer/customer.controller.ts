import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um cliente' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  async create(@Body() createCustomerDto: CreateCustomerDto, @Request() req) {
    const traceId = req.traceId;
    return await this.customerService.create(createCustomerDto, traceId);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes' })
  async findAll(@Request() req) {
    const traceId = req.traceId;
    return await this.customerService.findAll(traceId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async findOne(@Param('id') id: string, @Request() req) {
    const traceId = req.traceId;
    return await this.customerService.findOne(+id, traceId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um cliente' })
  @ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Request() req,
  ) {
    const traceId = req.traceId;
    return await this.customerService.update(+id, updateCustomerDto, traceId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um cliente' })
  @ApiResponse({ status: 204, description: 'Cliente removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async remove(@Param('id') id: string, @Request() req) {
    const traceId = req.traceId;
    return await this.customerService.remove(+id, traceId);
  }
}
