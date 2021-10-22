import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EquipmentRepository } from "../../common/repositories/equipment.repository";
import { EquipmentCreateDto } from "../../common/dto/equipment-create.dto";
import { EquipmentEntity } from "../../common/entities/equipment.entity";
import { addMonths } from "date-fns";
import { EquipmentTypeEntity } from "../../common/entities/equipmentType.entity";
import { EquipmentTypeRepository } from "../../common/repositories/equipmentType.repository";
import {
  EQUIPMENT_ALREADY_EXIST_MESSAGE,
  EQUIPMENT_INSPECT_DATE_NOT_SPECIFIED_MESSAGE,
  EQUIPMENT_INSPECT_DATE_REDUNDANT_MESSAGE,
  EQUIPMENT_TYPE_NOT_FOUND_MESSAGE
} from "../../common/constants/errorMessages.constant";
import { OperatorEntity } from "../../common/entities/operator.entity";

@Injectable()
export class EquipmentService {
  constructor(
    private readonly equipmentRepository: EquipmentRepository,
    private readonly equipmentTypeRepository: EquipmentTypeRepository) {
  }

  async create(dto: EquipmentCreateDto, operator: OperatorEntity): Promise<EquipmentEntity> {
    const findByInvNum: EquipmentEntity = await this.equipmentRepository.findOne({invNum: dto.invNum});
    if (findByInvNum) {
      throw new HttpException(EQUIPMENT_ALREADY_EXIST_MESSAGE, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const type: EquipmentTypeEntity = await this.equipmentTypeRepository.findOne(dto.equipmentTypeId);
    if (!type) {
      throw new HttpException(EQUIPMENT_TYPE_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    }
    if (dto.inspectDateString && type.inspectionFrequency == null) {
      throw new HttpException(EQUIPMENT_INSPECT_DATE_REDUNDANT_MESSAGE, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    if (!dto.inspectDateString && type.inspectionFrequency) {
      throw new HttpException(EQUIPMENT_INSPECT_DATE_NOT_SPECIFIED_MESSAGE, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const equipment: EquipmentEntity = new EquipmentEntity();
    Object.assign(equipment, dto);
    equipment.inspectedBy = `${operator.lastName} ${operator.firstName.substring(0, 1)}.${operator.fatherName.substring(0, 1)}.`;
    equipment.substationId = operator.substationId;
    equipment.inspectDate = new Date();
    equipment.lastCheckoutDate = dto.inspectDateString? new Date(dto.inspectDateString) : null; // TODO: Внедрить match обработку date-string
    equipment.nextCheckoutDate = equipment.lastCheckoutDate !== null? addMonths(equipment.lastCheckoutDate, type.inspectionFrequency) : null;
    equipment.equipmentType = type;
    await this.equipmentRepository.save(equipment);
    return equipment;
  }

  async updateEquipmentById() {}

  async findAllBySubstationId(substationId: number): Promise<EquipmentEntity[]> {
    const equipments: EquipmentEntity[] = await this.equipmentRepository.find({
      join: {
        alias: 'equipment',
        leftJoinAndSelect: {
          equipmentType: 'equipment.equipmentType'
        }
      },
      where: {
        substationId
      }
    });
    return equipments;
  }
}

