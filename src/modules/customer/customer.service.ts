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

  async dashboard(traceId: string): Promise<CustomerEntity[]> {
    this.logger.log(`[${traceId}] Listando clientes...`);

    const customers = await this.customerRepository.find();

    return customers;
  }

  async getCountGroupedByState(traceId: string): Promise<{ state: string, quantity: number }[]> {
    this.logger.log(`[${traceId}] Agrupando e contando clientes por estado...`);
  
    const result = await this.customerRepository
      .createQueryBuilder('customer')
      .select('customer.state', 'state')
      .addSelect('COUNT(*)', 'quantity')
      .groupBy('customer.state')
      .orderBy('quantity', 'DESC')
      .getRawMany();
  
    return result.map(item => ({
      state: item.state,
      quantity: Number(item.quantity),
    }));
  }

  async getCountGroupedBySegment(traceId: string): Promise<{ segment: string, quantity: number }[]> {
    this.logger.log(`[${traceId}] Agrupando e contando clientes por segmento...`);
  
    const result = await this.customerRepository
      .createQueryBuilder('customer')
      .select('customer.segment', 'segment')
      .addSelect('COUNT(*)', 'quantity')
      .groupBy('customer.segment')
      .orderBy('quantity', 'DESC')
      .getRawMany();
  
    return result.map(item => ({
      segment: item.segment ?? 'Não informado',
      quantity: Number(item.quantity),
    }));
  }

  async getTotal(traceId: string): Promise<number> {
    this.logger.log(`[${traceId}] Contando clientes...`);

    const total = await this.customerRepository.count();

    this.logger.log(`[${traceId}] Total de clientes: ${total}`);

    return total;
  }

  async getCountByState(state: string, traceId: string): Promise<number> {
    this.logger.log(`[${traceId}] Contando clientes no estado ${state}...`);

    const count = await this.customerRepository.count({
      where: { state },
    });
    
    return count;

  }

  async getCountBySegment(segment: string, traceId: string): Promise<number> {
    this.logger.log(`[${traceId}] Contando clientes no segmento ${segment}...`);

    const count = await this.customerRepository.count({
      where: { segment },
    });
    
    return count;
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
