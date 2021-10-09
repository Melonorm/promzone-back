import { EntityRepository, Repository } from "typeorm";
import { SubstationEntity } from "../entities/substation.entity";

@EntityRepository(SubstationEntity)
export class SubstationRepository extends Repository<SubstationEntity> {}