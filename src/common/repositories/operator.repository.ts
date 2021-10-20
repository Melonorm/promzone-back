import { EntityRepository, Repository } from "typeorm";
import { OperatorEntity } from "../entities/operator.entity";

@EntityRepository(OperatorEntity)
export class OperatorRepository extends Repository<OperatorRepository>{}