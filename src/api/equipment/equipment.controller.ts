import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { EquipmentService } from "./equipment.service";
import { EquipmentCreateDto } from "../../common/dto/equipment-create.dto";
import { EquipmentEntity } from "../../common/entities/equipment.entity";
import { OperatorEntity } from "../../common/entities/operator.entity";
import { OperatorAuthGuard } from "../../common/guards/operator-auth.guard";
import { Operator } from "../../common/decorators/operator.decorator";

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {
  }

  @UseGuards(OperatorAuthGuard)
  @Post('create')
  async create(
    @Body('equipment') dto: EquipmentCreateDto,
    @Operator() operator: OperatorEntity) {
    const equipment: EquipmentEntity = await this.equipmentService.create(dto, operator);
    return equipment;
  }

  @Get('findBySubstationId/:substationId')
  async findBySubstationId(@Param('substationId') substationId: number) {
    const equipments: EquipmentEntity[] = await this.equipmentService.findAllBySubstationId(substationId);
    return equipments;
  }
}
