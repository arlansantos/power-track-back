import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cliente' })
export class CustomerEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id_cliente', type: 'int' })
  clienteId: number;

  @ApiPropertyOptional()
  @Column({ name: 'cpf_cnpj', type: 'varchar', length: 20, nullable: true })
  cpfCnpj?: string;

  @ApiPropertyOptional()
  @Column({ type: 'varchar', length: 255, nullable: true })
  nome?: string;

  @ApiPropertyOptional()
  @Column({ type: 'varchar', length: 100, nullable: true })
  segmento?: string;

  @ApiPropertyOptional()
  @Column({
    name: 'publico_alvo',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  publicoAlvo?: string;

  @ApiPropertyOptional()
  @Column({ type: 'varchar', length: 255, nullable: true })
  rua?: string;

  @ApiPropertyOptional()
  @Column({ type: 'int', nullable: true })
  numero?: number;

  @ApiPropertyOptional()
  @Column({ type: 'varchar', length: 100, nullable: true })
  cidade?: string;

  @ApiPropertyOptional()
  @Column({ type: 'varchar', length: 50, nullable: true })
  estado?: string;
}
