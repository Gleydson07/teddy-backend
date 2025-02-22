import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  name: string;

  @IsNotEmpty({ message: 'O salário é obrigatório.' })
  @IsNumber({}, { message: 'O salário deve ser um número.' })
  salary: number;

  @IsNotEmpty({ message: 'A receita da empresa é obrigatória.' })
  @IsNumber({}, { message: 'A receita da empresa deve ser um número.' })
  companyRevenue: number;
}
