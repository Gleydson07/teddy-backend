import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'clients' })
export class ClientEntity {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_client_id',
    name: 'client_ id',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
    length: 256,
    unique: true,
  })
  name: string;

  @Column({
    type: 'decimal',
    name: 'salary_amount',
    precision: 9,
    scale: 2,
  })
  salary: number;

  @Column({
    type: 'decimal',
    name: 'company_revenue_amount',
    precision: 11,
    scale: 2,
  })
  companyRevenue: number;

  @Column({
    type: 'boolean',
    name: 'is_selected',
    default: false,
  })
  isSelected: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_timestamp',
  })
  updatedAt: Date;
}
