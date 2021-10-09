import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { EquipmentService } from "./equipment.service";
import { EquipmentCreateDto } from "../../common/dto/equipment-create.dto";
import { EquipmentEntity } from "../../common/entities/equipment.entity";

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {
  }

  @Post('create')
  async create(@Body('equipment') dto: EquipmentCreateDto) {
    const equipment: EquipmentEntity = await this.equipmentService.create(dto, 1);
    return equipment;
  }

  @Get('findBySubstationId/:substationId')
  async findBySubstationId(@Param('substationId') substationId: number) {
    const equipments: EquipmentEntity[] = await this.equipmentService.findAllBySubstationId(substationId);
    return equipments;
  }
}
