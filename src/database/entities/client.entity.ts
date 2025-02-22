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
    name: 'client_id',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
    length: 256,
  })
  name: string;

  @Column({
    type: 'numeric',
    name: 'salary_amount',
    precision: 9,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  salary: number;

  @Column({
    type: 'numeric',
    name: 'company_revenue_amount',
    precision: 11,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
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
