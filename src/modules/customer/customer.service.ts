import { Injectable, Logger } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto, traceId: string) {
    this.logger.log(`[${traceId}] Criando cliente...`);
    return await this.customerRepository.save(createCustomerDto);
  }

  async findAll(traceId: string) {
    this.logger.log(`[${traceId}] Buscando todos os clientes...`);
    return await this.customerRepository.find();
  }

  async findOne(id: number, traceId: string) {
    this.logger.log(`[${traceId}] Buscando cliente com ID: ${id}`);
    return await this.customerRepository.findOne({
      where: { clienteId: id },
    });
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
    traceId: string,
  ) {
    this.logger.log(`[${traceId}] Atualizando cliente com ID: ${id}`);
    return await this.customerRepository.update(id, updateCustomerDto);
  }

  async remove(id: number, traceId: string) {
    this.logger.log(`[${traceId}] Removendo cliente com ID: ${id}`);
    return await this.customerRepository.delete(id);
  }
}
