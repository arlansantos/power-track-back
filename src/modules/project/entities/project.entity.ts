import { ApiProperty } from "@nestjs/swagger";
import { ContractEntity } from "src/modules/contract/entities/contract.entity";
import { EmployeeEntity } from "src/modules/employee/entities/employee.entity";
import { ServiceEntity } from "src/modules/service/entities/service.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('projects')
export class ProjectEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({type: () => EmployeeEntity})
  @ManyToOne(() => EmployeeEntity, (employee) => employee.projects)
  @JoinColumn({ name: 'employee_id' })
  employee: EmployeeEntity;

  @ApiProperty({type: () => ServiceEntity})
  @ManyToOne(() => ServiceEntity, (service) => service.projects)
  @JoinColumn({ name: 'service_id' })
  service: ServiceEntity

  @ApiProperty({type: () => ContractEntity})
  @ManyToOne(() => ContractEntity, (contract) => contract.projects)
  @JoinColumn({ name: 'contract_id' })
  contract: ContractEntity

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
