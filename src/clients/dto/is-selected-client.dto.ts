import { IsBoolean, IsNotEmpty } from 'class-validator';

export class IsSelectedClientDto {
  @IsNotEmpty({ message: 'O valor de isSelected é obrigatório.' })
  @IsBoolean({ message: 'O valor de isSelected deve ser um boolean.' })
  isSelected: boolean;
}
