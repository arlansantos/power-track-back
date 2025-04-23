import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('employees')
export class EmployeeEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiPropertyOptional()
  @Column({ length: 255, nullable: true })
  email?: string;

  @ApiPropertyOptional()
  @Column({ name: 'hours_with_clients', default: 0 })
  hoursWithClients: number;

  @ApiPropertyOptional()
  @Column({ name: 'study_hours', default: 0 })
  studyHours: number;
  
  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}