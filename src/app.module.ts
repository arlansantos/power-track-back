import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './modules/customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TraceInterceptor } from './interceptors/trace.interceptor';
import { CustomerEntity } from './modules/customer/entities/customer.entity';
import { ContractModule } from './modules/contract/contract.module';
import { ContractEntity } from './modules/contract/entities/contract.entity';
import { EmployeeModule } from './modules/employee/employee.module';
import { EmployeeEntity } from './modules/employee/entities/employee.entity';
import { ServiceModule } from './modules/service/service.module';
import { ServiceEntity } from './modules/service/entities/service.entity';
import { ProjectModule } from './modules/project/project.module';
import { ProjectEntity } from './modules/project/entities/project.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [CustomerEntity, ContractEntity, EmployeeEntity, ServiceEntity, ProjectEntity],
      synchronize: true,
      //ssl: true,
    }),
    CustomerModule,
    ContractModule,
    EmployeeModule,
    ServiceModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TraceInterceptor,
    },
  ],
})
export class AppModule {}
