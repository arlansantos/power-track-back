import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from './entities/contract.entity';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity]), CustomerModule],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}
