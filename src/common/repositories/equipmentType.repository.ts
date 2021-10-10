import { EntityRepository, Repository } from "typeorm";
import { EquipmentTypeEntity } from "../entities/equipmentType.entity";

@EntityRepository(EquipmentTypeEntity)
export class EquipmentTypeRepository extends Repository<EquipmentTypeEntity>{

}