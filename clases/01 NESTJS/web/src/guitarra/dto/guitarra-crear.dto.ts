import {

  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  IsPositive, IsDate, IsBoolean, Max,
} from 'class-validator';

export class GuitarraCrearDto {
  @IsNotEmpty() //Requericdo
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  nombre: string;

  @IsNotEmpty() //Debe estar vacio
  @IsDate()
  fechaLlegada: Date;

  @IsBoolean()
  @IsOptional()
  puenteFlotante: boolean;

  @IsNotEmpty() //Requericdo
  @IsNumber()
  @IsPositive()
  @Max(1000000)
  precio: number;
}