import { IsNotEmpty } from "class-validator";

export class OperatorLoginDto {
  @IsNotEmpty()
  readonly login: string;

  @IsNotEmpty()
  readonly password: string;
}