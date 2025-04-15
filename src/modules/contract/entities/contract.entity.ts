import { ApiProperty } from "@nestjs/swagger";
import { CustomerEntity } from "src/modules/customer/entities/customer.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ContractStatus } from "../enum/contract-status.enum";

@Entity('contracts')
export class ContractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date;

  @Column({ name: 'total_value', type: 'numeric', precision: 10, scale: 2 })
  totalValue: number;

  @Column({ name: 'total_term', nullable: true })
  totalTerm: number;

  @Column({ type: 'enum', enum: ContractStatus, default: ContractStatus.PENDING })
  status: ContractStatus;

  @ApiProperty({type: () => CustomerEntity})
  @ManyToOne(() => CustomerEntity, (customer) => customer.contracts)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}