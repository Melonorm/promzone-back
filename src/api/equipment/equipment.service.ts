import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EquipmentRepository } from "../../common/repositories/equipment.repository";
import { EquipmentCreateDto } from "../../common/dto/equipment-create.dto";
import { EquipmentEntity } from "../../common/entities/equipment.entity";
import { addMonths, parseISO } from "date-fns";
import { EquipmentTypeEntity } from "../../common/entities/equipmentType.entity";
import { EquipmentTypeRepository } from "../../common/repositories/equipmentType.repository";
import {
  EQUIPMENT_ALREADY_EXIST_MESSAGE,
  EQUIPMENT_INSPECT_DATE_NOT_SPECIFIED_MESSAGE,
  EQUIPMENT_INSPECT_DATE_REDUNDANT_MESSAGE, EQUIPMENT_NOT_FOUND_MESSAGE,
  EQUIPMENT_TYPE_NOT_FOUND_MESSAGE
} from "../../common/constants/errorMessages.constant";
import { OperatorEntity } from "../../common/entities/operator.entity";
import { EquipmentUpdateDto } from "../../common/dto/equipment-update.dto";
import { OperatorService } from "../operator/operator.service";

@Injectable()
export class EquipmentService {
  constructor(
    private readonly equipmentRepository: EquipmentRepository,
    private readonly equipmentTypeRepository: EquipmentTypeRepository,
    private readonly operatorService: OperatorService) {
  }

  /**
   * Регистрация нового защитного средства
   * Dto props: invNum, equipmentTypeId, notation?, lastCheckoutDateString?
   * @param dto
   * @param operator
   */
  async create(dto: EquipmentCreateDto, operator: OperatorEntity): Promise<EquipmentEntity> {
    const findByInvNum: EquipmentEntity = await this.equipmentRepository.findOne({invNum: dto.invNum});
    if (findByInvNum) {
      throw new HttpException(EQUIPMENT_ALREADY_EXIST_MESSAGE, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const type: EquipmentTypeEntity = await this.equipmentTypeRepository.findOne(dto.equipmentTypeId);
    if (!type) {
      throw new HttpException(EQUIPMENT_TYPE_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    }
    if (dto.lastCheckoutDateString && type.inspectionFrequency == null) {
      throw new HttpException(EQUIPMENT_INSPECT_DATE_REDUNDANT_MESSAGE, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    if (!dto.lastCheckoutDateString && type.inspectionFrequency) {
      throw new HttpException(EQUIPMENT_INSPECT_DATE_NOT_SPECIFIED_MESSAGE, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const equipment: EquipmentEntity = new EquipmentEntity();
    Object.assign(equipment, dto);
    equipment.inspectedBy = this.operatorService.makeOperatorsFullName(operator);
    equipment.substationId = operator.substationId;
    equipment.inspectDate = new Date();
    equipment.lastCheckoutDate = dto.lastCheckoutDateString? new Date(dto.lastCheckoutDateString) : null; // TODO: Внедрить match обработку date-string
    equipment.nextCheckoutDate = equipment.lastCheckoutDate !== null? addMonths(equipment.lastCheckoutDate, type.inspectionFrequency) : null;
    equipment.equipmentType = type;
    await this.equipmentRepository.save(equipment);
    return equipment;
  }

  /**
   * Обновление полей защитного средства
   * Dto props: lastCheckoutDate?, isGoodCondition?, notation?, invNum?
   * @param dto
   * @param equipmentId
   */
  async updateEquipmentById(dto: EquipmentUpdateDto, equipmentId: number): Promise<EquipmentEntity> {
    const equipment: EquipmentEntity = await this.equipmentRepository.findOne(equipmentId);
    if (!equipment) {
      throw new HttpException(EQUIPMENT_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    }
    Object.assign(equipment, dto);
    if (dto.lastCheckoutDate) { // автоматическое заполнение даты следующего испытания
      equipment.nextCheckoutDate = addMonths(parseISO(dto.lastCheckoutDate.toString()), equipment.equipmentType.inspectionFrequency)
    }
    await this.equipmentRepository.save(equipment);
    return equipment;
  }

  /**
   * Проверка защитного средства.
   * Dto props: isGoodCondition, notation?
   * @param dto
   * @param equipmentId
   * @param operator
   */
  async inspectEquipment(dto: EquipmentUpdateDto, equipmentId: number, operator: OperatorEntity): Promise<EquipmentEntity> {
    const equipment: EquipmentEntity = await this.equipmentRepository.findOne(equipmentId);
    if (!equipment) {
      throw new HttpException(EQUIPMENT_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    }
    equipment.inspectDate = new Date();
    equipment.inspectedBy = this.operatorService.makeOperatorsFullName(operator);
    Object.assign(equipment, dto);
    await this.equipmentRepository.save(equipment);
    return equipment;
  }

  /**
   * Поиск всех защитных средств определённой подстанции
   * @param substationId
   */
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

