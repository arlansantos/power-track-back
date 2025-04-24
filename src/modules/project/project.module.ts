import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectEntity } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceModule } from '../service/service.module';
import { EmployeeModule } from '../employee/employee.module';
import { ContractModule } from '../contract/contract.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    EmployeeModule,
    ServiceModule,
    ContractModule,

],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
