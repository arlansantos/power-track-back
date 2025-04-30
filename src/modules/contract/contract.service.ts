import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Repository } from 'typeorm';
import { ContractEntity } from './entities/contract.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/utils/dto/page.dto';
import { IPaginateResult } from 'src/utils/helpers/paginate-result.interface';
import { paginate } from 'src/utils/helpers/paginate';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class ContractService {
  private readonly logger = new Logger(ContractService.name);

  constructor(
    @InjectRepository(ContractEntity)
    private readonly contractRepository: Repository<ContractEntity>,
    private readonly customerService: CustomerService,
  ) {}

  async create(createContractDto: CreateContractDto, traceId: string) {
    this.logger.log(`[${traceId}] Criando contrato...`);

    const customer = await this.customerService.findOne(
      createContractDto.customerId, traceId)

    const contract = this.contractRepository.create({
      ...createContractDto,
      customer,
    })

    const contractSaved = await this.contractRepository.save(contract);

    this.logger.log(
      `[${traceId}] Contrato criado: ${JSON.stringify(contractSaved)}`,
    );

    return contractSaved;
  }

  async findAll(pageDto: PageDto, traceId: string): Promise<IPaginateResult<ContractEntity>> {
    this.logger.log(`[${traceId}] Listando contratos...`);

    const queryBuilder = this.contractRepository.createQueryBuilder('contract');

    return await paginate( queryBuilder, 'contract', pageDto);
  }

  async dashboard(traceId: string): Promise<ContractEntity[]> {
    this.logger.log(`[${traceId}] Listando contratos...`);

    const contracts = await this.contractRepository.find();

    return contracts;
  }

  async getTotal(traceId: string): Promise<number> {
    this.logger.log(`[${traceId}] Contando contratos...`);

    const total = await this.contractRepository.count();

    this.logger.log(`[${traceId}] Total de contratos: ${total}`);

    return total;
  }

  async getAverageValue(traceId: string): Promise<number> {
    this.logger.log(`[${traceId}] Calculando média dos valores dos contratos...`);

    const total = await this.contractRepository.createQueryBuilder('contract')
      .select('AVG(contract.totalValue)', 'averageValue')
      .getRawOne();
    
    return total.averageValue;
  }

  async getMaxValue(traceId: string): Promise<number> {
    this.logger.log(`[${traceId}] Calculando maior valor dos contratos...`);

    const total = await this.contractRepository.createQueryBuilder('contract')
      .select('MAX(contract.totalValue)', 'maxValue')
      .getRawOne();
    
    return total.maxValue;
  }

  async getMinValue(traceId: string): Promise<number> {
    this.logger.log(`[${traceId}] Calculando menor valor dos contratos...`);

    const total = await this.contractRepository.createQueryBuilder('contract')
      .select('MIN(contract.totalValue)', 'minValue')
      .getRawOne();
    
    return total.minValue;
  }

  async getSumValue(traceId: string): Promise<number> {
    this.logger.log(`[${traceId}] Calculando soma dos valores dos contratos...`);

    const total = await this.contractRepository.createQueryBuilder('contract')
      .select('SUM(contract.totalValue)', 'sumValue')
      .getRawOne();
    
    return total.sumValue;
  }

  async getCountByStatus(status: string, traceId: string): Promise<number> {
    this.logger.log(`[${traceId}] Contando contratos com status ${status}...`);

    const contracts = await this.contractRepository.createQueryBuilder('contract')
      .where('contract.status = :status', { status })
      .getCount();
    
    return contracts;
  }

  async findOne(id: string, traceId: string): Promise<ContractEntity> {
    this.logger.log(`[${traceId}] Buscando contrato com ID ${id}...`);

    const contract = await this.contractRepository.findOne({ where: { id } });

    if (!contract) {
      this.logger.warn(`[${traceId}] Contrato com ID ${id} não encontrado.`);
      throw new NotFoundException(`Contrato com ID ${id} não encontrado.`);
    }

    return contract;
  }

  async update(
    id: string,
    updateContractDto: UpdateContractDto,
    traceId: string,
  ): Promise<ContractEntity> {
    this.logger.log(`[${traceId}] Atualizando contrato com ID ${id}...`);

    const contract = await this.findOne(id, traceId);

    await this.contractRepository.update(id, updateContractDto);

    this.logger.log(
      `[${traceId}] Contrato atualizado: ${JSON.stringify(contract)}`,
    );

    return await this.findOne(id, traceId);
  }

  async remove(id: string, traceId: string): Promise<void> {
    this.logger.log(`[${traceId}] Removendo contrato com ID ${id}...`);

    const contract = await this.findOne(id, traceId);

    await this.contractRepository.remove(contract);

    this.logger.log(`[${traceId}] Contrato com ID ${id} removido.`);
  }
}
