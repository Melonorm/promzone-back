import { EntityRepository, Repository } from "typeorm";
import { EquipmentEntity } from "../entities/equipment.entity";

@EntityRepository(EquipmentEntity)
export class EquipmentRepository extends Repository<EquipmentEntity> {}