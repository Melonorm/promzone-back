import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { EquipmentService } from "./equipment.service";
import { EquipmentCreateDto } from "../../common/dto/equipment-create.dto";
import { EquipmentEntity } from "../../common/entities/equipment.entity";
import { OperatorEntity } from "../../common/entities/operator.entity";
import { OperatorAuthGuard } from "../../common/guards/operator-auth.guard";
import { Operator } from "../../common/decorators/operator.decorator";
import { EquipmentUpdateDto } from "../../common/dto/equipment-update.dto";
import { EquipmentSortedByConditionInterface } from "./types/equipmentSortedByCondition.interface";
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {
  }

  @UseGuards(OperatorAuthGuard)
  @Post('create')
  async create(
    @Body('equipment') dto: EquipmentCreateDto,
    @Operator() operator: OperatorEntity
  ) {
    const equipment: EquipmentEntity = await this.equipmentService.create(dto, operator);
    return equipment;
  }

  @Patch('update/:equipmentId')
  async update(
    @Body() dto: EquipmentUpdateDto,
    @Param('equipmentId') equipmentId: number
  ) {
    const equipment: EquipmentEntity = await this.equipmentService.updateEquipmentById(dto, equipmentId);
    return equipment;
  }

  @UseGuards(OperatorAuthGuard)
  @Patch('inspect/:equipmentId')
  async inspectEquipment(
    @Body() dto: EquipmentUpdateDto,
    @Param('equipmentId') equipmentId: number,
    @Operator() operator: OperatorEntity
  ) {
    const equipment: EquipmentEntity = await this.equipmentService.inspectEquipment(dto, equipmentId, operator);
    return equipment;
  }

  @Get('findBySubstationId/:substationId')
  async findBySubstationId(@Param('substationId') substationId: number) {
    const equipments: EquipmentEntity[] = await this.equipmentService.findAllBySubstationId(substationId);
    return equipments;
  }

  @Get('getSortedByCondition/:substationId')
  async getSortedByConditionEquipment(@Param('substationId') substationId: number) {
    const equipments: EquipmentEntity[] = await this.equipmentService.findAllBySubstationId(substationId);
    const sorted: EquipmentSortedByConditionInterface = this.equipmentService.sortEquipmentsByCondition(equipments);
    return sorted;
  }

  @Get('test')
  test() {
    const date: Date = new Date()
    console.log('current', date);
    const tz: string = 'Russia/Moscow';
    const zoned = zonedTimeToUtc(date, tz);
    console.log('zoned', zoned);
    return zoned;
  }

}
