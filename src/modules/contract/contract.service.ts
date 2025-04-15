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
