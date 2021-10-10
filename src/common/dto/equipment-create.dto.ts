import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class EquipmentCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly invNum: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly equipmentTypeId: number;

  readonly notation?: string;

  readonly inspectDateString: string;
}