import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { EquipmentRepository } from "../../common/repositories/equipment.repository";
import { EquipmentTypeRepository } from "../../common/repositories/equipmentType.repository";

@Module({
  imports: [TypeOrmModule.forFeature([
    EquipmentRepository,
    EquipmentTypeRepository
  ])],
  controllers: [EquipmentController],
  providers: [EquipmentService]
})
export class EquipmentModule {}
