import { IsNotEmpty, IsString } from "class-validator";

export class SubstationCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}