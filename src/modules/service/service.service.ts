import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Repository } from 'typeorm';
import { ServiceEntity } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'src/utils/helpers/paginate';
import { PageDto } from 'src/utils/dto/page.dto';
import { IPaginateResult } from 'src/utils/helpers/paginate-result.interface';

@Injectable()
export class ServiceService {
private readonly logger = new Logger(ServiceService.name);

  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  async create(createServiceDto: CreateServiceDto, traceId: string) {
    this.logger.log(`[${traceId}] Criando serviço...`);

    const service = await this.serviceRepository.save(createServiceDto);

    this.logger.log(
      `[${traceId}] Serviço criado: ${JSON.stringify(service)}`,
    );

    return service;
  }

  async findAll(pageDto: PageDto, traceId: string): Promise<IPaginateResult<ServiceEntity>> {
    this.logger.log(`[${traceId}] Listando serviços...`);

    const queryBuilder = this.serviceRepository.createQueryBuilder('service');

    return await paginate( queryBuilder, 'service', pageDto);
  }

  async dashboard(traceId: string): Promise<ServiceEntity[]> {
    this.logger.log(`[${traceId}] Listando serviços...`);

    const services = await this.serviceRepository.find();

    return services;
  }

  async getTotal(traceId: string): Promise<number> {
    this.logger.log(`[${traceId}] Buscando total de serviços...`);

    const total = await this.serviceRepository.count();

    this.logger.log(`[${traceId}] Total de serviços: ${total}`);

    return total;
  }

  async getTopRating(traceId: string): Promise<ServiceEntity[]> {
    this.logger.log(`[${traceId}] Buscando serviços com melhor avaliação...`);

    const services = await this.serviceRepository.find({
      select: ['name', 'rating'],
      order: { rating: 'DESC' },
      take: 5,
    });

    return services;
  }

  async getByNiche(niche: string, traceId: string): Promise<ServiceEntity[]> {
    this.logger.log(`[${traceId}] Buscando serviços por nicho ${niche}...`);

    const services = await this.serviceRepository.find({
      select: ['name', 'niche', 'rating'],
      where: { niche },
      order: { rating: 'DESC' },
    });

    if (!services.length) {
      this.logger.warn(`[${traceId}] Nenhum serviço encontrado para o nicho ${niche}.`);
      throw new NotFoundException(`Nenhum serviço encontrado para o nicho ${niche}.`);
    }

    return services;
  }

  
  async findOne(id: string, traceId: string): Promise<ServiceEntity> {
    this.logger.log(`[${traceId}] Buscando serviço com ID ${id}...`);

    const service = await this.serviceRepository.findOne({ where: { id } });

    if (!service) {
      this.logger.warn(`[${traceId}] Serviço com ID ${id} não encontrado.`);
      throw new NotFoundException(`Serviço com ID ${id} não encontrado.`);
    }

    return service;
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
    traceId: string,
  ): Promise<ServiceEntity> {
    this.logger.log(`[${traceId}] Atualizando serviço com ID ${id}...`);

    const service = await this.findOne(id, traceId);

    await this.serviceRepository.update(id, updateServiceDto);

    this.logger.log(
      `[${traceId}] Serviço atualizado: ${JSON.stringify(service)}`,
    );

    return await this.findOne(id, traceId);
  }

  async remove(id: string, traceId: string): Promise<void> {
    this.logger.log(`[${traceId}] Removendo serviço com ID ${id}...`);

    const service = await this.findOne(id, traceId);

    await this.serviceRepository.remove(service);

    this.logger.log(`[${traceId}] Serviço com ID ${id} removido.`);
  }
}
