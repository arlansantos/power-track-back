import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './entities/project.entity';
import { PageDto } from 'src/utils/dto/page.dto';
import { IPaginateResult } from 'src/utils/helpers/paginate-result.interface';
import { paginate } from 'src/utils/helpers/paginate';
import { EmployeeService } from '../employee/employee.service';
import { ServiceService } from '../service/service.service';
import { ContractService } from '../contract/contract.service';

@Injectable()
export class ProjectService {
private readonly logger = new Logger(ProjectService.name);

  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    private readonly employeeService: EmployeeService,
    private readonly serviceService: ServiceService,
    private readonly contractService: ContractService,
  ) {}

  async create(createProjectDto: CreateProjectDto, traceId: string) {
    this.logger.log(`[${traceId}] Criando projeto...`);

    const employee = await this.employeeService.findOne(
      createProjectDto.employeeId,
      traceId
    );

    const service = await this.serviceService.findOne(
      createProjectDto.serviceId,
      traceId
    );

    const contract = await this.contractService.findOne(
      createProjectDto.contractId,
      traceId
    );

    const project = this.projectRepository.create({
      employee,
      service,
      contract,
    })

    const savedProject = await this.projectRepository.save(project);

    this.logger.log(
      `[${traceId}] Projeto criado: ${JSON.stringify(savedProject)}`,
    );

    return savedProject;
  }

  async findAll(pageDto: PageDto, traceId: string): Promise<IPaginateResult<ProjectEntity>> {
    this.logger.log(`[${traceId}] Listando projetos...`);

    const queryBuilder = this.projectRepository.createQueryBuilder('project');

    return await paginate( queryBuilder, 'project', pageDto);
  }

  async findOne(id: string, traceId: string): Promise<ProjectEntity> {
    this.logger.log(`[${traceId}] Buscando projeto com ID ${id}...`);

    const project = await this.projectRepository.findOne({ where: { id } });

    if (!project) {
      this.logger.warn(`[${traceId}] Projeto com ID ${id} não encontrado.`);
      throw new NotFoundException(`Projeto com ID ${id} não encontrado.`);
    }

    return project;
  }

  async remove(id: string, traceId: string): Promise<void> {
    this.logger.log(`[${traceId}] Removendo projeto com ID ${id}...`);

    const project = await this.findOne(id, traceId);

    await this.projectRepository.remove(project);

    this.logger.log(`[${traceId}] Projeto com ID ${id} removido.`);
  }
}
