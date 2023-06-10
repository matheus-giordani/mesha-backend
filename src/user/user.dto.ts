import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateNested
} from 'class-validator';
import { ConhecimentoDTO } from './conhecimento.dto';

export class UserDTO {
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ example: 'xuxa da silva', description: 'Nome user' })
  readonly nome: string;

  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ example: 'xuxa_silva@gmail.com', description: 'Email user' })
  readonly email: string;

  @MaxLength(15)
  @MinLength(15)
  @IsOptional()
  @ApiProperty({ example: '(00) 00000-000', description: 'Phone number user' })
  readonly celular?: string;

  @IsNotEmpty()
  @MaxLength(14)
  @MinLength(14)
  @ApiProperty({ example: '000.000.000-00', description: 'CPF user' })
  readonly cpf: string;

  @ValidateNested()
  @IsArray()
  @ArrayMaxSize(3)
  @ArrayNotEmpty()
  @Type(() => ConhecimentoDTO)
  @ApiProperty({
    example: [
      {
        name: 'React',
        code: 2,
      },
      {
        name: 'TypeScript',
        code: 7,
      },
      {
        name: 'Banco de Dados',
        code: 6,
      },
    ],
    description: 'Conhecimento User',
  })
  readonly conhecimentos: ConhecimentoDTO[];
  @IsNotEmpty()
  @ApiProperty({ example: 'validado', description: 'status user' })
  readonly validacao: string;
}
