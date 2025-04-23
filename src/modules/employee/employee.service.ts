import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeEntity } from './entities/employee.entity';
import { PageDto } from 'src/utils/dto/page.dto';
import { IPaginateResult } from 'src/utils/helpers/paginate-result.interface';
import { paginate } from 'src/utils/helpers/paginate';

@Injectable()
export class EmployeeService {
private readonly logger = new Logger(EmployeeService.name);

  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto, traceId: string) {
    this.logger.log(`[${traceId}] Criando funcionario...`);

    const employee = await this.employeeRepository.save(createEmployeeDto);

    this.logger.log(
      `[${traceId}] Funcionario criado: ${JSON.stringify(employee)}`,
    );

    return employee;
  }

  async findAll(pageDto: PageDto, traceId: string): Promise<IPaginateResult<EmployeeEntity>> {
    this.logger.log(`[${traceId}] Listando funcionarios...`);

    const queryBuilder = this.employeeRepository.createQueryBuilder('employee');

    return await paginate( queryBuilder, 'employee', pageDto);
  }

  async findOne(id: string, traceId: string): Promise<EmployeeEntity> {
    this.logger.log(`[${traceId}] Buscando funcionario com ID ${id}...`);

    const employee = await this.employeeRepository.findOne({ where: { id } });

    if (!employee) {
      this.logger.warn(`[${traceId}] Funcionario com ID ${id} não encontrado.`);
      throw new NotFoundException(`Funcionario com ID ${id} não encontrado.`);
    }

    return employee;
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
    traceId: string,
  ): Promise<EmployeeEntity> {
    this.logger.log(`[${traceId}] Atualizando funcionario com ID ${id}...`);

    const employee = await this.findOne(id, traceId);

    await this.employeeRepository.update(id, updateEmployeeDto);

    this.logger.log(
      `[${traceId}] Funcionario atualizado: ${JSON.stringify(employee)}`,
    );

    return await this.findOne(id, traceId);
  }

  async remove(id: string, traceId: string): Promise<void> {
    this.logger.log(`[${traceId}] Removendo funcionario com ID ${id}...`);

    const employee = await this.findOne(id, traceId);

    await this.employeeRepository.remove(employee);

    this.logger.log(`[${traceId}] Funcionario com ID ${id} removido.`);
  }
}
