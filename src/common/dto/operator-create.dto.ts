import { IsNotEmpty } from "class-validator";

export class OperatorCreateDto {
  @IsNotEmpty()
  readonly login: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly fatherName: string;
}