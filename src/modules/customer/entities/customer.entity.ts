import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('customer')
export class CustomerEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiPropertyOptional()
  @Column({ nullable: true, length: 11 })
  cpf?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true, length: 14 })
  cnpj?: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiPropertyOptional()
  @Column({ length: 100, nullable: true })
  segment?: string;

  @ApiPropertyOptional()
  @Column({ name: 'target_audience', length: 100, nullable: true })
  targetAudience?: string;
 
  @ApiPropertyOptional()
  @Column({ length: 255, nullable: true })
  email?: string;

  @ApiPropertyOptional()
  @Column({ length: 20, nullable: true })
  phone?: string;
  
  @ApiPropertyOptional()
  @Column({ nullable: true })
  city?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  state?: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
