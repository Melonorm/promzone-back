import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EquipmentRepository } from "../../common/repositories/equipment.repository";
import { EquipmentCreateDto } from "../../common/dto/equipment-create.dto";
import { EquipmentEntity } from "../../common/entities/equipment.entity";
import { addMonths } from "date-fns";

@Injectable()
export class EquipmentService {
  constructor(private readonly equipmentRepository: EquipmentRepository) {
  }

  async create(dto: EquipmentCreateDto, userId: number): Promise<EquipmentEntity> {
    const findByInvNum: EquipmentEntity = await this.equipmentRepository.findOne({invNum: dto.invNum});
    if (findByInvNum) {
      throw new HttpException('', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const equipment: EquipmentEntity = new EquipmentEntity();
    Object.assign(equipment, dto);
    equipment.inspectedBy = "Швагер В.В.";    // TODO: ХАРДКОД!!!!
    equipment.substationId = 1;              // TODO: ХАРДКОД!!!!
    equipment.inspectDate = new Date();
    equipment.lastCheckoutDate = addMonths(equipment.inspectDate, -1);
    equipment.nextCheckoutDate = addMonths(equipment.lastCheckoutDate, 6);
    await this.equipmentRepository.save(equipment);
    return equipment;
  }

  async findAllBySubstationId(substationId: number) {
    const equipments: EquipmentEntity[] = await this.equipmentRepository.find({substationId});
    return equipments;
  }
}
