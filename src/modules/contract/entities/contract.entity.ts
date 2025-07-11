import { ApiProperty } from "@nestjs/swagger";
import { CustomerEntity } from "src/modules/customer/entities/customer.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ContractStatus } from "../enum/contract-status.enum";
import { ProjectEntity } from "src/modules/project/entities/project.entity";

@Entity('contracts')
export class ContractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date;

  @Column({ name: 'total_value', type: 'numeric', precision: 10, scale: 2 })
  totalValue: number;

  @Column({ name: 'total_hours', nullable: true })
  totalHours: number;

  @Column({ type: 'enum', enum: ContractStatus, default: ContractStatus.PENDING })
  status: ContractStatus;

  @ApiProperty({type: () => CustomerEntity})
  @ManyToOne(() => CustomerEntity, (customer) => customer.contracts)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @OneToMany(() => ProjectEntity, (project) => project.contract)
  projects: ProjectEntity[];

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}