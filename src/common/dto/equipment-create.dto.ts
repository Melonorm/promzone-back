import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class EquipmentCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly invNum: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly substationId: number;

  @IsString()
  readonly notation?: string;
}