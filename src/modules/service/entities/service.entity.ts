import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectEntity } from 'src/modules/project/entities/project.entity';
import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  OneToMany
} from 'typeorm';

@Entity('services')
export class ServiceEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'numeric', precision: 10, scale: 2 })
  value: number;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  niche: string;

  @ApiPropertyOptional()
  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  rating: number;

  @OneToMany(() => ProjectEntity, (project) => project.service)
  projects: ProjectEntity[];

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
