import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { PageDto } from 'src/utils/dto/page.dto';
import { IPaginateResult } from 'src/utils/helpers/paginate-result.interface';
import { paginate } from 'src/utils/helpers/paginate';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto, traceId: string) {
    this.logger.log(`[${traceId}] Criando cliente...`);

    const customer = await this.customerRepository.save(createCustomerDto);

    this.logger.log(
      `[${traceId}] Cliente criado: ${JSON.stringify(customer)}`,
    );

    return customer;
  }

  async findAll(pageDto: PageDto, traceId: string): Promise<IPaginateResult<CustomerEntity>> {
    this.logger.log(`[${traceId}] Listando clientes...`);

    const queryBuilder = this.customerRepository.createQueryBuilder('customer');

    return await paginate( queryBuilder, 'customer', pageDto);
  }

  async findOne(id: string, traceId: string): Promise<CustomerEntity> {
    this.logger.log(`[${traceId}] Buscando cliente com ID ${id}...`);

    const customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer) {
      this.logger.warn(`[${traceId}] Cliente com ID ${id} não encontrado.`);
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }

    return customer;
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
    traceId: string,
  ): Promise<CustomerEntity> {
    this.logger.log(`[${traceId}] Atualizando cliente com ID ${id}...`);

    const customer = await this.findOne(id, traceId);

    await this.customerRepository.update(id, updateCustomerDto);

    this.logger.log(
      `[${traceId}] Cliente atualizado: ${JSON.stringify(customer)}`,
    );

    return await this.findOne(id, traceId);
  }

  async remove(id: string, traceId: string): Promise<void> {
    this.logger.log(`[${traceId}] Removendo cliente com ID ${id}...`);

    const customer = await this.findOne(id, traceId);

    await this.customerRepository.remove(customer);

    this.logger.log(`[${traceId}] Cliente com ID ${id} removido.`);
  }
}
