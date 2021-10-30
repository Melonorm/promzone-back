import { EquipmentEntity } from "../../../common/entities/equipment.entity";
import { EquipmentResponseInterface } from "./equipmentResponse.interface";

export interface EquipmentSortedByConditionInterface {
  equipments: {
    valid: EquipmentResponseInterface[],
    almostExpired: EquipmentResponseInterface[],
    expired: EquipmentResponseInterface[],
    badCondition: EquipmentResponseInterface[]
  }
}