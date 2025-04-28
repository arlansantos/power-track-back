import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQuery } from 'src/decorators/pagination-query.decorator';
import { PageDto } from 'src/utils/dto/page.dto';
import { IPaginateResult } from 'src/utils/helpers/paginate-result.interface';
import { CustomerEntity } from './entities/customer.entity';
import { FindAllCustomerResponseDto } from './dto/find-all-customer-response.dto';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um cliente' })
  @ApiResponse({ status: 201,
    description: 'Cliente criado com sucesso' ,
    type: CustomerEntity
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @Request() req,
  ): Promise<CustomerEntity> {
    const traceId = req.traceId;
    return await this.customerService.create(createCustomerDto, traceId);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os clientes' })
  @ApiResponse({ status: 200,
    description: 'Lista de clientes',
    type: FindAllCustomerResponseDto
   })
  @PaginationQuery()
  async findAll(@Query() pageDto: PageDto, @Request() req): Promise<IPaginateResult<CustomerEntity>> {
    const traceId = req.traceId;
    return await this.customerService.findAll(pageDto, traceId);
  }

  @Get('total')
  @ApiOperation({ summary: 'Contar todos os clientes' })
  @ApiResponse({ status: 200,
    description: 'Total de clientes',
    type: Number
  })
  @ApiResponse({ status: 500, description: 'Erro ao contar clientes' })
  async getTotal(@Request() req): Promise<number> {
    const traceId = req.traceId;
    return await this.customerService.getTotal(traceId);
  }
  @Get('state/:state')
  @ApiOperation({ summary: 'Contar clientes por estado' })
  @ApiResponse({ status: 200,
    description: 'Total de clientes por estado',
    type: Number
  })
  @ApiResponse({ status: 400, description: 'Estado inválido' })
  @ApiResponse({ status: 404, description: 'Estado não encontrado' })
  async getCountByState(
    @Param('state') state: string,
    @Request() req,
  ): Promise<number> {
    const traceId = req.traceId;
    return await this.customerService.getCountByState(state, traceId);
  }
  @Get('segment/:segment')
  @ApiOperation({ summary: 'Contar clientes por segmento' })
  @ApiResponse({ status: 200,
    description: 'Total de clientes por segmento',
    type: Number
  })
  @ApiResponse({ status: 400, description: 'Segmento inválido' })
  @ApiResponse({ status: 404, description: 'Segmento não encontrado' })
  async getCountBySegment(
    @Param('segment') segment: string,
    @Request() req,
  ): Promise<number> {
    const traceId = req.traceId;
    return await this.customerService.getCountBySegment(segment, traceId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um cliente pelo ID' })
  @ApiResponse({ status: 200,
    description: 'Cliente encontrado',
    type: CustomerEntity
  })
  @ApiResponse({ status: 400, description: 'ID inválido (não é um UUID)' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async findOne(@Param('id') id: string, @Request() req) {
    const traceId = req.traceId;
    return await this.customerService.findOne(id, traceId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um cliente' })
  @ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Request() req,
  ) {
    const traceId = req.traceId;
    return await this.customerService.update(id, updateCustomerDto, traceId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um cliente' })
  @ApiResponse({ status: 204, description: 'Cliente removido com sucesso' })
  @ApiResponse({ status: 400, description: 'ID inválido (não é um UUID)' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async remove(@Param('id') id: string, @Request() req) {
    const traceId = req.traceId;
    await this.customerService.remove(id, traceId);
  }
}
