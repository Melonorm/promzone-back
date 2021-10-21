import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OperatorService } from "./operator.service";
import { OperatorCreateDto } from "../../common/dto/operator-create.dto";
import { OperatorEntity } from "../../common/entities/operator.entity";
import { OperatorLoginDto } from "../../common/dto/operator-login.dto";
import { OperatorResponseInterface } from "./types/operatorResponse.interface";
import { OperatorsResponseInterface } from "./types/operatorsResponse.interface";

@Controller('operator')
export class OperatorController {
  constructor(private readonly operatorService: OperatorService) {
  }

  @Post('create/:substationId')
  async create(
    @Body('operator') dto: OperatorCreateDto,
    @Param('substationId') substationId: number
  ): Promise<OperatorResponseInterface> {
    const operator: OperatorEntity = await this.operatorService.create(dto, substationId);
    return this.operatorService.buildOperatorResponse(operator);
  }

  @Post('login')
  async login(
    @Body('operator') dto: OperatorLoginDto
  ): Promise<OperatorResponseInterface> {
    const operator: OperatorEntity = await this.operatorService.login(dto);
    return this.operatorService.buildOperatorResponse(operator);
  }

  @Get('getAll/:substationId')
  async getAllBySubstationId(
    @Param('substationId') substationId: number
  ): Promise<OperatorsResponseInterface> {
    const operators: OperatorEntity[] = await this.operatorService.getAllBySubstationId(substationId);
    return this.operatorService.buildOperatorsResponse(operators);
  }
}
